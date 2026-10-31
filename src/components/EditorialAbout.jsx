import React from 'react';

export default function EditorialAbout() {
  return (
    <section className="py-20 md:py-28 bg-[#F4F1E7] text-[#343831]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#71866B] font-semibold block mb-4">
          Welcome to Hesil Villa
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] leading-snug font-normal mb-8">
          A quiet homestay designed for <br className="hidden sm:inline" />
          <span className="italic font-light">slow, restful days in Kerala.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#52574E] font-light leading-relaxed">
          Tucked away in a tranquil coastal neighborhood of Alappuzha, Hesil Villa offers independent 1BHK suites with private kitchens, peaceful garden surroundings, and the freedom to unwind at your own pace.
        </p>
      </div>
    </section>
  );
}
