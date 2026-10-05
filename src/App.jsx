import React, { useState } from 'react';
import {
  Waves,
  MapPin,
  Phone,
  Mail,
  Wifi,
  Wind,
  Coffee,
  Car,
  ShieldCheck,
  Tv,
  Calendar,
  User,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Home,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedBHK, setSelectedBHK] = useState('All');
  const [galleryFilter, setGalleryFilter] = useState('all');

  // Contact details - customize these values easily
  const phone = '+91 98765 43210';
  const whatsappNumber = '919876543210';
  const email = 'info@hesilvilla.com';
  const address = 'Beach Road, Near Alappuzha Lighthouse, Alappuzha, Kerala - 688007';

  // Booking Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    bhk: 'Upper BHK',
    message: ''
  });

  const handleWhatsAppInquiry = (customMsg) => {
    const text = customMsg || `Hi Hesil Villa team! I would like to inquire about booking stay for ${formData.guests} guest(s) (${formData.bhk}). Check-in: ${formData.checkIn || 'TBD'}, Check-out: ${formData.checkOut || 'TBD'}.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const roomDetails = [
    {
      id: 'upper-bhk',
      type: 'Upper BHK',
      tag: 'Sea Breeze & Balcony View',
      capacity: '2 - 4 Guests',
      bed: '1 King Size Bed + Extra Mattress Option',
      features: [
        'Private Balcony with Coastal View',
        'Air-Conditioned Bedroom',
        'Ensuite Luxury Bathroom',
        'High-Speed Wi-Fi',
        'Private Terrace Seating'
      ],
      description: 'Perched on the upper level, offering fresh ocean breeze, scenic sunsets, and complete privacy for couples or small families.',
      price: 'Contact for Daily Rate'
    },
    {
      id: 'lower-bhk',
      type: 'Lower BHK',
      tag: 'Garden Access & Spacious Living',
      capacity: '2 - 4 Guests',
      bed: '1 King Size Bed + Living Room Seating',
      features: [
        'Direct Garden & Patio Access',
        'Spacious Air-Conditioned Bedroom',
        'Fully Equipped Kitchenette / Dining Area',
        'Ensuite Bathroom',
        'Easy Ground Level Accessibility'
      ],
      description: 'Ideal for families seeking effortless ground-floor access, direct garden surroundings, and full kitchenette amenities.',
      price: 'Contact for Daily Rate'
    },
    {
      id: 'full-villa',
      type: 'Full Villa Exclusive (Both BHKs)',
      tag: 'Complete Privacy for Groups',
      capacity: 'Up to 8 Guests',
      bed: '2 Bedrooms + Living Areas across 2 Floors',
      features: [
        'Exclusive Access to Upper & Lower BHKs',
        'Private Kitchen & Dining',
        'Full Garden & Balcony Access',
        'Dedicated Caretaker Support',
        'Private Vehicle Parking'
      ],
      description: 'Book the entire Hesil Villa premises for complete privacy, maximum space, and a serene home-away-from-home stay experience.',
      price: 'Contact for Special Group Rate'
    }
  ];

  const amenities = [
    { icon: <Waves className="w-6 h-6 text-cyan-600" />, title: 'Beachside Location', desc: 'Steps away from Alappuzha coastal beach' },
    { icon: <Wind className="w-6 h-6 text-cyan-600" />, title: 'Air Conditioning', desc: 'Climate control in bedrooms for hot days' },
    { icon: <Wifi className="w-6 h-6 text-cyan-600" />, title: 'High-Speed Wi-Fi', desc: 'Reliable fiber internet for work and leisure' },
    { icon: <Coffee className="w-6 h-6 text-cyan-600" />, title: 'Kitchenette Access', desc: 'Cook meals, tea & snacks at your convenience' },
    { icon: <Car className="w-6 h-6 text-cyan-600" />, title: 'Free Private Parking', desc: 'Secure space for cars and bikes on premises' },
    { icon: <ShieldCheck className="w-6 h-6 text-cyan-600" />, title: 'Power Backup & Caretaker', desc: 'Uninterrupted power & on-site assistance' }
  ];

  const galleryItems = [
    { title: 'Villa Exterior & Coastal Lawn', category: 'exterior', bg: 'bg-gradient-to-r from-sky-400 to-indigo-500' },
    { title: 'Upper BHK Bedroom Suite', category: 'upper', bg: 'bg-gradient-to-r from-teal-400 to-cyan-600' },
    { title: 'Upper BHK Balcony Sunset View', category: 'upper', bg: 'bg-gradient-to-r from-amber-400 to-orange-500' },
    { title: 'Lower BHK Living & Dining', category: 'lower', bg: 'bg-gradient-to-r from-emerald-400 to-teal-600' },
    { title: 'Lower BHK Kitchenette', category: 'lower', bg: 'bg-gradient-to-r from-blue-400 to-indigo-600' },
    { title: 'Alappuzha Beach Nearby', category: 'exterior', bg: 'bg-gradient-to-r from-cyan-500 to-blue-600' }
  ];

  const filteredGallery = galleryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  const nearbyAttractions = [
    { place: 'Alappuzha Beach & Pier', distance: '300 Meters (Walking distance)', desc: 'Iconic beach, historic sea pier, and serene evening sunsets.' },
    { place: 'Alappuzha Lighthouse', distance: '500 Meters', desc: 'Panoramas of the Arabian Sea and Alleppey coast.' },
    { place: 'Punnamada Lake & Houseboat Jetty', distance: '4.5 km', desc: 'Hub for famous Kerala backwater cruises and boat races.' },
    { place: 'Marari Beach', distance: '12 km', desc: 'Tranquil, white-sand coconut grove beach ideal for relaxed day trips.' },
    { place: 'Alappuzha Railway Station', distance: '2.5 km', desc: 'Quick connectivity to major Southern Railway routes.' },
    { place: 'Cochin International Airport (COK)', distance: '82 km', desc: 'Direct taxi access via NH 66.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Bar / Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-4 container mx-auto justify-between">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <MapPin className="w-3.5 h-3.5" /> Alappuzha Beachside, Kerala
          </span>
          <div className="flex items-center gap-6">
            <a href={`tel:${phone}`} className="hover:text-white flex items-center gap-1">
              <Phone className="w-3 h-3 text-cyan-400" /> {phone}
            </a>
            <button 
              onClick={() => handleWhatsAppInquiry('Hi Hesil Villa! I would like to inquire about booking availability.')}
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Quick WhatsApp Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              H
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">HESIL VILLA</span>
              <span className="text-[10px] text-cyan-600 font-semibold tracking-wider uppercase">Alappuzha Beachfront Stay</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#about" className="hover:text-cyan-600 transition">About</a>
            <a href="#accommodations" className="hover:text-cyan-600 transition">Upper & Lower BHKs</a>
            <a href="#amenities" className="hover:text-cyan-600 transition">Amenities</a>
            <a href="#gallery" className="hover:text-cyan-600 transition">Gallery</a>
            <a href="#attractions" className="hover:text-cyan-600 transition">Location</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setInquiryModalOpen(true)} 
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Book Stay
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-slate-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 flex flex-col gap-3 font-medium text-slate-700">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#accommodations" onClick={() => setMobileMenuOpen(false)}>Upper & Lower BHKs</a>
            <a href="#amenities" onClick={() => setMobileMenuOpen(false)}>Amenities</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
            <a href="#attractions" onClick={() => setMobileMenuOpen(false)}>Location</a>
            <button 
              onClick={() => { setMobileMenuOpen(false); setInquiryModalOpen(true); }}
              className="bg-cyan-600 text-white font-semibold py-2.5 rounded-lg mt-2 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Stay
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Premium Beachside Stay in Alappuzha
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Relax & Unwind at <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Hesil Villa Beach Stay
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Enjoy independent Upper & Lower 1BHK villa floors with sea breezes, private living spaces, and beachside access in the heart of Alleppey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setInquiryModalOpen(true)}
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <Calendar className="w-5 h-5" /> Reserve / Inquire Now
            </button>
            <button 
              onClick={() => handleWhatsAppInquiry('Hi! I want to check rates and availability for Hesil Villa.')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-7 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <MessageCircle className="w-5 h-5" /> Direct WhatsApp Chat
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-left max-w-4xl mx-auto border-t border-slate-800 pt-8">
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <span className="text-xs text-cyan-400 uppercase font-bold tracking-wider">Location</span>
              <p className="font-semibold text-white mt-1">Alappuzha Beach</p>
              <p className="text-xs text-slate-400">Walk to seashore</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <span className="text-xs text-cyan-400 uppercase font-bold tracking-wider">Layout</span>
              <p className="font-semibold text-white mt-1">Upper & Lower BHKs</p>
              <p className="text-xs text-slate-400">Individual or Combined</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <span className="text-xs text-cyan-400 uppercase font-bold tracking-wider">Capacity</span>
              <p className="font-semibold text-white mt-1">2 to 8 Guests</p>
              <p className="text-xs text-slate-400">Couples, Families, Groups</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <span className="text-xs text-cyan-400 uppercase font-bold tracking-wider">Booking</span>
              <p className="font-semibold text-white mt-1">Direct & OTA Links</p>
              <p className="text-xs text-slate-400">Zero commission options</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cyan-600 font-bold text-xs uppercase tracking-wider">Welcome to Alappuzha</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-6">
                Your Coastal Sanctuary Near Alleppey Sea Pier
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Hesil Villa is a modern, independent beachside villa property located just moments away from the pristine shores of Alappuzha Beach. Designed with dual independent living spaces—the <strong>Upper BHK</strong> and <strong>Lower BHK</strong>—our villa caters to couples, family staycations, and small traveling groups.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Whether you wish to lounge on the breezy upper terrace listening to ocean waves or relax in the ground-floor living area with garden access, Hesil Villa provides the perfect balance of home comfort, hospitality, and privacy.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">Walking distance to Alappuzha Beach & historic Lighthouse</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">Rent individual BHKs for intimate stays or full villa for group getaways</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">Modern amenities including AC, Wi-Fi, power backup & kitchenette</span>
                </div>
              </div>
            </div>

            {/* Visual Feature Card */}
            <div className="relative">
              <div className="bg-gradient-to-tr from-cyan-600 to-sky-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
                <Home className="w-12 h-12 text-cyan-200 mb-6" />
                <h3 className="text-2xl font-bold mb-3">Versatile 1BHK Options</h3>
                <p className="text-cyan-100 text-sm mb-6 leading-relaxed">
                  Choose between the ocean-breeze elevated Upper BHK or the spacious garden-side Lower BHK based on your preference.
                </p>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <span>Upper BHK</span>
                    <span className="text-cyan-200">Terrace & Sea Breeze</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold pt-2 border-t border-white/10">
                    <span>Lower BHK</span>
                    <span className="text-cyan-200">Patio & Kitchenette</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations / BHK Breakdown Section */}
      <section id="accommodations" className="py-16 md:py-24 bg-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cyan-600 font-bold text-xs uppercase tracking-wider">Stay Options</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              Explore Our Villa BHK Options
            </h2>
            <p className="text-slate-600 mt-3 text-sm md:text-base">
              Each BHK is fully self-contained with independent air conditioning, ensuite bathroom, and privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roomDetails.map((room) => (
              <div 
                key={room.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition"
              >
                <div className="bg-gradient-to-r from-slate-900 to-cyan-950 text-white p-6 relative">
                  <span className="bg-cyan-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 inline-block">
                    {room.tag}
                  </span>
                  <h3 className="text-xl font-extrabold">{room.type}</h3>
                  <p className="text-slate-300 text-xs mt-1">{room.capacity} • {room.bed}</p>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-600 text-xs leading-relaxed mb-6">
                      {room.description}
                    </p>

                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Key Highlights:</h4>
                    <ul className="space-y-2 mb-6">
                      {room.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <div className="text-xs text-slate-500 mb-3 font-medium">
                      {room.price}
                    </div>
                    <button
                      onClick={() => {
                        setFormData({ ...formData, bhk: room.type });
                        setInquiryModalOpen(true);
                      }}
                      className="w-full bg-slate-900 hover:bg-cyan-600 text-white font-semibold text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Inquire for {room.type} <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cyan-600 font-bold text-xs uppercase tracking-wider">Guest Comforts</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              Everything You Need for a Relaxing Stay
            </h2>
            <p className="text-slate-600 mt-3 text-sm md:text-base">
              Thoughtfully curated facilities to make your stay comfortable, clean, and memorable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-cyan-200 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Placeholder Grid */}
      <section id="gallery" className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Photo Gallery</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              Take a Peek Inside Hesil Villa
            </h2>
            <p className="text-slate-400 mt-3 text-sm">
              Filter photos of our Upper BHK, Lower BHK, and surrounding beach grounds.
            </p>

            {/* Filter buttons */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'upper', label: 'Upper BHK' },
                { id: 'lower', label: 'Lower BHK' },
                { id: 'exterior', label: 'Exterior & Beach' }
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => setGalleryFilter(btn.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition cursor-pointer ${
                    galleryFilter === btn.id 
                      ? 'bg-cyan-500 text-slate-950 font-bold' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div 
                key={idx}
                className={`h-56 rounded-xl p-6 ${item.bg} flex flex-col justify-end shadow-lg relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-black/40 text-cyan-200 px-2.5 py-1 rounded-md inline-block mb-1 backdrop-blur-xs">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-white text-base">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            💡 <em>Note: Replace placeholder cards above with your actual high-resolution photos in <code>/public/images</code> directory.</em>
          </p>
        </div>
      </section>

      {/* Location & Nearby Attractions */}
      <section id="attractions" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-cyan-600 font-bold text-xs uppercase tracking-wider">Prime Location</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-6">
                Nearby Spots & Distance Guide
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Situated in Alappuzha's coastal neighborhood, Hesil Villa places you within easy reach of Alleppey's top beaches, lighthouse, and backwater boat jetties.
              </p>

              <div className="space-y-4">
                {nearbyAttractions.map((spot, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 shrink-0 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{spot.place}</h3>
                        <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-100">
                          {spot.distance}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs mt-1">{spot.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map & Booking Channel Section */}
            <div className="space-y-6">
              {/* Map Placeholder Box */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-md">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" /> Property Address & Map
                </div>
                <p className="text-sm font-semibold text-white mb-4">{address}</p>
                
                {/* Embed Map Placeholder Container */}
                <div className="w-full h-56 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center justify-center p-4 text-center">
                  <MapPin className="w-10 h-10 text-cyan-400 mb-2 animate-bounce" />
                  <p className="text-xs text-slate-300 font-medium">Interactive Google Maps Embed</p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                    (Paste your Google Maps location iframe link here in <code>App.jsx</code>)
                  </p>
                </div>
              </div>

              {/* OTA & Direct Booking Channels */}
              <div className="bg-gradient-to-r from-slate-100 to-cyan-50 rounded-2xl p-6 border border-cyan-100 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-2">Book via Partner OTA Websites</h3>
                <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                  Already have listings on Airbnb, Booking.com, or MakeMyTrip? Guests can also book directly through these platforms:
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs py-3 px-2 rounded-xl text-center border border-slate-200 shadow-xs transition flex flex-col items-center gap-1 group"
                  >
                    <span className="text-rose-600 font-extrabold text-sm group-hover:scale-105 transition">Airbnb</span>
                    <span className="text-[10px] text-slate-500 font-normal flex items-center gap-0.5">View Listing <ExternalLink className="w-2.5 h-2.5" /></span>
                  </a>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs py-3 px-2 rounded-xl text-center border border-slate-200 shadow-xs transition flex flex-col items-center gap-1 group"
                  >
                    <span className="text-blue-600 font-extrabold text-sm group-hover:scale-105 transition">Booking.com</span>
                    <span className="text-[10px] text-slate-500 font-normal flex items-center gap-0.5">View Listing <ExternalLink className="w-2.5 h-2.5" /></span>
                  </a>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs py-3 px-2 rounded-xl text-center border border-slate-200 shadow-xs transition flex flex-col items-center gap-1 group"
                  >
                    <span className="text-red-600 font-extrabold text-sm group-hover:scale-105 transition">MakeMyTrip</span>
                    <span className="text-[10px] text-slate-500 font-normal flex items-center gap-0.5">View Listing <ExternalLink className="w-2.5 h-2.5" /></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Booking Inquiry Section */}
      <section className="py-16 bg-gradient-to-br from-cyan-600 to-blue-700 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Plan Your Alappuzha Beach Getaway Today
          </h2>
          <p className="text-cyan-100 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Get instant availability details for Upper BHK, Lower BHK, or the Entire Villa via direct WhatsApp or phone call.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleWhatsAppInquiry('Hi! I would like to check availability and special tariffs for Hesil Villa.')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </button>
            <button 
              onClick={() => setInquiryModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <Calendar className="w-5 h-5" /> Submit Booking Request
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold text-base">
                  H
                </div>
                <span className="text-white font-bold text-base tracking-tight">HESIL VILLA</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Beachside stay offering 1BHK Upper & Lower accommodations in Alappuzha, Kerala.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-cyan-400 transition">About Villa</a></li>
                <li><a href="#accommodations" className="hover:text-cyan-400 transition">Upper & Lower BHKs</a></li>
                <li><a href="#amenities" className="hover:text-cyan-400 transition">Amenities</a></li>
                <li><a href="#gallery" className="hover:text-cyan-400 transition">Photo Gallery</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Contact Information</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-cyan-400" /> {phone}</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-cyan-400" /> {email}</li>
                <li className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-400 mt-0.5" /> Alappuzha Beach Road, Kerala</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Direct Inquiry</h4>
              <p className="text-slate-400 text-xs mb-3">Instant booking assistance directly via WhatsApp.</p>
              <button 
                onClick={() => handleWhatsAppInquiry()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Message Owner
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Hesil Villa, Alappuzha. All rights reserved.</p>
            <p className="text-slate-400">Designed for Scalable Coastal Hospitality</p>
          </div>
        </div>
      </footer>

      {/* Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-cyan-600 font-bold text-[10px] uppercase tracking-wider">Hesil Villa Booking</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Inquire for Booking</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your details below and we will automatically open a WhatsApp inquiry for instant response.
              </p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleWhatsAppInquiry();
                setInquiryModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma" 
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Select Stay BHK</label>
                <select 
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
                  value={formData.bhk}
                  onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                >
                  <option value="Upper BHK">Upper BHK (Balcony & Sea Breeze)</option>
                  <option value="Lower BHK">Lower BHK (Garden & Kitchenette)</option>
                  <option value="Full Villa Exclusive">Full Villa (Both Upper & Lower BHKs)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Check-in Date</label>
                  <input 
                    type="date" 
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Check-out Date</label>
                  <input 
                    type="date" 
                    className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Number of Guests</label>
                <select 
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                >
                  <option value="1-2">1 - 2 Guests</option>
                  <option value="3-4">3 - 4 Guests</option>
                  <option value="5-6">5 - 6 Guests</option>
                  <option value="7-8+">7 - 8+ Guests (Full Villa)</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm mt-4"
              >
                <MessageCircle className="w-4 h-4" /> Send Inquiry via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
