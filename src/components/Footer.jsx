import React from 'react';
import { MessageCircle, Phone, MapPin, Navigation } from 'lucide-react';
import Logo from './Logo';
import { homestayConfig } from '../config/homestayConfig';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const { contact } = homestayConfig;

  return (
    <footer className="bg-[#263D32] text-[#F4F1E7] py-16 border-t border-[#1A2B23]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Logo & Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" />
            <p className="text-sm font-sans text-[#F4F1E7]/85 font-light leading-relaxed max-w-sm">
              Your own little escape in Kerala. A peaceful private stay surrounded by nature.
            </p>
            <div className="inline-flex items-center gap-4 text-xs font-sans text-[#C9AE8C] bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
              <span><strong>Check-in:</strong> 11:00 AM</span>
              <span className="text-white/20">•</span>
              <span><strong>Check-out:</strong> 10:00 AM</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C9AE8C] font-semibold block">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs font-sans tracking-wide text-[#F4F1E7]/80">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">The Property</a></li>
              <li><a href="#villa" className="hover:text-white transition-colors">Accommodations</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a></li>
              <li><a href="#amenities" className="hover:text-white transition-colors">Amenities</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Location & Directions</a></li>
            </ul>
          </div>

          {/* Location & Confirmed Contact Info */}
          <div className="md:col-span-4 space-y-3 text-xs font-sans text-[#F4F1E7]/85 font-light">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C9AE8C] font-semibold block">
              Location & Enquiries
            </span>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C9AE8C] shrink-0 mt-0.5" />
              <span>Kanichukulangara, Mararikulam North, Alappuzha, Kerala</span>
            </div>

            {/* Main WhatsApp & Call */}
            <div className="pt-1 flex items-center gap-3">
              <a
                href={contact.primaryWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {contact.primaryPhoneDisplay}</span>
              </a>
              <span className="text-white/30">•</span>
              <a
                href={`tel:${contact.primaryPhone}`}
                className="hover:text-white transition-colors flex items-center gap-1"
                title="Call"
              >
                <Phone className="w-3 h-3 text-[#C9AE8C]" />
                <span>Call</span>
              </a>
            </div>

            {/* Secondary Contact Number */}
            <div className="flex items-center gap-3">
              <a
                href={contact.secondaryWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {contact.secondaryPhoneDisplay}</span>
              </a>
              <span className="text-white/30">•</span>
              <a
                href={`tel:${contact.secondaryPhone}`}
                className="hover:text-white transition-colors flex items-center gap-1"
                title="Call Secondary Contact"
              >
                <Phone className="w-3 h-3 text-[#C9AE8C]" />
                <span>Call</span>
              </a>
            </div>

            {/* Google Maps Directions */}
            <div className="pt-2">
              <a
                href={contact.googleMapsDirectLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[#C9AE8C] transition-colors underline underline-offset-4"
              >
                <Navigation className="w-4 h-4 text-[#C9AE8C] shrink-0" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#F4F1E7]/60 gap-3">
          <p>© {currentYear} Hesil Villa. All rights reserved.</p>
          <p>Alappuzha (Alleppey), Kerala, India</p>
        </div>

      </div>
    </footer>
  );
}
