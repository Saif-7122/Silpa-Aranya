import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/aranyaData';
import { filterItemsByCategory } from '../utils/enquiryValidation';

const CATEGORIES = [
  'All',
  'Homes',
  'Nature',
  'Clubhouse & Fun',
  'Real Site Photos',
] as const;

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const visibleItems = filterItemsByCategory(GALLERY_ITEMS, activeCategory);

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      } else if (e.key === 'ArrowRight') {
        const idx = visibleItems.findIndex((item) => item.id === lightboxItem.id);
        const next = visibleItems[(idx + 1) % visibleItems.length];
        if (next) setLightboxItem(next);
      } else if (e.key === 'ArrowLeft') {
        const idx = visibleItems.findIndex((item) => item.id === lightboxItem.id);
        const prev = visibleItems[(idx - 1 + visibleItems.length) % visibleItems.length];
        if (prev) setLightboxItem(prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxItem, visibleItems]);

  const stepLightbox = (direction: 1 | -1) => {
    if (!lightboxItem) return;
    const idx = visibleItems.findIndex((item) => item.id === lightboxItem.id);
    const nextIdx = (idx + direction + visibleItems.length) % visibleItems.length;
    setLightboxItem(visibleItems[nextIdx]);
  };

  return (
    <section id="gallery" className="bg-[#F5F3EC] text-[#141815] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-[#1F3527]/15">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D6150] mb-4">
              Photo Gallery
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#141815]">
              Inside ARANYA & Real Site Progress.
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-[#EBE7DC] p-1.5 border border-[#1F3527]/12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#1F3527] text-[#F5F3EC]'
                    : 'text-[#141815]/75 hover:text-[#141815]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <figure
              key={item.id}
              className="group bg-[#EBE7DC] border border-[#1F3527]/10 overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => setLightboxItem(item)}
                aria-label={`Open full view of ${item.title}`}
                className="relative aspect-[16/10] w-full overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B5945B]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover aranya-photo transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 bg-[#141815]/75 text-[#F5F3EC] p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>
              <figcaption className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#4D6150]">
                    <span>{item.category}</span>
                    {item.mediaType === 'actual-site' && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#1F3527]">Real Site Photo</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-medium text-[#141815]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#141815]/75">{item.caption}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 z-50 bg-[#141815]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1B221D] border border-[#F5F3EC]/15 text-[#F5F3EC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F5F3EC]/12">
              <div className="text-xs uppercase tracking-[0.12em] text-[#B5945B]">
                {lightboxItem.category}
                {lightboxItem.mediaType === 'actual-site' ? ' · Real Site Photo (Shot at Sight)' : ''}
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close gallery lightbox"
                className="p-2 text-[#F5F3EC] hover:text-[#B5945B] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.alt}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain aranya-photo"
              />
              <button
                type="button"
                onClick={() => stepLightbox(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#141815]/80 text-[#F5F3EC] p-2.5 hover:bg-[#1F3527] cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => stepLightbox(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#141815]/80 text-[#F5F3EC] p-2.5 hover:bg-[#1F3527] cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="font-display text-2xl font-medium text-[#F5F3EC]">
                {lightboxItem.title}
              </h3>
              <p className="mt-1 text-sm text-[#E6E0D3]/80">{lightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
