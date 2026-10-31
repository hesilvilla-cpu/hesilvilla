import React, { useState } from 'react';
import { Users, Bed, Utensils, Maximize2, ArrowRight } from 'lucide-react';
import ShareButton from './ShareButton';
import { homestayConfig } from '../config/homestayConfig';

export default function Accommodations({ onOpenBookingWithRoom, onOpenLightbox }) {
  const [selectedId, setSelectedId] = useState('upper-bhk');

  const selectedRoom = homestayConfig.accommodations.find(
    (room) => room.id === selectedId
  ) || homestayConfig.accommodations[0];

  return (
    <section id="villa" className="py-20 md:py-28 bg-[#FFFFFF] text-[#343831] border-y border-[#C9AE8C]/30">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Share Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#C9AE8C]/30 gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
              The Living Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight">
              The Villa
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-sans text-xs sm:text-sm text-[#52574E] font-light max-w-sm hidden md:block">
              Two self-contained 1BHK suites with private kitchens, available individually or as a private buyout.
            </p>
            <ShareButton />
          </div>
        </div>

        {/* 1. Interactive Villa Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {homestayConfig.accommodations.map((acc) => {
            const isSelected = acc.id === selectedId;
            return (
              <button
                key={acc.id}
                onClick={() => setSelectedId(acc.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.16em] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#263D32] text-[#F4F1E7] shadow-xs'
                    : 'bg-[#F4F1E7] border border-[#C9AE8C]/50 text-[#52574E] hover:border-[#263D32] hover:text-[#263D32]'
                }`}
                aria-pressed={isSelected}
              >
                {acc.name}
              </button>
            );
          })}
        </div>

        {/* Active Accommodation Presentation */}
        <div
          key={selectedRoom.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-in fade-in duration-300"
        >
          {/* Large Photograph (7 Cols) */}
          <div className="lg:col-span-7">
            <div
              onClick={() => onOpenLightbox(selectedRoom.image, selectedRoom.name, selectedRoom.tagline)}
              className="relative rounded-2xl overflow-hidden shadow-xs border border-[#C9AE8C]/40 group cursor-pointer bg-[#F4F1E7]"
            >
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              
              {/* Demo image indicator */}
              <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-sm bg-black/60 text-[#F4F1E7] backdrop-blur-xs">
                DEMO IMAGE — REPLACE BEFORE LAUNCH
              </span>

              {/* Expand Hint */}
              <div className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-sans">View Photograph</span>
              </div>
            </div>

            {/* Gallery Thumbnails for selected room */}
            {selectedRoom.gallery && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {selectedRoom.gallery.map((thumb, idx) => (
                  <div
                    key={idx}
                    onClick={() => onOpenLightbox(thumb, `${selectedRoom.name} Detail ${idx + 1}`, selectedRoom.tagline)}
                    className="h-20 sm:h-24 rounded-xl overflow-hidden border border-[#C9AE8C]/40 cursor-pointer group/thumb bg-[#F4F1E7]"
                  >
                    <img
                      src={thumb}
                      alt={`${selectedRoom.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover group-hover/thumb:scale-106 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details & Specs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#71866B] font-semibold block mb-1">
                {selectedRoom.tagline}
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#263D32] font-normal mb-3">
                {selectedRoom.name}
              </h3>

              <p className="font-sans text-sm text-[#52574E] font-light leading-relaxed mb-6">
                {selectedRoom.description}
              </p>

              {/* Key Specs */}
              <div className="space-y-2.5 text-xs text-[#52574E] font-light pb-6 border-b border-[#C9AE8C]/30">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#71866B] shrink-0" />
                  <span>{selectedRoom.layout}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#71866B] shrink-0" />
                  <span>Ideal for {selectedRoom.capacity.ideal} ({selectedRoom.capacity.max})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-[#71866B] shrink-0" />
                  <span>{selectedRoom.bed}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="py-5 space-y-2">
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#263D32] font-semibold block mb-2">
                  Key Features:
                </span>
                {selectedRoom.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#52574E] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#71866B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rates & Action */}
            <div className="pt-5 border-t border-[#C9AE8C]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#71866B] font-sans block">
                  {selectedRoom.price.amount ? `${selectedRoom.price.amount} / night` : "Contact us for current rates."}
                </span>
                <span className="text-[10px] text-[#52574E]/75 font-sans">
                  {selectedRoom.price.note}
                </span>
              </div>

              <button
                onClick={() => onOpenBookingWithRoom(selectedRoom.name)}
                className="px-6 py-3 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Enquire for this Suite</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9AE8C]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
