import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { validateEnquiry, type EnquiryPayload } from './src/utils/enquiryValidation.ts';

const isBehindNginx =
  Boolean(process.env.NGINX_PORT) && process.env.PORT === process.env.NGINX_PORT;
const PORT =
  process.env.NODE_ENV === 'production' && !isBehindNginx
    ? Number(process.env.PORT || 3000)
    : Number(process.env.DEFAULT_APP_PORT || 3000);
const ENQUIRIES_FILE = path.resolve(process.cwd(), 'data', 'enquiries.json');

interface StoredEnquiry extends EnquiryPayload {
  referenceId: string;
  countryCode: string;
  normalizedMobile: string;
  submittedAt: string;
  deliveryMode: 'crm_webhook' | 'local_staging';
}

async function persistEnquiryLocally(record: StoredEnquiry): Promise<void> {
  await fs.mkdir(path.dirname(ENQUIRIES_FILE), { recursive: true });
  let existing: StoredEnquiry[] = [];
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }
  existing.push(record);
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf8');
}

function parseValidWebhookUrl(raw?: string): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      crmConfigured: Boolean(parseValidWebhookUrl(process.env.CRM_WEBHOOK_URL)),
    });
  });

  app.post('/api/enquiries', async (req, res) => {
    const body = (req.body ?? {}) as Partial<EnquiryPayload>;
    const validation = validateEnquiry(body);

    if (!validation.valid) {
      return res.status(400).json({
        ok: false,
        message: 'Please fix the highlighted fields before submitting.',
        errors: validation.errors,
      });
    }

    const referenceId = `ARN-${Date.now().toString(36).toUpperCase()}`;
    const submittedAt = new Date().toISOString();
    const webhookUrl = parseValidWebhookUrl(process.env.CRM_WEBHOOK_URL);

    const sanitizedPayload: EnquiryPayload = {
      fullName: (body.fullName ?? '').trim(),
      countryCode: validation.normalizedCountryCode,
      mobileNumber: validation.normalizedMobile,
      city: (body.city ?? '').trim(),
      preferredContactTime: body.preferredContactTime!,
      purposeOfPurchase: body.purposeOfPurchase!,
      preferredInteraction: body.preferredInteraction!,
      consent: true,
      sourceSection: typeof body.sourceSection === 'string' ? body.sourceSection : 'landing-page',
    };

    if (webhookUrl) {
      try {
        const crmResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...sanitizedPayload,
            referenceId,
            submittedAt,
            project: 'Silpa Aranya',
          }),
        });

        if (!crmResponse.ok) {
          throw new Error(`CRM webhook returned HTTP ${crmResponse.status}`);
        }

        await persistEnquiryLocally({
          ...sanitizedPayload,
          countryCode: validation.normalizedCountryCode,
          referenceId,
          normalizedMobile: validation.normalizedMobile,
          submittedAt,
          deliveryMode: 'crm_webhook',
        });

        return res.status(201).json({
          ok: true,
          referenceId,
          submittedAt,
          deliveryMode: 'crm_webhook',
          crmConfigured: true,
          message: 'Your details are with our Hyderabad team. We will reach out at your chosen time.',
        });
      } catch (err) {
        console.error('CRM webhook dispatch failed; staging enquiry locally:', err);
      }
    }

    await persistEnquiryLocally({
      ...sanitizedPayload,
      countryCode: validation.normalizedCountryCode,
      referenceId,
      normalizedMobile: validation.normalizedMobile,
      submittedAt,
      deliveryMode: 'local_staging',
    });

    return res.status(201).json({
      ok: true,
      referenceId,
      submittedAt,
      deliveryMode: 'local_staging',
      crmConfigured: false,
      message:
        'Your request is saved with our Hyderabad desk. For urgent help or same-day site visits, you can also call 92475 75834.',
    });
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ARANYA server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start ARANYA server:', err);
  process.exit(1);
});
