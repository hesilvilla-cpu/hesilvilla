import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  caption,
  onNext,
  onPrev,
  hasNavigation = false,
  currentIndex,
  totalCount,
}) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 45; // Pixels required to trigger swipe navigation

  // Keyboard navigation on desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !imageSrc) return null;

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onNext) {
      onNext();
    } else if (isRightSwipe && onPrev) {
      onPrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-30 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Close Lightbox (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Desktop Previous Button */}
      {hasNavigation && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer items-center justify-center"
          aria-label="Previous photograph (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Desktop Next Button */}
      {hasNavigation && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer items-center justify-center"
          aria-label="Next photograph (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black">
          <img
            src={imageSrc}
            alt={title || 'Hesil Villa Photograph'}
            className="max-h-[75vh] w-auto max-w-full object-contain"
          />
          <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-sm bg-black/70 text-white/90">
            DEMO IMAGE — REPLACE BEFORE LAUNCH
          </span>
        </div>

        {/* Caption & Counter Bar */}
        <div className="mt-4 text-center text-white max-w-xl px-4">
          <div className="flex items-center justify-center gap-3">
            {title && (
              <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#F4F1E7]">
                {title}
              </h4>
            )}
            {totalCount > 1 && (
              <span className="text-[11px] font-sans text-[#C9AE8C] font-mono px-2 py-0.5 rounded-md bg-white/10">
                {currentIndex + 1} / {totalCount}
              </span>
            )}
          </div>
          {caption && (
            <p className="text-xs font-sans text-[#F4F1E7]/80 font-light mt-1">
              {caption}
            </p>
          )}

          {/* Touch navigation hint on mobile */}
          <span className="sm:hidden text-[10px] text-white/40 block mt-2 font-sans font-light">
            Swipe left or right to browse photographs
          </span>
        </div>
      </div>
    </div>
  );
}
