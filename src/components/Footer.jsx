import React from 'react';
import { MessageCircle, Phone, MapPin, Navigation } from 'lucide-react';
import Logo from './Logo';
import { homestayConfig } from '../config/homestayConfig';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const { contact } = homestayConfig;

  return (
    <footer className="bg-[#1A2B23] text-[#F4F1E7] py-16 border-t border-[#263D32]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-12 border-b border-white/10">
          
          {/* Logo & Brief Note */}
          <div className="max-w-sm">
            <Logo variant="light" className="mb-4" />
            <p className="text-xs font-sans text-[#F4F1E7]/75 font-light leading-relaxed">
              Your own little escape in Kerala. A private, quiet homestay in Alappuzha with AC suites, budget cottages, garden fish pond, outdoor leisure spaces, and the warmth of a Kerala home.
            </p>
          </div>

          {/* Location & Direct Contact (Both Confirmed Numbers) */}
          <div className="space-y-3 text-xs font-sans text-[#F4F1E7]/85 font-light">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#71866B] shrink-0 mt-0.5" />
              <span>Kanichukulangara, Mararikulam North, Alappuzha, Kerala</span>
            </div>

            {/* Primary Host WhatsApp & Call */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={contact.primaryWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {contact.primaryPhoneDisplay}
                </a>
              </div>
              <span className="text-white/30">•</span>
              <a
                href={`tel:${contact.primaryPhone}`}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#71866B]" />
                <span>Call</span>
              </a>
            </div>

            {/* Secondary Host WhatsApp & Call */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={contact.secondaryWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {contact.secondaryPhoneDisplay}
                </a>
              </div>
              <span className="text-white/30">•</span>
              <a
                href={`tel:${contact.secondaryPhone}`}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#71866B]" />
                <span>Call</span>
              </a>
            </div>

            {/* Google Maps Directions */}
            <div className="flex items-center gap-2.5 pt-1">
              <Navigation className="w-4 h-4 text-[#C9AE8C] shrink-0" />
              <a
                href={contact.googleMapsDirectLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors underline underline-offset-2"
              >
                Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Essential Links */}
          <div className="flex flex-col gap-2.5 text-xs font-sans uppercase tracking-[0.16em] text-[#F4F1E7]/80">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#villa" className="hover:text-white transition-colors">Accommodations</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <a href="#location" className="hover:text-white transition-colors">Location</a>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#F4F1E7]/50 gap-3">
          <p>© {currentYear} Hesil Villa. All rights reserved.</p>
          <p>Alappuzha (Alleppey), Kerala, India</p>
        </div>

      </div>
    </footer>
  );
}
