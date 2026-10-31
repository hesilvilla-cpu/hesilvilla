import React from 'react';

export default function Logo({
  variant = 'dark', // 'dark' | 'light'
  showSubtext = true,
  className = '',
  iconOnly = false,
}) {
  const isLight = variant === 'light';
  const primaryColor = isLight ? '#F4F1E7' : '#263D32';
  const leafColor = isLight ? '#B7C3A4' : '#71866B';
  const textColor = isLight ? '#F4F1E7' : '#263D32';
  const subtextColor = isLight ? '#C9AE8C' : '#71866B';

  if (iconOnly) {
    return (
      <svg
        className={`w-9 h-9 ${className}`}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Hesil Villa Mark"
      >
        <path
          d="M4 25L22 10L40 25"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 25V35H34V25"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 10C22 5.5 26 2.5 29 2.5C29 5.5 25 8.5 22 10Z"
          fill={leafColor}
        />
        <path
          d="M19 26H25V35H19V26Z"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Mark */}
      <svg
        className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 25L22 10L40 25"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 25V35H34V25"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 10C22 5.5 26 2.5 29 2.5C29 5.5 25 8.5 22 10Z"
          fill={leafColor}
        />
        <path
          d="M19 26H25V35H19V26Z"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Refined Wordmark */}
      <div className="flex flex-col items-start leading-none">
        <span
          className="font-serif text-lg sm:text-xl font-normal tracking-[0.16em] uppercase transition-colors"
          style={{ color: textColor }}
        >
          Hesil Villa
        </span>
        {showSubtext && (
          <span
            className="text-[8px] sm:text-[9px] font-sans font-medium tracking-[0.32em] uppercase mt-1 transition-colors"
            style={{ color: subtextColor }}
          >
            Alappuzha
          </span>
        )}
      </div>
    </div>
  );
}
