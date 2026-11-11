import React from 'react';
import { Coffee, Flame, Wifi, Car, Check } from 'lucide-react';

export default function AmenitiesSection() {
  const groupedAmenities = [
    {
      group: "Bed & Bath",
      items: [
        "Premium bedding, fresh linens & extra blankets",
        "Firm & soft pillow options",
        "Fresh bath towels provided for every guest",
        "Shampoo, conditioner, body wash & hand soap",
      ],
    },
    {
      group: "Climate & Power",
      items: [
        "Air conditioning in applicable suites",
        "Heating provisions, fans & space heaters where applicable",
        "24/7 hot water geysers in modern bathrooms",
        "Automatic inverter power backup for uninterrupted lighting",
      ],
    },
    {
      group: "Work & Leisure",
      items: [
        "High-speed Wi-Fi across the property",
        "Dedicated workspace table for remote work",
        "Television setup for relaxed entertainment",
        "Private parking for up to 4 cars inside gated compound",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-1.5">
            Thoughtful Comforts
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#263D32] font-normal leading-tight">
            Amenities & Inclusions
          </h2>
        </div>

        {/* Highlight Banner: Complimentary Breakfast & Key Facilities */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-[#F4F1E7] border border-[#C9AE8C]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="p-2.5 rounded-full bg-[#263D32] text-[#F4F1E7] shrink-0">
              <Coffee className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#263D32] font-normal">
                Complimentary breakfast included.
              </h3>
              <p className="text-xs text-[#52574E] font-light mt-0.5">
                Fresh breakfast prepared for all staying guests across suites and cottages.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-[#263D32] shrink-0 font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C9AE8C]/40">
              <Wifi className="w-3.5 h-3.5 text-[#71866B]" /> Free Wi-Fi
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C9AE8C]/40">
              <Car className="w-3.5 h-3.5 text-[#71866B]" /> 4-Car Parking
            </span>
          </div>
        </div>

        {/* 3 Compact Columns of Grouped Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {groupedAmenities.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-serif text-lg text-[#263D32] font-normal pb-2 border-b border-[#C9AE8C]/30">
                {col.group}
              </h4>
              <ul className="space-y-2 text-xs font-sans text-[#52574E] font-light">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#71866B] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Accurate Kitchen Notice Pill */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#C9AE8C]/50 text-xs font-sans text-[#52574E] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#71866B] shrink-0" />
            <span>
              <strong>Kitchen Policy:</strong> There is only one kitchen at Hesil Villa, located on the ground floor (downstairs) with basic amenities (available with Upper Suite & Entire Villa).
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#263D32] whitespace-nowrap bg-[#F4F1E7] px-2.5 py-1 rounded-md border border-[#C9AE8C]/30">
            Induction stove usage: ₹200 extra
          </span>
        </div>

      </div>
    </section>
  );
}
