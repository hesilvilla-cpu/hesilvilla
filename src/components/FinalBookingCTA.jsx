import React from 'react';
import { MessageCircle } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function FinalBookingCTA({ onOpenBooking }) {
  const hasWhatsApp = Boolean(homestayConfig.contact.whatsappNumber);
  const directWhatsAppUrl = hasWhatsApp
    ? `https://wa.me/${homestayConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        'Hello Hesil Villa! I would like to enquire about staying at your villa in Alappuzha. Could you please share availability and current rates?'
      )}`
    : null;

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-3">
          Plan Your Stay
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight mb-4">
          Enquire About Availability
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#52574E] font-light leading-relaxed mb-8">
          We welcome direct enquiries. Reach out directly on WhatsApp to check current rates, confirm dates, or ask any questions about Hesil Villa.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {hasWhatsApp ? (
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Enquire on WhatsApp</span>
            </a>
          ) : (
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Enquire Now</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#C9AE8C] hover:border-[#263D32] text-[#263D32] hover:bg-[#F4F1E7] text-xs font-sans uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
          >
            Detailed Enquiry Form
          </button>
        </div>

        <p className="text-[11px] text-[#52574E]/80 font-sans font-light mt-6">
          * Direct WhatsApp message with the host. This is an enquiry, not an automated reservation.
        </p>
      </div>
    </section>
  );
}
