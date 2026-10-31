import React from 'react';

export default function AmenitiesSection() {
  const confirmedAmenities = [
    { title: "2 Private Kitchens", desc: "Equipped with gas stove, refrigerator, and cooking essentials in each BHK" },
    { title: "Air Conditioning", desc: "Individual climate control in each master bedroom suite" },
    { title: "High-Speed Wi-Fi", desc: "Reliable fiber internet for leisure or remote working" },
    { title: "Power Backup", desc: "Automatic inverter backup ensuring uninterrupted power" },
    { title: "Private Parking", desc: "Gated, secure on-premises parking for vehicles" },
    { title: "24/7 Hot Water", desc: "Instant hot water geysers in both private bathrooms" },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
            Comforts & Facilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#263D32] font-normal leading-tight">
            Essential Amenities
          </h2>
        </div>

        {/* Minimal Clean List (Not a heavy grid of cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {confirmedAmenities.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3.5 pb-4 border-b border-[#C9AE8C]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#71866B] shrink-0 mt-2" />
              <div>
                <h3 className="font-serif text-lg text-[#263D32] font-normal">
                  {item.title}
                </h3>
                <p className="text-xs text-[#52574E] font-light leading-relaxed mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
