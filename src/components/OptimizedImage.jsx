import React, { useState } from 'react';

/**
 * OptimizedImage Component
 * - Renders responsive images with graceful fallback
 * - Handles missing local files gracefully via onError
 * - Never shows broken image icons
 * - Supports dev placeholder badges
 */
export default function OptimizedImage({
  src,
  fallbackSrc,
  alt = 'Hesil Villa',
  className = '',
  loading = 'lazy',
  showPlaceholderBadge = false,
  badgeText = 'DEMO IMAGE — REPLACE BEFORE LAUNCH',
  onClick,
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      <img
        src={imgSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        className="w-full h-full object-cover object-center transition-transform duration-700"
      />

      {showPlaceholderBadge && (
        <span className="absolute top-3 left-3 z-20 text-[8px] sm:text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-sm bg-black/65 text-[#F4F1E7] backdrop-blur-xs select-none pointer-events-none">
          {badgeText}
        </span>
      )}
    </div>
  );
}
