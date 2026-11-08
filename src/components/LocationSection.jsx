import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

export default function LocationSection() {
  const { nearbyAttractions, contact } = homestayConfig;

  return (
    <section id="location" className="py-20 md:py-28 bg-[#F4F1E7] text-[#343831]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
            Surroundings & Access
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight">
            Location & Connectivity
          </h2>
          <p className="font-sans text-sm text-[#52574E] font-light mt-3 leading-relaxed">
            Situated in a quiet, slightly interior residential neighborhood near Kanichukulangara, Alappuzha. Set back from noisy commercial thoroughfares, the villa provides a peaceful green haven while remaining within easy reach of coastal beaches and local landmarks.
          </p>
        </div>

        {/* Map and Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Google Map (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-[#C9AE8C]/50 shadow-xs h-[360px] sm:h-[440px] bg-[#FFFFFF]">
              <iframe
                title="Hesil Villa Location Map"
                src={contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            
            <div className="mt-3 flex items-center justify-between text-xs font-sans text-[#52574E] px-1">
              <span className="flex items-center gap-1.5 text-[#263D32]">
                <MapPin className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Kanichukulangara, Mararikulam North, Alappuzha</span>
              </span>
              <a
                href={contact.googleMapsDirectLink}
                target="_blank"
                rel="noreferrer"
                className="text-[#263D32] hover:text-[#71866B] font-semibold underline underline-offset-4 flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Connectivity List (5 Cols) — Place name on LEFT, Distance on RIGHT */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#C9AE8C]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#C9AE8C]/30">
                <h3 className="font-serif text-2xl text-[#263D32] font-normal">
                  Nearby Attractions
                </h3>
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#71866B] font-medium">
                  Approx. Distance
                </span>
              </div>

              {/* Exact requirement: Place name on LEFT and distance on RIGHT */}
              <div className="space-y-4">
                {nearbyAttractions.map((spot) => (
                  <div
                    key={spot.id}
                    className="pb-3 border-b border-[#C9AE8C]/20 last:border-b-0 flex items-baseline justify-between gap-4"
                  >
                    <div className="text-left">
                      <span className="font-medium text-xs sm:text-sm text-[#343831] block">
                        {spot.name}
                      </span>
                      <span className="text-[11px] text-[#52574E]/75 font-light block mt-0.5">
                        {spot.note}
                      </span>
                    </div>
                    
                    <span className="text-xs sm:text-sm font-semibold text-[#263D32] whitespace-nowrap text-right shrink-0">
                      {spot.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Google Maps Directions Button */}
            <div className="pt-6 mt-6 border-t border-[#C9AE8C]/30">
              <a
                href={contact.googleMapsDirectLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] text-xs font-sans uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#C9AE8C]" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
