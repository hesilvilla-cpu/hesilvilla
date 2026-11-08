import React, { useState } from 'react';
import { Share2, Check, AlertCircle } from 'lucide-react';

export default function ShareButton({ className = '' }) {
  const [copyStatus, setCopyStatus] = useState(null); // null | 'success' | 'error'

  const handleShare = async () => {
    const shareData = {
      title: 'Hesil Villa | Private Kerala Homestay',
      text: 'Your own little escape in Kerala. A peaceful stay in Alappuzha with a garden fish pond and natural greenery.',
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
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopyStatus('success');
          setTimeout(() => setCopyStatus(null), 3000);
        })
        .catch(() => {
          setCopyStatus('error');
          setTimeout(() => setCopyStatus(null), 3000);
        });
    } else {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          setCopyStatus('success');
          setTimeout(() => setCopyStatus(null), 3000);
        } else {
          setCopyStatus('error');
          setTimeout(() => setCopyStatus(null), 3000);
        }
      } catch {
        setCopyStatus('error');
        setTimeout(() => setCopyStatus(null), 3000);
      }
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C9AE8C]/60 hover:border-[#263D32] bg-[#FFFFFF] text-[#343831] hover:text-[#263D32] text-xs font-sans font-medium transition-colors cursor-pointer shadow-2xs"
        aria-label="Share Hesil Villa link"
      >
        {copyStatus === 'success' ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Link copied!</span>
          </>
        ) : copyStatus === 'error' ? (
          <>
            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            <span className="text-red-600">Copy failed</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-[#71866B]" />
            <span>Share</span>
          </>
        )}
      </button>

      {/* Floating feedback toast for confirmation */}
      {copyStatus === 'success' && (
        <span
          role="status"
          className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#263D32] text-[#F4F1E7] text-[11px] font-sans px-3 py-1 rounded-md shadow-md whitespace-nowrap animate-in fade-in duration-200 z-30"
        >
          Link copied successfully!
        </span>
      )}

      {copyStatus === 'error' && (
        <span
          role="status"
          className="absolute -top-9 left-1/2 -translate-x-1/2 bg-red-700 text-white text-[11px] font-sans px-3 py-1 rounded-md shadow-md whitespace-nowrap animate-in fade-in duration-200 z-30"
        >
          Unable to copy link
        </span>
      )}
    </div>
  );
}
