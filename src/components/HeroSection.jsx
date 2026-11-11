import React from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function HeroSection({ onOpenBooking }) {
  const scrollToVilla = () => {
    const target = document.getElementById('villa');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppAction = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const directUrl = `${homestayConfig.contact.primaryWhatsappUrl}?text=${encodeURIComponent(
        'Hello Hesil Villa! I would like to enquire about staying at your villa in Alappuzha. Could you please share availability and current rates?'
      )}`;
      window.open(directUrl, '_blank');
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#1A2B23] text-white">
      {/* Large Featured Villa Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/exterior/villa-exterior-01.webp"
          alt="Hesil Villa Alappuzha"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Focused Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Small Brand Eyebrow */}
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-[#F4F1E7]/90 font-medium mb-4">
          Hesil Villa • Alappuzha, Kerala
        </span>

        {/* Main Brand Message */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F4F1E7] tracking-tight leading-[1.14] mb-6 drop-shadow-xs">
          Your own little escape <br className="hidden sm:inline" />
          <span className="italic font-light text-[#F4F1E7]">in Kerala.</span>
        </h1>

        {/* Supporting Description */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#F4F1E7]/90 font-light max-w-xl mx-auto leading-relaxed mb-8">
          Find your space to relax, reconnect and enjoy a peaceful stay surrounded by nature.
        </p>

        {/* Primary and Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={scrollToVilla}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F4F1E7] text-[#263D32] hover:bg-white text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            Explore the Villa
          </button>
          
          <button
            onClick={handleWhatsAppAction}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/60 bg-black/25 hover:bg-white/15 backdrop-blur-xs text-[#F4F1E7] text-xs font-sans uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <button
        onClick={scrollToVilla}
        aria-label="Scroll to Villa Details"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
