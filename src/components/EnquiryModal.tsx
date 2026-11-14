import { useEffect } from 'react';
import { X } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';

interface EnquiryModalProps {
  open: boolean;
  sourceSection: string;
  onClose: () => void;
}

export function EnquiryModal({ open, sourceSection, onClose }: EnquiryModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 bg-[#141815]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#F5F3EC] text-[#141815] border border-[#1F3527]/20 p-6 sm:p-9 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-[#1F3527]/15">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D6150]">
              Silpa Aranya Team · Free Callback &amp; Brochure
            </p>
            <h2 id="enquiry-modal-title" className="mt-1 font-display text-3xl font-medium">
              CONTACT OUR TEAM
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#141815]/70 hover:text-[#141815] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <EnquiryForm sourceSection={sourceSection} idPrefix="modal" />
      </div>
    </div>
  );
}
