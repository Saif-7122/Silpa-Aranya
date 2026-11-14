import { useState, useCallback } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useApiIsLoaded,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { BRAND_INFO } from '../data/aranyaData';

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '').trim();

function SiteMapFallback() {
  return (
    <div className="h-full w-full bg-[#1F3527] text-[#F5F3EC] p-8 flex flex-col items-start justify-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B5945B]">
        Google Maps Location · {BRAND_INFO.sitePlusCode}
      </p>
      <h4 className="mt-2 font-display text-2xl sm:text-3xl font-medium">
        {BRAND_INFO.officialProjectName}
      </h4>
      <p className="mt-2 text-sm text-[#E6E0D3]/85 max-w-md">{BRAND_INFO.siteAddress}</p>
      <p className="mt-1 text-xs text-[#E6E0D3]/70 tabular-nums">
        Coordinates: {BRAND_INFO.siteCoordinates.lat}, {BRAND_INFO.siteCoordinates.lng} · ~1 hr drive
        from Gachibowli via NH-163
      </p>
      <a
        href={BRAND_INFO.googleMapsDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 bg-[#B5945B] text-[#141815] px-5 min-h-[48px] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#c9a86d] transition-colors"
      >
        <Navigation className="h-4 w-4" aria-hidden="true" />
        <span>Get Directions on Google Maps</span>
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}

function InteractiveSiteMap() {
  const isLoaded = useApiIsLoaded();
  const status = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const handleMarkerClick = useCallback(() => {
    setInfoOpen((prev) => !prev);
  }, []);

  if (status === APILoadingStatus.FAILED || status === APILoadingStatus.AUTH_FAILURE) {
    return <SiteMapFallback />;
  }

  return (
    <div className="relative h-full w-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#EBE7DC] text-xs uppercase tracking-[0.14em] text-[#4D6150]">
          Loading Silpa Aranya Map…
        </div>
      )}
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={BRAND_INFO.siteCoordinates}
        defaultZoom={14}
        gestureHandling="cooperative"
        mapTypeControl={true}
        streetViewControl={false}
        fullscreenControl={true}
        zoomControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={BRAND_INFO.siteCoordinates}
          onClick={handleMarkerClick}
          title={BRAND_INFO.siteAddress}
        >
          <Pin
            background="#1F3527"
            borderColor="#B5945B"
            glyphColor="#F5F3EC"
            scale={1.15}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={270}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 text-[#141815]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4D6150]">
                Official Site Pin · {BRAND_INFO.sitePlusCode}
              </p>
              <p className="mt-1 font-display text-lg font-semibold leading-tight text-[#141815]">
                SILPA ARANYA
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#141815]/80">
                Mirzapur, Telangana 501102 · Off Chevella–Manneguda Rd (NH-163), ~1 hr from
                Gachibowli.
              </p>
              <a
                href={BRAND_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3527] underline underline-offset-4 hover:text-[#B5945B]"
              >
                <span>Get Directions</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function AranyaGoogleMap() {
  return (
    <div className="mt-10 bg-[#F5F3EC] border border-[#1F3527]/15">
      <div className="p-5 sm:p-6 border-b border-[#1F3527]/12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#4D6150]">
            <MapPin className="h-3.5 w-3.5 text-[#B5945B]" aria-hidden="true" />
            <span>Exact Project Map · Plus Code {BRAND_INFO.sitePlusCode}</span>
          </div>
          <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-medium text-[#141815]">
            SILPA ARANYA — Mirzapur, Telangana 501102
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#141815]/75">
            Tap the map marker for site details, switch to Satellite view, or open turn-by-turn
            navigation from your phone.
          </p>
        </div>

        <a
          href={BRAND_INFO.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#1F3527] text-[#F5F3EC] px-5 min-h-[48px] text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap shrink-0 hover:bg-[#141815] transition-colors"
        >
          <Navigation className="h-4 w-4 text-[#B5945B]" aria-hidden="true" />
          <span>Open in Google Maps</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Explicit sized container so the Google Map never collapses to 0x0 */}
      <div className="h-[380px] sm:h-[440px] w-full bg-[#EBE7DC]">
        {MAPS_API_KEY ? (
          <APIProvider
            apiKey={MAPS_API_KEY}
            language="en"
            region="IN"
            libraries={['marker']}
          >
            <InteractiveSiteMap />
          </APIProvider>
        ) : (
          <SiteMapFallback />
        )}
      </div>
    </div>
  );
}
