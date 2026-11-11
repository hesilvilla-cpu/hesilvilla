import React, { useState, useRef } from 'react';
import { MapPin, Navigation, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';
import OptimizedImage from './OptimizedImage';

export default function LocationSection() {
  const { nearbyAttractions, contact } = homestayConfig;
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Swipe gesture handling for mobile
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartXRef.current;
    const diffY = touchEndY - touchStartYRef.current;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % nearbyAttractions.length);
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + nearbyAttractions.length) % nearbyAttractions.length);
  };

  const currentAttraction = nearbyAttractions[activeSlideIndex] || nearbyAttractions[0];

  return (
    <section id="location" className="py-20 md:py-28 bg-[#F4F1E7] text-[#343831] border-t border-[#C9AE8C]/30">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
            Surroundings & Access
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight">
            Location & Connectivity
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#52574E] font-light mt-3 leading-relaxed">
            Situated in a quiet, slightly interior residential neighborhood near Kanichukulangara, Alappuzha. Set back from crowded tourist roads, Hesil Villa offers a peaceful green sanctuary while remaining minutes away from Kerala's tranquil beaches, historic basilicas, and sacred landmarks.
          </p>
        </div>

        {/* 2-Column Travel Editorial Layout (Desktop) / Stacked (Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (Desktop 6 Cols / Mobile Stacked): Interactive Responsive Map Filling Entire Container */}
          <div className="lg:col-span-6 flex flex-col h-full bg-[#FFFFFF] border border-[#C9AE8C]/40 rounded-3xl p-5 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C9AE8C]/30 shrink-0">
              <span className="text-xs font-sans uppercase tracking-wider text-[#71866B] font-semibold">
                Property Location
              </span>
              <span className="text-xs font-sans text-[#263D32] font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Kanichukulangara, Alappuzha</span>
              </span>
            </div>

            {/* Map Iframe Container - Flex-1 so it completely fills the height matching the right card */}
            <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[340px] rounded-2xl overflow-hidden border border-[#C9AE8C]/40 bg-[#F4F1E7]">
              <iframe
                title="Hesil Villa Location Map"
                src={contact.googleMapsEmbedUrl}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Directions Link & Clear Address */}
            <div className="mt-4 pt-4 border-t border-[#C9AE8C]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-sans text-[#52574E] font-light">
                Private enclosed compound with parking for up to 4 cars.
              </span>

              <a
                href={contact.googleMapsDirectLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-wider font-semibold transition-colors shadow-xs shrink-0 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C9AE8C]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-[#C9AE8C]" />
              </a>
            </div>
          </div>

          {/* Right Column (Desktop 6 Cols / Mobile Stacked): Nearby Attractions Photographic Carousel */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#C9AE8C]/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              {/* Carousel Header & Navigation Controls */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#C9AE8C]/30">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#71866B] font-semibold block mb-0.5">
                    Local Highlights
                  </span>
                  <h3 className="font-serif text-2xl text-[#263D32] font-normal">
                    Nearby Attractions
                  </h3>
                </div>

                {/* Prev / Next Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Previous attraction"
                    className="w-8 h-8 rounded-full border border-[#C9AE8C]/50 hover:border-[#263D32] hover:bg-[#F4F1E7] text-[#263D32] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-[#71866B] px-1 font-medium">
                    {activeSlideIndex + 1}/{nearbyAttractions.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Next attraction"
                    className="w-8 h-8 rounded-full border border-[#C9AE8C]/50 hover:border-[#263D32] hover:bg-[#F4F1E7] text-[#263D32] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Card with Mobile Touch Swipe */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="select-none animate-in fade-in duration-300"
              >
                {/* Attraction Photograph */}
                <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 border border-[#C9AE8C]/30 bg-[#263D32] mb-5 group">
                  <OptimizedImage
                    src={currentAttraction.image}
                    fallbackSrc={currentAttraction.fallbackImage}
                    alt={currentAttraction.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Tag on image */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-sans uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[#F4F1E7] border border-white/10">
                      {currentAttraction.tag}
                    </span>
                  </div>

                  {/* Distance badge on image */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs font-sans font-medium px-3 py-1 rounded-full bg-white/95 text-[#263D32] shadow-xs">
                      {currentAttraction.distance}
                    </span>
                  </div>
                </div>

                {/* Attraction Information */}
                <div>
                  <h4 className="font-serif text-2xl text-[#263D32] font-normal mb-2">
                    {currentAttraction.name}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#52574E] font-light leading-relaxed mb-4">
                    {currentAttraction.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide Indicator Dots & Quick Switcher */}
            <div className="pt-4 border-t border-[#C9AE8C]/30 flex items-center justify-between">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {nearbyAttractions.map((att, idx) => (
                  <button
                    key={att.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${att.name}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeSlideIndex
                        ? 'w-6 bg-[#263D32]'
                        : 'w-2 bg-[#C9AE8C]/60 hover:bg-[#71866B]'
                    }`}
                  />
                ))}
              </div>

              {/* Mobile swipe hint */}
              
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
