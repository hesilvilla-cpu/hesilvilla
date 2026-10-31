import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the accommodation layout at Hesil Villa?",
      answer:
        "Hesil Villa consists of two independent, self-contained 1BHK suites across two floors: the Upper BHK (first floor with private terrace balcony) and the Lower BHK (ground floor with garden verandah access). Each suite features its own air-conditioned master bedroom, ensuite modern bathroom, and private kitchen. Guests can reserve either suite individually or book the Entire Villa for exclusive private buyout.",
    },
    {
      question: "What cooking facilities are included in the private kitchens?",
      answer:
        "Both suites include a dedicated private kitchen equipped with a gas cooktop, refrigerator, cookware, and dining essentials, allowing guests to brew fresh morning tea or prepare meals at their leisure.",
    },
    {
      question: "What are the check-in and check-out timings?",
      answer:
        "Check-in begins at 2:00 PM and check-out is by 11:00 AM. If you require early arrival or late departure, please coordinate directly with the host on WhatsApp subject to room availability.",
    },
    {
      question: "Is vehicle parking available on the premises?",
      answer:
        "Yes, secure private on-premises parking is available for guest cars and two-wheelers.",
    },
    {
      question: "How are stay enquiries and bookings handled?",
      answer:
        "Enquiries are managed directly with the host via WhatsApp with zero platform commissions. Rates and dates are verified personally with you before finalizing your stay.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-24 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#263D32] font-normal leading-tight">
            Frequently Asked Questions
          </h2>
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
