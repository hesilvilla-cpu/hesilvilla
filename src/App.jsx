import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EditorialAbout from './components/EditorialAbout';
import Accommodations from './components/Accommodations';
import EditorialGallery from './components/EditorialGallery';
import AmenitiesSection from './components/AmenitiesSection';
import FaqSection from './components/FaqSection';
import LocationSection from './components/LocationSection';
import FinalBookingCTA from './components/FinalBookingCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);

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

  return (
    <div className="min-h-screen bg-[#F4F1E7] text-[#343831] font-sans selection:bg-[#263D32] selection:text-[#F4F1E7]">
      {/* 1. Header Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 2. Hero */}
      <HeroSection onOpenBooking={handleOpenBooking} />

      {/* 3. Short Introduction */}
      <EditorialAbout />

      {/* 4. The Villa (Upper BHK, Lower BHK, Entire Villa) */}
      <Accommodations
        onOpenBookingWithRoom={handleOpenBookingWithRoom}
        onOpenLightbox={handleOpenSingleLightbox}
      />

      {/* 5. Gallery */}
      <EditorialGallery onOpenGalleryLightbox={handleOpenGalleryLightbox} />

      {/* 6. Essential Amenities */}
      <AmenitiesSection />

      {/* 7. Frequently Asked Questions */}
      <FaqSection />

      {/* 8. Location */}
      <LocationSection />

      {/* 9. Booking / Enquiry */}
      <FinalBookingCTA onOpenBooking={handleOpenBooking} />

      {/* 10. Footer */}
      <Footer />

      {/* Direct WhatsApp Enquiry Modal */}
      <BookingModal
        key={isBookingModalOpen ? (bookingInitialData ? JSON.stringify(bookingInitialData) : 'open') : 'closed'}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialData={bookingInitialData}
      />

      {/* Minimal Fullscreen Gallery Lightbox */}
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
