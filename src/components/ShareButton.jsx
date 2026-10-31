import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton({ className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Hesil Villa | Alappuzha Homestay',
      text: 'A peaceful homestay in Alappuzha, Kerala with independent 1BHK suites and private kitchens.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyFallback();
        }
      }
    } else {
      copyFallback();
    }
  };

  const copyFallback = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C9AE8C]/60 hover:border-[#263D32] bg-[#FFFFFF] text-[#343831] hover:text-[#263D32] text-xs font-sans font-medium transition-colors cursor-pointer"
        aria-label="Share Hesil Villa link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Link Copied</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-[#71866B]" />
            <span>Share Villa</span>
          </>
        )}
      </button>

      {/* Floating feedback tooltip for accessibility */}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#263D32] text-[#F4F1E7] text-[10px] font-sans px-2.5 py-1 rounded-md shadow-md whitespace-nowrap animate-in fade-in duration-200">
          Copied to clipboard
        </span>
      )}
    </div>
  );
}
