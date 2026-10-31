import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function HeroSection({ onOpenBooking }) {
  const scrollToVilla = () => {
    const target = document.getElementById('villa');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#1A2B23] text-white">
      {/* Large Featured Villa Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Hesil Villa Alappuzha"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Demo image indicator */}
        <span className="absolute top-24 left-6 z-20 text-[9px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-sm bg-black/60 text-[#F4F1E7]/90 backdrop-blur-xs hidden sm:inline-block">
          DEMO PHOTOGRAPHY — REPLACE BEFORE LAUNCH
        </span>
      </div>

      {/* Focused Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Small Brand Eyebrow */}
        <span className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-[#F4F1E7]/90 font-medium mb-4">
          Hesil Villa • Alappuzha
        </span>

        {/* Short Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F4F1E7] tracking-tight leading-[1.12] mb-8 drop-shadow-xs">
          A peaceful stay <br className="hidden sm:inline" />
          <span className="italic font-light text-[#F4F1E7]">in Alappuzha.</span>
        </h1>

        {/* Single Clear Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={scrollToVilla}
            className="px-8 py-3.5 rounded-full bg-[#F4F1E7] text-[#263D32] hover:bg-white text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            Explore the Villa
          </button>
          
          <button
            onClick={onOpenBooking}
            className="px-7 py-3.5 rounded-full border border-white/60 bg-black/20 hover:bg-white/10 backdrop-blur-xs text-[#F4F1E7] text-xs font-sans uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
          >
            Enquire Now
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
