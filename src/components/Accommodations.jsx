import React, { useState } from 'react';
import { Users, Bed, Utensils, Maximize2, ArrowRight, Images, Wind, MessageCircle } from 'lucide-react';
import ShareButton from './ShareButton';
import OptimizedImage from './OptimizedImage';
import { homestayConfig } from '../config/homestayConfig';

export default function Accommodations({
  onOpenBookingWithRoom,
  onOpenLightbox,
  onViewPhotographs,
}) {
  const [activeGroup, setActiveGroup] = useState('suites'); // 'suites' | 'cottages'
  const [selectedId, setSelectedId] = useState('upper-suite');

  // Filter accommodations by active group
  const groupAccommodations = homestayConfig.accommodations.filter(
    (acc) => acc.categoryGroup === activeGroup
  );

  const selectedRoom =
    homestayConfig.accommodations.find((room) => room.id === selectedId) ||
    groupAccommodations[0] ||
    homestayConfig.accommodations[0];

  const handleGroupChange = (groupId) => {
    setActiveGroup(groupId);
    const firstInGroup = homestayConfig.accommodations.find(
      (acc) => acc.categoryGroup === groupId
    );
    if (firstInGroup) {
      setSelectedId(firstInGroup.id);
    }
  };

  const handleViewPhotographs = () => {
    if (onViewPhotographs) {
      onViewPhotographs(selectedRoom.galleryTag || selectedRoom.id);
    } else {
      const target = document.getElementById('gallery');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="villa" className="py-20 md:py-28 bg-[#FFFFFF] text-[#343831] border-y border-[#C9AE8C]/30">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Share Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[#C9AE8C]/30 gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
              Staycation Living Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight">
              Accommodations & Rates
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-sans text-xs sm:text-sm text-[#52574E] font-light max-w-sm hidden md:block">
              Choose from private AC suites, full property buyout, or peaceful budget cottages.
            </p>
            <ShareButton />
          </div>
        </div>

        {/* 1. Main Category Group Switcher: Suites & Entire Villa vs Cottages */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-[#F4F1E7] border border-[#C9AE8C]/50">
            {homestayConfig.accommodationCategories.map((cat) => {
              const isActive = activeGroup === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleGroupChange(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#263D32] text-[#F4F1E7] shadow-xs'
                      : 'text-[#52574E] hover:text-[#263D32]'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-sans text-[#71866B]">
            <span className="font-medium text-[#263D32]">Notice:</span> Rates are per night. Contact us to confirm availability.
          </div>
        </div>

        {/* 2. Accommodation Selection Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {groupAccommodations.map((acc) => {
            const isSelected = acc.id === selectedId;
            return (
              <button
                key={acc.id}
                onClick={() => setSelectedId(acc.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#263D32] text-[#F4F1E7] shadow-xs'
                    : 'bg-[#F4F1E7] border border-[#C9AE8C]/50 text-[#52574E] hover:border-[#263D32] hover:text-[#263D32]'
                }`}
                aria-pressed={isSelected}
              >
                <span>{acc.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#263D32]'
                }`}>
                  {acc.priceDisplay}
                </span>
                <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  acc.isAC
                    ? (isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-800')
                    : (isSelected ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-700')
                }`}>
                  {acc.acType}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Active Accommodation Presentation Card */}
        <div
          key={selectedRoom.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start animate-in fade-in duration-300 bg-[#F4F1E7]/40 border border-[#C9AE8C]/40 rounded-3xl p-6 sm:p-8"
        >
          {/* Left: Large Photograph (7 Cols) */}
          <div className="lg:col-span-7">
            <div
              onClick={() => onOpenLightbox(selectedRoom.image, selectedRoom.name, selectedRoom.tagline)}
              className="relative rounded-2xl overflow-hidden shadow-xs border border-[#C9AE8C]/40 group cursor-pointer bg-[#F4F1E7] h-[360px] sm:h-[440px]"
            >
              <OptimizedImage
                src={selectedRoom.image}
                fallbackSrc={selectedRoom.fallbackImage}
                alt={selectedRoom.name}
                className="w-full h-full group-hover:scale-102 transition-transform duration-700"
                showPlaceholderBadge={selectedRoom.isPlaceholder}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

              {/* Badges on image */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className={`text-[10px] font-sans uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-xs ${
                  selectedRoom.isAC
                    ? 'bg-emerald-900/90 text-emerald-100 backdrop-blur-xs'
                    : 'bg-stone-800/90 text-stone-100 backdrop-blur-xs'
                }`}>
                  {selectedRoom.acType}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/90 text-[#263D32] shadow-xs">
                  {selectedRoom.floor}
                </span>
              </div>

              {/* Expand Hint */}
              <div className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-sans">View Fullscreen</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {selectedRoom.gallery && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {selectedRoom.gallery.map((thumb, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      onOpenLightbox(
                        thumb,
                        `${selectedRoom.name} Detail ${idx + 1}`,
                        selectedRoom.tagline
                      )
                    }
                    className="h-20 sm:h-24 rounded-xl overflow-hidden border border-[#C9AE8C]/40 cursor-pointer group/thumb bg-[#F4F1E7]"
                  >
                    <OptimizedImage
                      src={thumb}
                      fallbackSrc={selectedRoom.galleryFallbacks?.[idx] || selectedRoom.fallbackImage}
                      alt={`${selectedRoom.name} detail ${idx + 1}`}
                      className="w-full h-full group-hover/thumb:scale-106 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details, Rates & Actions (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#71866B] font-semibold">
                  {selectedRoom.subtitle}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#263D32] font-normal mb-3">
                {selectedRoom.name}
              </h3>

              {/* Price Banner */}
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#C9AE8C]/50 shadow-2xs mb-5 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#71866B] font-sans block">
                    Confirmed Rate
                  </span>
                  <span className="font-serif text-3xl text-[#263D32] font-normal">
                    {selectedRoom.priceDisplay}
                  </span>
                  <span className="text-xs text-[#52574E] font-sans ml-1">/ night</span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#52574E] font-sans block">
                    Extra Bed Charge:
                  </span>
                  <span className="text-xs font-semibold text-[#263D32] font-sans">
                    {selectedRoom.extraBedChargeDisplay}
                    {selectedRoom.extraBedCharge > 0 ? ' / night' : ''}
                  </span>
                </div>
              </div>

              <p className="font-sans text-sm text-[#52574E] font-light leading-relaxed mb-6">
                {selectedRoom.description}
              </p>

              {/* Key Specs */}
              <div className="space-y-2.5 text-xs text-[#52574E] font-light pb-6 border-b border-[#C9AE8C]/30">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#71866B] shrink-0" />
                  <span>
                    <strong>Capacity:</strong> {selectedRoom.capacity.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-[#71866B] shrink-0" />
                  <span>
                    <strong>Climate:</strong> {selectedRoom.isAC ? 'Air-Conditioned (AC)' : 'Non-AC with Ceiling Fans & Natural Cross-Ventilation'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-[#71866B] shrink-0" />
                  <span>{selectedRoom.bed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#71866B] shrink-0" />
                  <span>{selectedRoom.kitchenNote}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="py-5 space-y-2">
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#263D32] font-semibold block mb-2">
                  Key Inclusions:
                </span>
                {selectedRoom.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#52574E] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#71866B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 border-t border-[#C9AE8C]/30 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => onOpenBookingWithRoom(selectedRoom.name)}
                  className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Enquire on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9AE8C]" />
                </button>

                {/* View Photographs Action */}
                <button
                  onClick={handleViewPhotographs}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-full border border-[#C9AE8C]/60 hover:border-[#263D32] bg-[#FFFFFF] hover:bg-[#F4F1E7] text-[#263D32] text-xs font-sans uppercase tracking-[0.14em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  title={`View photographs for ${selectedRoom.name}`}
                >
                  <Images className="w-3.5 h-3.5 text-[#71866B]" />
                  <span>View photographs</span>
                </button>
              </div>

              <p className="text-[11px] text-[#52574E]/80 text-center font-sans">
                Complimentary breakfast included with every stay.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Quick Comparison Table for All 5 Accommodations */}
        <div className="mt-14 pt-10 border-t border-[#C9AE8C]/30">
          <h3 className="font-serif text-2xl text-[#263D32] mb-6 text-center">
            Compare All Accommodation Options
          </h3>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-[#C9AE8C]/50 text-[#71866B] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Option</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Cooling</th>
                  <th className="py-3 px-3">Standard Capacity</th>
                  <th className="py-3 px-3">Max Extra Beds</th>
                  <th className="py-3 px-3">Rate / Night</th>
                  <th className="py-3 px-3">Extra Bed</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9AE8C]/20">
                {homestayConfig.accommodations.map((acc) => {
                  const isCurrent = acc.id === selectedId;
                  return (
                    <tr
                      key={acc.id}
                      className={`hover:bg-[#F4F1E7]/50 transition-colors ${
                        isCurrent ? 'bg-[#F4F1E7]/70 font-medium' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => {
                            setActiveGroup(acc.categoryGroup);
                            setSelectedId(acc.id);
                          }}
                          className="text-[#263D32] hover:underline font-semibold text-left cursor-pointer"
                        >
                          {acc.name}
                        </button>
                        <span className="block text-[10px] text-[#52574E] font-light">{acc.floor}</span>
                      </td>
                      <td className="py-3.5 px-3 text-[#52574E]">
                        {acc.categoryGroup === 'suites' ? 'Suites / Villa' : 'Cottages'}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${
                          acc.isAC ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {acc.acType}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-[#343831]">{acc.capacity.standard} Guests</td>
                      <td className="py-3.5 px-3 text-[#52574E]">
                        {acc.capacity.maxExtraBeds > 0 ? `Up to ${acc.capacity.maxExtraBeds}` : 'None'}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-[#263D32]">{acc.priceDisplay}</td>
                      <td className="py-3.5 px-3 text-[#52574E]">{acc.extraBedChargeDisplay}</td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => onOpenBookingWithRoom(acc.name)}
                          className="px-3 py-1.5 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-white text-[11px] uppercase tracking-wider font-medium cursor-pointer transition-colors"
                        >
                          Enquire
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
