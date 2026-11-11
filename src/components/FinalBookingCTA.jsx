import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function FinalBookingCTA({ onOpenBooking }) {
  const { contact } = homestayConfig;

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2.5">
          Direct Host Communication
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight mb-4">
          A peaceful stay starts with a simple conversation.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#52574E] font-light leading-relaxed mb-8 max-w-lg mx-auto">
          Tell us your travel dates and guest count. We'll help you choose the right accommodation at Hesil Villa.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <a
            href={contact.callUrl}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#C9AE8C]/60 hover:border-[#263D32] text-[#343831] hover:text-[#263D32] text-xs font-sans uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#71866B]" />
            <span>Call</span>
          </a>
        </div>

        {/* Direct WhatsApp Contact */}
        <div className="text-xs font-sans text-[#71866B] flex items-center justify-center gap-2">
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <a
            href={contact.primaryWhatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#263D32] underline underline-offset-4 font-medium"
          >
            {contact.primaryPhoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
