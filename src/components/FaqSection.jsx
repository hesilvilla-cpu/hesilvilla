import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { faqs } = homestayConfig;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-24 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
            Essential Details
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#263D32] font-normal leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#52574E] font-light mt-2">
            Factual answers regarding timings, capacities, parking, and stay arrangements.
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="divide-y divide-[#C9AE8C]/30 border-y border-[#C9AE8C]/30">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-4 sm:py-5">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl text-[#263D32] hover:text-[#71866B] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#71866B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-xs sm:text-sm font-sans text-[#52574E] font-light leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
