export type PurchasePurpose =
  | 'Weekend Home'
  | 'Investment'
  | 'Holiday Rental Opportunity'
  | 'Family Getaway';

export type PreferredInteraction =
  | 'Phone Call'
  | 'Google Meet'
  | 'Face-to-Face Meeting';

export type PreferredContactTime =
  | 'Morning (9 AM – 12 PM)'
  | 'Afternoon (12 PM – 4 PM)'
  | 'Evening (4 PM – 7 PM)'
  | 'Weekend Only';

export interface CountryDialCodeOption {
  code: string;
  iso: string;
  label: string;
  placeholder: string;
}

export const COUNTRY_DIAL_CODES: CountryDialCodeOption[] = [
  { code: '+91', iso: 'IN', label: 'India (+91)', placeholder: 'e.g. 98765 43210' },
  { code: '+1', iso: 'US/CA', label: 'USA / Canada (+1)', placeholder: 'e.g. 415 555 0199' },
  { code: '+44', iso: 'UK', label: 'United Kingdom (+44)', placeholder: 'e.g. 7700 900077' },
  { code: '+971', iso: 'UAE', label: 'UAE (+971)', placeholder: 'e.g. 50 123 4567' },
  { code: '+65', iso: 'SG', label: 'Singapore (+65)', placeholder: 'e.g. 8123 4567' },
  { code: '+61', iso: 'AU', label: 'Australia (+61)', placeholder: 'e.g. 412 345 678' },
  { code: '+966', iso: 'SA', label: 'Saudi Arabia (+966)', placeholder: 'e.g. 50 123 4567' },
  { code: '+974', iso: 'QA', label: 'Qatar (+974)', placeholder: 'e.g. 5512 3456' },
  { code: '+965', iso: 'KW', label: 'Kuwait (+965)', placeholder: 'e.g. 5012 3456' },
  { code: '+968', iso: 'OM', label: 'Oman (+968)', placeholder: 'e.g. 9212 3456' },
  { code: '+973', iso: 'BH', label: 'Bahrain (+973)', placeholder: 'e.g. 3612 3456' },
  { code: '+49', iso: 'DE', label: 'Germany (+49)', placeholder: 'e.g. 151 23456789' },
  { code: '+33', iso: 'FR', label: 'France (+33)', placeholder: 'e.g. 6 12 34 56 78' },
  { code: '+31', iso: 'NL', label: 'Netherlands (+31)', placeholder: 'e.g. 6 12345678' },
  { code: '+41', iso: 'CH', label: 'Switzerland (+41)', placeholder: 'e.g. 79 123 45 67' },
  { code: '+60', iso: 'MY', label: 'Malaysia (+60)', placeholder: 'e.g. 12 345 6789' },
  { code: '+81', iso: 'JP', label: 'Japan (+81)', placeholder: 'e.g. 90 1234 5678' },
  { code: '+64', iso: 'NZ', label: 'New Zealand (+64)', placeholder: 'e.g. 21 123 4567' },
  { code: '+27', iso: 'ZA', label: 'South Africa (+27)', placeholder: 'e.g. 82 123 4567' },
  { code: '+94', iso: 'LK', label: 'Sri Lanka (+94)', placeholder: 'e.g. 77 123 4567' },
  { code: '+977', iso: 'NP', label: 'Nepal (+977)', placeholder: 'e.g. 984 123 4567' },
  { code: '+880', iso: 'BD', label: 'Bangladesh (+880)', placeholder: 'e.g. 1712 345678' },
];

export interface EnquiryPayload {
  fullName: string;
  countryCode?: string;
  mobileNumber: string;
  city: string;
  preferredContactTime: PreferredContactTime;
  purposeOfPurchase: PurchasePurpose;
  preferredInteraction: PreferredInteraction;
  consent: boolean;
  sourceSection?: string;
}

export interface EnquiryValidationErrors {
  fullName?: string;
  countryCode?: string;
  mobileNumber?: string;
  city?: string;
  preferredContactTime?: string;
  purposeOfPurchase?: string;
  preferredInteraction?: string;
  consent?: string;
}

export const PURCHASE_PURPOSES: PurchasePurpose[] = [
  'Weekend Home',
  'Investment',
  'Holiday Rental Opportunity',
  'Family Getaway',
];

export const PREFERRED_INTERACTIONS: PreferredInteraction[] = [
  'Phone Call',
  'Google Meet',
  'Face-to-Face Meeting',
];

export const PREFERRED_CONTACT_TIMES: PreferredContactTime[] = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 7 PM)',
  'Weekend Only',
];

export function normalizeCountryCode(raw?: string): string {
  const digits = (raw ?? '+91').replace(/\D/g, '');
  if (!digits) return '';
  return `+${digits}`;
}

export function isValidCountryCode(raw?: string): boolean {
  const normalized = normalizeCountryCode(raw);
  return /^\+[1-9]\d{0,3}$/.test(normalized);
}

export function normalizeIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function isValidIndianMobile(raw: string): boolean {
  const normalized = normalizeIndianMobile(raw);
  return /^[6-9]\d{9}$/.test(normalized);
}

export function normalizeInternationalPhone(
  rawNumber: string,
  rawCountryCode = '+91'
): {
  countryCode: string;
  nationalNumber: string;
  e164: string;
} {
  const trimmed = rawNumber.trim();
  const normalizedCode = normalizeCountryCode(rawCountryCode) || '+91';
  const codeDigits = normalizedCode.slice(1);
  let digits = trimmed.replace(/\D/g, '');

  // If user pasted a full +<code> number matching the selected code, avoid double prefixing.
  if (trimmed.startsWith('+') && digits.startsWith(codeDigits) && digits.length > codeDigits.length + 5) {
    digits = digits.slice(codeDigits.length);
  } else if (normalizedCode === '+91') {
    digits = normalizeIndianMobile(trimmed);
  } else if (digits.startsWith('00' + codeDigits) && digits.length > codeDigits.length + 7) {
    digits = digits.slice(codeDigits.length + 2);
  } else if (digits.startsWith('0') && digits.length >= 10) {
    digits = digits.slice(1);
  }

  return {
    countryCode: normalizedCode,
    nationalNumber: digits,
    e164: digits ? `${normalizedCode}${digits}` : '',
  };
}

export function isValidInternationalPhone(rawNumber: string, rawCountryCode = '+91'): boolean {
  if (!isValidCountryCode(rawCountryCode)) {
    return false;
  }
  const { countryCode, nationalNumber, e164 } = normalizeInternationalPhone(rawNumber, rawCountryCode);
  if (countryCode === '+91') {
    return /^[6-9]\d{9}$/.test(nationalNumber);
  }
  const totalDigits = e164.replace(/\D/g, '').length;
  return nationalNumber.length >= 6 && nationalNumber.length <= 14 && totalDigits >= 7 && totalDigits <= 15;
}

export function validateSingleField(
  field: keyof EnquiryPayload,
  value: string | boolean,
  countryCode = '+91'
): string | undefined {
  if (field === 'fullName') {
    const trimmed = String(value).trim();
    if (trimmed.length < 2) {
      return 'Please enter your full name so we know who to ask for.';
    }
    if (trimmed.length > 100) {
      return 'Please keep your name under 100 characters.';
    }
    return undefined;
  }

  if (field === 'countryCode') {
    if (!isValidCountryCode(String(value))) {
      return 'Enter a valid country code (e.g. +91, +1, +44).';
    }
    return undefined;
  }

  if (field === 'mobileNumber') {
    if (!isValidCountryCode(countryCode)) {
      return 'Please enter a valid country code first (e.g. +91, +1, +44).';
    }
    const { countryCode: code, nationalNumber } = normalizeInternationalPhone(
      String(value),
      countryCode
    );
    if (!nationalNumber) {
      return 'Please enter your phone or WhatsApp number so our team can call you.';
    }
    if (code === '+91') {
      if (!/^[6-9]\d{9}$/.test(nationalNumber)) {
        return 'Enter a valid 10-digit Indian mobile number (like 98765 43210), or change the country code.';
      }
      return undefined;
    }
    if (!isValidInternationalPhone(String(value), code)) {
      return 'Enter a valid phone number (6 to 14 digits after the country code).';
    }
    return undefined;
  }

  if (field === 'city') {
    const trimmed = String(value).trim();
    if (trimmed.length < 2) {
      return 'Please enter your city (like Hyderabad, Dubai, or London).';
    }
    return undefined;
  }

  if (field === 'consent') {
    if (value !== true) {
      return 'Please tick this box so our team can contact you.';
    }
    return undefined;
  }

  return undefined;
}

export function validateEnquiryStep1(payload: Partial<EnquiryPayload>): {
  valid: boolean;
  errors: Pick<EnquiryValidationErrors, 'fullName' | 'countryCode' | 'mobileNumber' | 'city'>;
  normalizedCountryCode: string;
  normalizedMobile: string;
} {
  const errors: Pick<
    EnquiryValidationErrors,
    'fullName' | 'countryCode' | 'mobileNumber' | 'city'
  > = {};
  const rawCountryCode = payload.countryCode ?? '+91';

  const fullNameErr = validateSingleField('fullName', payload.fullName ?? '');
  if (fullNameErr) errors.fullName = fullNameErr;

  const countryErr = validateSingleField('countryCode', rawCountryCode);
  if (countryErr) errors.countryCode = countryErr;

  const mobileErr = validateSingleField('mobileNumber', payload.mobileNumber ?? '', rawCountryCode);
  if (mobileErr) errors.mobileNumber = mobileErr;

  const cityErr = validateSingleField('city', payload.city ?? '');
  if (cityErr) errors.city = cityErr;

  const normalized = normalizeInternationalPhone(payload.mobileNumber ?? '', rawCountryCode);

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalizedCountryCode: normalized.countryCode,
    normalizedMobile: normalized.e164,
  };
}

export function validateEnquiry(payload: Partial<EnquiryPayload>): {
  valid: boolean;
  errors: EnquiryValidationErrors;
  normalizedCountryCode: string;
  normalizedMobile: string;
} {
  const step1 = validateEnquiryStep1(payload);
  const errors: EnquiryValidationErrors = { ...step1.errors };

  if (!payload.preferredContactTime || !PREFERRED_CONTACT_TIMES.includes(payload.preferredContactTime)) {
    errors.preferredContactTime = 'Please choose a time that suits you.';
  }

  if (!payload.purposeOfPurchase || !PURCHASE_PURPOSES.includes(payload.purposeOfPurchase)) {
    errors.purposeOfPurchase = 'Please choose what you are looking for.';
  }

  if (!payload.preferredInteraction || !PREFERRED_INTERACTIONS.includes(payload.preferredInteraction)) {
    errors.preferredInteraction = 'Please choose how you would like us to connect.';
  }

  const consentErr = validateSingleField('consent', payload.consent ?? false);
  if (consentErr) {
    errors.consent = consentErr;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalizedCountryCode: step1.normalizedCountryCode,
    normalizedMobile: step1.normalizedMobile,
  };
}

export function filterItemsByCategory<T extends { category: string }>(
  items: readonly T[],
  category: string
): T[] {
  if (category === 'All') {
    return [...items];
  }
  return items.filter((item) => item.category === category);
}
