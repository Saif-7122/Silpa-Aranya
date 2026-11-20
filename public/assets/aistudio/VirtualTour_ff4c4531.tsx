import React, { useRef, useState } from 'react';

/**
 * Silpa Aranya 3D Walkthrough / Virtual Tour
 *
 * Shows the self-contained tour page (public/virtual-tour/index.html) inside an iframe.
 * Do not rewrite the tour itself. This component only frames it as a tab on the landing page.
 *
 * Views inside the tour (passed as the URL hash):
 *   map      Location map with distances and the fly-in from Hyderabad
 *   1bhk     1 BHK home
 *   2bhk     2 BHK home
 *   manduva  Manduva courtyard home
 */

type View = 'map' | '1bhk' | '2bhk' | 'manduva';

const VIEWS: { id: View; label: string }[] = [
  { id: 'map', label: 'Location' },
  { id: '1bhk', label: '1 BHK' },
  { id: '2bhk', label: '2 BHK' },
  { id: 'manduva', label: 'Manduva' },
];

const BRAND = {
  green: '#384f36',
  deep: '#2d4321',
  cream: '#eaeddc',
  sage: '#bdccc2',
  ink: '#22301f',
};

interface VirtualTourProps {
  /** Where the tour page is served. Change this if you host it elsewhere (for example on Netlify). */
  src?: string;
  /** Which view opens first. */
  initialView?: View;
  /** Show the view buttons above the tour. The tour also has its own buttons inside. */
  showViewButtons?: boolean;
}

export default function VirtualTour({
  src = '/virtual-tour.html',
  initialView = 'map',
  showViewButtons = true,
}: VirtualTourProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [view, setView] = useState<View>(initialView);

  const url = `${src}#${view}`;

  const openFullScreen = () => {
    const el = frameRef.current;
    if (!el) return;
    const req = el.requestFullscreen || (el as any).webkitRequestFullscreen;
    if (req) req.call(el).catch?.(() => window.open(url, '_blank', 'noopener'));
    else window.open(url, '_blank', 'noopener');
  };

  const btn = (active: boolean): React.CSSProperties => ({
    border: `1px solid ${active ? BRAND.green : 'rgba(56,79,54,.25)'}`,
    background: active ? BRAND.green : '#f5f6ec',
    color: active ? BRAND.cream : BRAND.ink,
    borderRadius: 999,
    padding: '8px 14px',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'Outfit, system-ui, sans-serif',
  });

  return (
    <section
      aria-label="Silpa Aranya 3D virtual tour"
      style={{ background: BRAND.cream, padding: 'clamp(12px, 3vw, 28px)', borderRadius: 20 }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Marcellus, Georgia, serif', fontWeight: 400, fontSize: 'clamp(22px, 3vw, 32px)', color: BRAND.green }}>
            3D Walkthrough
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#56634f', fontFamily: 'Outfit, system-ui, sans-serif' }}>
            Fly in from Hyderabad, see the distances, then walk through each home. Drag to look around.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {showViewButtons &&
            VIEWS.map((v) => (
              <button key={v.id} type="button" style={btn(view === v.id)} onClick={() => setView(v.id)} aria-pressed={view === v.id}>
                {v.label}
              </button>
            ))}
          <button type="button" style={{ ...btn(false), background: BRAND.deep, color: BRAND.cream, borderColor: BRAND.deep }} onClick={openFullScreen}>
            Full screen
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 'min(82vh, 860px)', minHeight: 520, borderRadius: 16, overflow: 'hidden', background: BRAND.cream }}>
        <iframe
          ref={frameRef}
          key={src}
          src={url}
          title="Silpa Aranya 3D virtual tour"
          allow="fullscreen; accelerometer; gyroscope"
          allowFullScreen
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>

      <p style={{ margin: '10px 0 0', fontSize: 12, color: '#56634f', fontFamily: 'Outfit, system-ui, sans-serif' }}>
        Artist's impression. Layouts follow the architect's drawings; furniture, finishes and landscaping are indicative.
        Distances are straight-line from the site.{' '}
        <a href={url} target="_blank" rel="noopener" style={{ color: BRAND.green }}>
          Open the tour in a new tab
        </a>
      </p>
    </section>
  );
}
