import React, { useState } from 'react';

/**
 * OptimizedImage Component
 * - Renders responsive images with graceful fallback
 * - Handles missing local files gracefully via onError
 * - Never shows broken image icons
 */
export default function OptimizedImage({
  src,
  fallbackSrc,
  alt = 'Hesil Villa',
  className = '',
  loading = 'lazy',
  onClick,
}) {
  const [failedSrcs, setFailedSrcs] = useState({});

  const hasFailed = failedSrcs[src];
  const activeSrc = hasFailed && fallbackSrc ? fallbackSrc : src;

  const handleError = () => {
    if (!hasFailed && fallbackSrc) {
      setFailedSrcs((prev) => ({ ...prev, [src]: true }));
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`} onClick={onClick}>
      <img
        src={activeSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        className="w-full h-full object-cover object-center transition-transform duration-700 block"
      />
    </div>
  );
}
