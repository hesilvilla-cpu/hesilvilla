import React, { useMemo } from 'react';
import { Maximize2 } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { homestayConfig } from '../config/homestayConfig';

const ALL_CATEGORY_DEFS = [
  { id: 'all', label: 'All' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'garden', label: 'Garden' },
  { id: 'pond', label: 'Fish Pond' },
  { id: 'upper-suite', label: 'Upper Suite' },
  { id: 'lower-suite', label: 'Lower Suite' },
  { id: 'entire-villa', label: 'Entire Villa' },
  { id: 'cottages', label: 'Cottages' },
  { id: 'simple-cottage', label: 'Simple Cottage' },
  { id: 'solo-cottage', label: 'Solo Cottage' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'common-areas', label: 'Common Areas' },
];

export default function EditorialGallery({
  activeCategory = 'all',
  onSelectCategory,
  onOpenGalleryLightbox,
}) {
  // Dynamically calculate photo counts for each category
  const { counts, availableTabs } = useMemo(() => {
    const calculatedCounts = {};
    const galleryItems = homestayConfig.gallery;

    ALL_CATEGORY_DEFS.forEach((cat) => {
      if (cat.id === 'all') {
        calculatedCounts[cat.id] = galleryItems.length;
      } else if (cat.id === 'cottages') {
        // Matches any item associated with cottages, simple-cottage, or solo-cottage
        calculatedCounts[cat.id] = galleryItems.filter(
          (p) =>
            p.accommodation?.includes('cottages') ||
            p.accommodation?.includes('simple-cottage') ||
            p.accommodation?.includes('solo-cottage') ||
            p.categorySlug === 'simple-cottage' ||
            p.categorySlug === 'solo-cottage'
        ).length;
      } else if (['upper-suite', 'lower-suite', 'entire-villa', 'simple-cottage', 'solo-cottage'].includes(cat.id)) {
        calculatedCounts[cat.id] = galleryItems.filter(
          (p) => p.accommodation?.includes(cat.id) || p.categorySlug === cat.id
        ).length;
      } else {
        calculatedCounts[cat.id] = galleryItems.filter(
          (p) => p.categorySlug === cat.id
        ).length;
      }
    });

    // Hide categories that contain zero photographs
    const validTabs = ALL_CATEGORY_DEFS.filter(
      (cat) => (calculatedCounts[cat.id] || 0) > 0
    );

    return { counts: calculatedCounts, availableTabs: validTabs };
  }, []);

  // Filter photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') {
      return homestayConfig.gallery;
    }
    if (activeCategory === 'cottages') {
      return homestayConfig.gallery.filter(
        (p) =>
          p.accommodation?.includes('cottages') ||
          p.accommodation?.includes('simple-cottage') ||
          p.accommodation?.includes('solo-cottage') ||
          p.categorySlug === 'simple-cottage' ||
          p.categorySlug === 'solo-cottage'
      );
    }
    if (['upper-suite', 'lower-suite', 'entire-villa', 'simple-cottage', 'solo-cottage'].includes(activeCategory)) {
      return homestayConfig.gallery.filter(
        (photo) => photo.accommodation?.includes(activeCategory) || photo.categorySlug === activeCategory
      );
    }
    return homestayConfig.gallery.filter(
      (photo) => photo.categorySlug === activeCategory
    );
  }, [activeCategory]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#F4F1E7] text-[#343831]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[#C9AE8C]/40 gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
              Visual Presentation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight">
              Photo Gallery
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#52574E] font-light max-w-sm">
            An editorial look into Hesil Villa's living spaces, budget cottages, garden fish pond, and serene Kerala surroundings.
          </p>
        </div>

        {/* Gallery Filter Tabs with Dynamic Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {availableTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            const count = counts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#263D32] text-[#F4F1E7] shadow-xs'
                    : 'bg-[#FFFFFF] border border-[#C9AE8C]/50 text-[#52574E] hover:border-[#263D32] hover:text-[#263D32]'
                }`}
                aria-pressed={isActive}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-[#F4F1E7]/25 text-white' : 'bg-[#F4F1E7] text-[#71866B]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-start">
          {filteredPhotos.map((item, index) => {
            // Asymmetric layout with varied natural proportions
            let colSpan = 'lg:col-span-4';
            let heightClass = 'h-[320px] sm:h-[380px]';

            if (item.featured || (activeCategory === 'all' && index === 0)) {
              colSpan = 'lg:col-span-8 sm:col-span-2';
              heightClass = 'h-[380px] sm:h-[460px]';
            } else if (item.aspect === 'portrait') {
              colSpan = 'lg:col-span-4 sm:col-span-1';
              heightClass = 'h-[380px] sm:h-[440px]';
            } else if (index % 5 === 1) {
              colSpan = 'lg:col-span-4 sm:col-span-1';
              heightClass = 'h-[380px] sm:h-[440px]';
            } else {
              colSpan = 'lg:col-span-6 sm:col-span-1';
              heightClass = 'h-[340px] sm:h-[400px]';
            }

            return (
              <div
                key={item.id}
                className={`${colSpan} group relative rounded-2xl overflow-hidden border border-[#C9AE8C]/40 shadow-2xs hover:shadow-md transition-all duration-500 cursor-pointer bg-[#263D32] animate-in fade-in duration-300`}
                onClick={() => onOpenGalleryLightbox(filteredPhotos, index)}
              >
                <div className={`w-full ${heightClass} overflow-hidden`}>
                  <OptimizedImage
                    src={item.src}
                    fallbackSrc={item.fallbackSrc}
                    alt={item.alt}
                    className="w-full h-full group-hover:scale-102 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    showPlaceholderBadge={item.isPlaceholder}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-75 group-hover:opacity-90 transition-opacity pointer-events-none" />

                {/* Caption on bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-end justify-between gap-3 pointer-events-none">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-sans text-[#C9AE8C] block mb-0.5 font-medium">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-normal leading-snug text-[#F4F1E7]">
                      {item.alt}
                    </h3>
                    <p className="text-[11px] font-sans text-[#F4F1E7]/80 font-light mt-0.5 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#263D32] transition-colors shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to All Photos Shortcut when a specific category is active */}
        {activeCategory !== 'all' && (
          <div className="text-center mt-10">
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-sans uppercase tracking-[0.16em] text-[#263D32] hover:text-[#71866B] font-semibold underline underline-offset-4 cursor-pointer"
            >
              ← Back to All Photographs ({counts.all})
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
