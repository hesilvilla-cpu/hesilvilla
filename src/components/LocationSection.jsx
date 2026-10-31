import React from 'react';
import { Navigation } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function LocationSection() {
  const verifiedDestinations = [
    {
      name: "Alappuzha Lighthouse & Town Beach",
      detail: "Accessible directly via the coastal road heading south (~6 km)",
    },
    {
      name: "Punnamada Lake (Houseboat Hub)",
      detail: "Direct connection via Alappuzha town link road",
    },
    {
      name: "Alappuzha Railway Station (ALLP)",
      detail: "Primary railway link connecting Southern Railway lines (~8 km)",
    },
    {
      name: "Cochin International Airport (COK)",
      detail: "Accessible via the northern NH 66 highway corridor (~80 km)",
    },
  ];

  return (
    <section id="location" className="py-20 md:py-28 bg-[#F4F1E7] text-[#343831]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
            Property Coordinates & Access
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight">
            Location
          </h2>
          <p className="font-sans text-sm text-[#52574E] font-light mt-3 leading-relaxed">
            Situated on the coastal road in Alappuzha at exact coordinates <span className="font-mono text-[#263D32]">9.635318, 76.307138</span>.
          </p>
        </div>

        {/* Map and Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Google Map (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-[#C9AE8C]/50 shadow-xs h-[360px] sm:h-[420px] bg-[#FFFFFF]">
              <iframe
                title="Hesil Villa Location Map"
                src={homestayConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-sans text-[#52574E] px-1 gap-2">
              <span>GPS: 9.635318125878603, 76.307138423238</span>
              <a
                href={homestayConfig.contact.googleMapsDirectLink}
                target="_blank"
                rel="noreferrer"
                className="text-[#263D32] font-semibold underline underline-offset-4 flex items-center gap-1"
              >
                <span>Open Pin in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Key Transit Routes & Direct Directions (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#C9AE8C]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl text-[#263D32] font-normal mb-4">
                Verified Connectivity
              </h3>

              <div className="space-y-4 text-xs font-sans">
                {verifiedDestinations.map((spot, idx) => (
                  <div key={idx} className="pb-3 border-b border-[#C9AE8C]/20 last:border-b-0">
                    <span className="font-medium text-[#343831] block">
                      {spot.name}
                    </span>
                    <span className="text-[#71866B] font-light mt-0.5 block">
                      {spot.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C9AE8C]/30">
              <a
                href={homestayConfig.contact.googleMapsDirectLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C9AE8C]" />
                <span>Get Route Directions</span>
              </a>
              <span className="text-[10px] text-center text-[#52574E]/70 block mt-2 font-sans">
                Calculates real-time driving or auto routes to Hesil Villa
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
