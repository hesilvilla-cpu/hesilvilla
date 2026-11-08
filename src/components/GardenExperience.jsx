import React from 'react';
import { Waves, Sparkles, Trees, ShieldCheck } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function GardenExperience() {
  const { heading, copy, features } = homestayConfig.gardenExperience;

  const featureIcons = {
    pond: Waves,
    leisure: Sparkles,
    greenery: Trees,
    compound: ShieldCheck,
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-14">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
            The Stay Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight mb-5">
            {heading}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#52574E] font-light leading-relaxed">
            {copy}
          </p>
        </div>

        {/* 4 Feature Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item) => {
            const IconComponent = featureIcons[item.id] || Trees;
            return (
              <div
                key={item.id}
                className="bg-[#F4F1E7] border border-[#C9AE8C]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#263D32]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#71866B] font-semibold px-2.5 py-1 rounded-full bg-white/60 border border-[#C9AE8C]/30">
                      {item.tag}
                    </span>
                    <IconComponent className="w-5 h-5 text-[#263D32]" />
                  </div>

                  <h3 className="font-serif text-2xl text-[#263D32] font-normal mb-3">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#52574E] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outdoor Leisure Summary Note */}
        <div className="mt-10 p-5 rounded-xl bg-[#F4F1E7]/70 border border-[#C9AE8C]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-sans text-[#52574E] font-light">
            An enclosed private compound with a boundary wall, mature Kerala trees, and dedicated on-site parking for up to four cars.
          </p>
          <span className="text-[11px] font-sans uppercase tracking-wider text-[#263D32] font-semibold shrink-0">
            Exclusive Seclusion
          </span>
        </div>

      </div>
    </section>
  );
}
