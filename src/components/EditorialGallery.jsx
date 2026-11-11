import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Dynamically calculate photo counts for each category
  const { counts, availableTabs } = useMemo(() => {
    const calculatedCounts = {};
    const galleryItems = homestayConfig.gallery;

    ALL_CATEGORY_DEFS.forEach((cat) => {
      if (cat.id === 'all') {
        calculatedCounts[cat.id] = galleryItems.length;
      } else if (cat.id === 'cottages') {
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

  // Check scroll position for mobile swipe indicators
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [filteredPhotos]);

  const handleScrollBy = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'next' ? cardWidth : -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#F4F1E7] text-[#343831] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-[#C9AE8C]/40 gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#71866B] font-semibold block mb-2">
              Visual Presentation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#263D32] font-normal leading-tight">
              Photo Gallery
            </h2>
          </div>

          <div className="flex items-center gap-4 justify-between sm:justify-end">
            {/* Mobile swipe controls */}
            <div className="flex sm:hidden items-center gap-1.5 bg-white/70 border border-[#C9AE8C]/40 rounded-full px-2 py-1">
              <button
                onClick={() => handleScrollBy('prev')}
                disabled={!canScrollLeft}
                aria-label="Previous photo in gallery"
                className="p-1 rounded-full text-[#263D32] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-sans text-[#71866B] px-1 font-medium">Swipe</span>
              <button
                onClick={() => handleScrollBy('next')}
                disabled={!canScrollRight}
                aria-label="Next photo in gallery"
                className="p-1 rounded-full text-[#263D32] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
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

        {/* Gallery Container: Uniform, Professional Equal-Sized Tiles */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 items-stretch"
        >
          {filteredPhotos.map((item, index) => {
            return (
              <article
                key={item.id}
                className="w-full group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#C9AE8C]/40 shadow-xs hover:shadow-lg transition-all duration-500 cursor-pointer aspect-[4/3] bg-[#263D32]"
                onClick={() => onOpenGalleryLightbox(filteredPhotos, index)}
              >
                {/* 100% container filling photograph */}
                <OptimizedImage
                  src={item.src}
                  fallbackSrc={item.fallbackSrc}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />

                {/* Subtle gradient overlay at the bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* Category Pill Tag top-left */}
                <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 z-10 pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-sans bg-black/60 backdrop-blur-xs text-[#F4F1E7] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium border border-white/15">
                    {item.category}
                  </span>
                </div>

                {/* Caption & Fullscreen Trigger on bottom */}
                <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 z-10 text-white flex items-end justify-between gap-2 pointer-events-none">
                  <div className="min-w-0 pr-1">
                    <h3 className="font-serif text-sm sm:text-lg font-normal leading-tight text-[#F4F1E7] truncate">
                      {item.alt}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-sans text-[#F4F1E7]/80 font-light mt-0.5 line-clamp-1 hidden sm:block">
                      {item.caption}
                    </p>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#263D32] transition-colors shrink-0">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              </article>
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
