import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { homestayConfig } from '../config/homestayConfig';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#1A2B23] text-[#F4F1E7] py-16 border-t border-[#263D32]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-12 border-b border-white/10">
          
          {/* Logo & Brief Note */}
          <div className="max-w-sm">
            <Logo variant="light" className="mb-4" />
            <p className="text-xs font-sans text-[#F4F1E7]/75 font-light leading-relaxed">
              A peaceful modern homestay in Alappuzha, Kerala. Independent 1BHK suites with private kitchens in a quiet coastal neighborhood.
            </p>
          </div>

          {/* Location & Direct Contact */}
          <div className="space-y-3 text-xs font-sans text-[#F4F1E7]/85 font-light">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#71866B] shrink-0 mt-0.5" />
              <span>Alappuzha (Alleppey), Kerala, India</span>
            </div>

            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              {homestayConfig.contact.whatsappNumber ? (
                <a
                  href={`https://wa.me/${homestayConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {homestayConfig.contact.phoneDisplay}
                </a>
              ) : (
                <span className="text-[#F4F1E7]/70 italic">
                  WhatsApp: Pending owner configuration
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#71866B] shrink-0" />
              {homestayConfig.contact.phone ? (
                <a
                  href={`tel:${homestayConfig.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  Call: {homestayConfig.contact.phoneDisplay}
                </a>
              ) : (
                <span className="text-[#F4F1E7]/70 italic">
                  Phone: Pending owner configuration
                </span>
              )}
            </div>
          </div>

          {/* Essential Links */}
          <div className="flex flex-col gap-2.5 text-xs font-sans uppercase tracking-[0.16em] text-[#F4F1E7]/80">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#villa" className="hover:text-white transition-colors">The Villa</a>
            <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            <a href="#location" className="hover:text-white transition-colors">Location</a>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#F4F1E7]/50 gap-3">
          <p>© {currentYear} Hesil Villa. All rights reserved.</p>
          <p>Alappuzha, Kerala</p>
        </div>

      </div>
    </footer>
  );
}
