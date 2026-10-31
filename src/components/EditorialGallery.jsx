import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function EditorialGallery({ onOpenGalleryLightbox }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'bedrooms', label: 'Bedrooms' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'garden', label: 'Garden' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? homestayConfig.gallery
    : homestayConfig.gallery.filter((photo) => photo.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#F4F1E7] text-[#343831]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[#C9AE8C]/40 gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
              Visual Presentation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight">
              Gallery
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#52574E] font-light max-w-sm">
            Select an area or click any photograph to expand into the fullscreen viewer.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.16em] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#263D32] text-[#F4F1E7] shadow-xs'
                    : 'bg-[#FFFFFF] border border-[#C9AE8C]/50 text-[#52574E] hover:border-[#263D32] hover:text-[#263D32]'
                }`}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-start">
          {filteredPhotos.map((item, index) => {
            // Asymmetric layout with varied natural proportions
            let colSpan = 'lg:col-span-4';
            let heightClass = 'h-[320px] sm:h-[380px]';

            if (item.aspect === 'landscape' && (index === 0 || index === 5)) {
              colSpan = 'lg:col-span-8';
              heightClass = 'h-[360px] sm:h-[420px]';
            } else if (item.aspect === 'portrait') {
              colSpan = 'lg:col-span-4';
              heightClass = 'h-[400px] sm:h-[460px]';
            } else {
              colSpan = 'lg:col-span-6';
              heightClass = 'h-[340px] sm:h-[400px]';
            }

            return (
              <div
                key={item.id}
                className={`${colSpan} group relative rounded-2xl overflow-hidden border border-[#C9AE8C]/40 shadow-2xs hover:shadow-md transition-all duration-500 cursor-pointer bg-[#263D32] animate-in fade-in duration-300`}
                onClick={() => onOpenGalleryLightbox(filteredPhotos, index)}
              >
                <div className={`w-full ${heightClass} overflow-hidden`}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                {/* Development demo indicator */}
                <span className="absolute top-3 left-3 text-[8px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-sm bg-black/60 text-[#F4F1E7] backdrop-blur-xs">
                  DEMO IMAGE — REPLACE BEFORE LAUNCH
                </span>

                {/* Caption on hover/bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-normal leading-snug text-[#F4F1E7]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-sans text-[#F4F1E7]/75 font-light mt-0.5 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#263D32] transition-colors shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
