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
  const touchStartY = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 40; // Pixels required to trigger swipe navigation

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
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distanceX = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    if (isLeftSwipe && onNext) {
      onNext();
    } else if (isRightSwipe && onPrev) {
      onPrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-in fade-in duration-200 select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-40 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Close Lightbox (Esc)"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Subtle Previous Navigation Control */}
      {hasNavigation && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="flex absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 text-white/80 hover:text-white p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/75 sm:bg-white/10 sm:hover:bg-white/20 backdrop-blur-xs transition-all cursor-pointer items-center justify-center shadow-lg"
          aria-label="Previous photograph (Left Arrow or Swipe Right)"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Subtle Next Navigation Control */}
      {hasNavigation && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="flex absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 text-white/80 hover:text-white p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/75 sm:bg-white/10 sm:hover:bg-white/20 backdrop-blur-xs transition-all cursor-pointer items-center justify-center shadow-lg"
          aria-label="Next photograph (Right Arrow or Swipe Left)"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center px-2">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black">
          <img
            src={imageSrc}
            alt={title || 'Hesil Villa Photograph'}
            className="max-h-[72vh] sm:max-h-[76vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Caption & Counter Bar */}
        <div className="mt-3 sm:mt-4 text-center text-white max-w-xl px-4">
          <div className="flex items-center justify-center gap-3">
            {title && (
              <h4 className="font-serif text-lg sm:text-2xl font-normal text-[#F4F1E7]">
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
            <p className="text-xs font-sans text-[#F4F1E7]/80 font-light mt-1 max-w-md mx-auto line-clamp-2">
              {caption}
            </p>
          )}

          {/* Touch navigation hint on mobile */}
          <span className="sm:hidden text-[10px] text-white/50 block mt-1.5 font-sans font-light">
            Swipe left or right or use arrows to navigate
          </span>
        </div>
      </div>
    </div>
  );
}
