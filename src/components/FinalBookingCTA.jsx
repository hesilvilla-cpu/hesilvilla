import React from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function FinalBookingCTA({ onOpenBooking }) {
  const { contact } = homestayConfig;

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] text-[#343831] border-b border-[#C9AE8C]/30 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-3">
          Direct Host Communication
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight mb-4">
          Plan Your Staycation
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#52574E] font-light leading-relaxed mb-6 max-w-xl mx-auto">
          Reach out directly via WhatsApp or phone to check availability, discuss custom requirements, or confirm rates for your preferred dates.
        </p>

        {/* Pricing Notice */}
        <div className="p-4 rounded-xl bg-[#F4F1E7] border border-[#C9AE8C]/40 mb-8 text-xs font-sans text-[#52574E] leading-relaxed max-w-lg mx-auto">
          <span className="font-semibold text-[#263D32] block mb-0.5">
            Confirmed Pricing & Availability:
          </span>
          <span>
            {homestayConfig.policies.ratesNotice} Complimentary breakfast included with all stays. Advance payment is required to confirm reservation.
          </span>
        </div>

        {/* Action Buttons with Both Contacts */}
        <div className="space-y-4 max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <a
              href={contact.primaryWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: {contact.primaryPhoneDisplay}</span>
            </a>

            <a
              href={contact.secondaryWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full border border-[#263D32] text-[#263D32] hover:bg-[#F4F1E7] text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: {contact.secondaryPhoneDisplay}</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3 rounded-full border border-[#C9AE8C] hover:border-[#263D32] bg-[#F4F1E7] text-[#263D32] text-xs font-sans uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#71866B]" />
              <span>Detailed Price Estimator & Enquiry Form</span>
            </button>

            <a
              href={contact.callUrl}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-sans uppercase tracking-[0.14em] font-medium text-[#52574E] hover:text-[#263D32] transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#71866B]" />
              <span>Normal Phone Call</span>
            </a>
          </div>
        </div>

        <p className="text-[11px] text-[#52574E]/75 font-sans font-light mt-7">
          * Direct communication with the host. This is an enquiry, not an automated reservation.
        </p>
      </div>
    </section>
  );
}
