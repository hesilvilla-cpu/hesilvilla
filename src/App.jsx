import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EditorialAbout from './components/EditorialAbout';
import Accommodations from './components/Accommodations';
import EditorialGallery from './components/EditorialGallery';
import GardenExperience from './components/GardenExperience';
import AmenitiesSection from './components/AmenitiesSection';
import LocationSection from './components/LocationSection';
import FaqSection from './components/FaqSection';
import FinalBookingCTA from './components/FinalBookingCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);

  // Gallery active category state (supports synchronization with Accommodation "View photographs")
  const [activeGalleryCategory, setActiveGalleryCategory] = useState('all');

  // Lightbox State supporting gallery sequence navigation
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    currentImage: null,
  });

  const handleOpenBooking = () => {
    setBookingInitialData(null);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithRoom = (roomName) => {
    setBookingInitialData({ bhk: roomName });
    setIsBookingModalOpen(true);
  };

  const handleOpenSingleLightbox = (imageSrc, title, caption) => {
    setLightboxState({
      isOpen: true,
      images: [{ src: imageSrc, title, caption }],
      currentIndex: 0,
      currentImage: { src: imageSrc, title, caption },
    });
  };

  const handleOpenGalleryLightbox = (items, index) => {
    setLightboxState({
      isOpen: true,
      images: items,
      currentIndex: index,
      currentImage: items[index],
    });
  };

  const handleNextPhoto = () => {
    setLightboxState((prev) => {
      if (prev.images.length <= 1) return prev;
      const nextIndex = (prev.currentIndex + 1) % prev.images.length;
      return {
        ...prev,
        currentIndex: nextIndex,
        currentImage: prev.images[nextIndex],
      };
    });
  };

  const handlePrevPhoto = () => {
    setLightboxState((prev) => {
      if (prev.images.length <= 1) return prev;
      const prevIndex = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
      return {
        ...prev,
        currentIndex: prevIndex,
        currentImage: prev.images[prevIndex],
      };
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  // Accommodation "View photographs" interaction
  const handleViewAccommodationPhotographs = (galleryTag) => {
    setActiveGalleryCategory(galleryTag);
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1E7] text-[#343831] font-sans selection:bg-[#263D32] selection:text-[#F4F1E7]">
      {/* 1. Header Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 2. Hero Section */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 3. Short Introduction / Property Story */}
      <EditorialAbout />

      {/* 4. Accommodation Selector */}
      <Accommodations
        onOpenBookingWithRoom={handleOpenBookingWithRoom}
        onOpenLightbox={handleOpenSingleLightbox}
        onViewPhotographs={handleViewAccommodationPhotographs}
      />

      {/* 5. Mosaic Photo Gallery */}
      <EditorialGallery
        activeCategory={activeGalleryCategory}
        onSelectCategory={setActiveGalleryCategory}
        onOpenGalleryLightbox={handleOpenGalleryLightbox}
      />

      {/* 6. Garden and Stay Experience */}
      <GardenExperience />

      {/* 7. Essential Amenities */}
      <AmenitiesSection />

      {/* 8. Location & Connectivity */}
      <LocationSection />

      {/* 9. Frequently Asked Questions */}
      <FaqSection />

      {/* 10. Enquiry Section */}
      <FinalBookingCTA onOpenBooking={handleOpenBooking} />

      {/* 11. Footer */}
      <Footer />

      {/* Direct WhatsApp Enquiry Modal */}
      <BookingModal
        key={isBookingModalOpen ? (bookingInitialData ? JSON.stringify(bookingInitialData) : 'open') : 'closed'}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialData={bookingInitialData}
      />

      {/* Fullscreen Gallery Lightbox */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        imageSrc={lightboxState.currentImage?.src}
        title={lightboxState.currentImage?.title}
        caption={lightboxState.currentImage?.caption}
        hasNavigation={lightboxState.images.length > 1}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        currentIndex={lightboxState.currentIndex}
        totalCount={lightboxState.images.length}
      />
    </div>
  );
}
