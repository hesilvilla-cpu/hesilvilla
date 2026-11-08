import React from 'react';
import { homestayConfig } from '../config/homestayConfig';

export default function EditorialAbout() {
  return (
    <section className="py-20 md:py-28 bg-[#F4F1E7] text-[#343831]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#71866B] font-semibold block mb-4">
          Welcome to Hesil Villa
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] leading-snug font-normal mb-8">
          A private homestay with the <br className="hidden sm:inline" />
          <span className="italic font-light">warmth of a Kerala home.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#52574E] font-light leading-relaxed mb-6">
          {homestayConfig.brand.supportingDescription}
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#52574E]/85 font-light leading-relaxed max-w-2xl mx-auto">
          Tucked away in a quieter, slightly interior residential area of Alappuzha, Hesil Villa is away from crowded tourist locations and enclosed within a leafy compound. Surrounded by mature trees, it provides a peaceful and private setting for families, couples and groups who value their own space and an unhurried stay.
        </p>
      </div>
    </section>
  );
}
