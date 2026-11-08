import React from 'react';
import { Coffee, Flame, Check } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function AmenitiesSection() {
  const { amenities } = homestayConfig;

  return (
    <section className="py-20 md:py-24 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
            Comforts & Facilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#263D32] font-normal leading-tight">
            Confirmed Amenities & Services
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#52574E] font-light mt-2">
            Verified property features to ensure a peaceful, comfortable stay.
          </p>
        </div>

        {/* Prominent Complimentary Breakfast Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-[#263D32] text-[#F4F1E7] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 rounded-full bg-white/10 text-[#C9AE8C]">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#C9AE8C] block mb-0.5">
                Included with Every Stay
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                Complimentary breakfast included.
              </h3>
              <p className="text-xs text-[#F4F1E7]/80 font-light mt-0.5">
                Fresh breakfast prepared for all staying guests across suites and cottages.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/15 text-[#F4F1E7] font-medium whitespace-nowrap">
            All Accommodations
          </span>
        </div>

        {/* 16 Confirmed Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-6 mb-12">
          {amenities.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 pb-3.5 border-b border-[#C9AE8C]/25">
              <div className="w-4 h-4 rounded-full bg-[#71866B]/20 text-[#263D32] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg text-[#263D32] font-normal leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-[#52574E] font-light leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Kitchen Facilities Notice Card */}
        <div className="bg-[#F4F1E7] border border-[#C9AE8C]/40 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-full bg-white text-[#71866B] shrink-0 mt-0.5">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-xl text-[#263D32] font-normal mb-1">
                Kitchen Facilities & Induction Stove
              </h4>
              <p className="text-xs font-sans text-[#52574E] font-light leading-relaxed">
                There is one kitchen upstairs with basic amenities (available with Upper Suite and Entire Villa bookings).
                <strong className="text-[#263D32] block sm:inline sm:ml-1">Basic kitchen amenities available. Induction stove usage: ₹200 extra.</strong>
              </p>
            </div>
          </div>
          <span className="text-[11px] font-sans uppercase tracking-wider text-[#71866B] font-semibold bg-white/80 px-3 py-1 rounded-full border border-[#C9AE8C]/30 shrink-0">
            ₹200 Extra for Induction
          </span>
        </div>

      </div>
    </section>
  );
}
