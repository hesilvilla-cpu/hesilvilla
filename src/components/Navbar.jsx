import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'The Villa', href: '#villa' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F4F1E7]/95 backdrop-blur-md shadow-2xs py-4 border-b border-[#C9AE8C]/40'
            : 'bg-gradient-to-b from-black/50 via-black/15 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo on the Left */}
          <a href="#home" className="focus:outline-none">
            <Logo variant={isScrolled ? 'dark' : 'light'} />
          </a>

          {/* Desktop Navigation (Only 4 essential links) */}
          <nav className="hidden md:flex items-center gap-9 font-sans text-xs tracking-[0.2em] uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] hover:after:w-full after:transition-all after:duration-300 ${
                  isScrolled
                    ? 'text-[#343831] hover:text-[#263D32] after:bg-[#263D32]'
                    : 'text-[#F4F1E7]/90 hover:text-white after:bg-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Single Elegant Action Button on the Right */}
          <div className="hidden md:block">
            <button
              onClick={onOpenBooking}
              className={`text-xs px-6 py-2.5 rounded-full font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-300 cursor-pointer shadow-xs ${
                isScrolled
                  ? 'bg-[#263D32] text-[#F4F1E7] hover:bg-[#1A2B23]'
                  : 'bg-[#F4F1E7] text-[#263D32] hover:bg-white hover:shadow-md'
              }`}
            >
              Enquire
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              isScrolled ? 'text-[#263D32]' : 'text-white'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Clean Fullscreen / Dropdown Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#F4F1E7] text-[#343831] flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200">
          {/* Header row in mobile drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-[#C9AE8C]/40">
            <Logo variant="dark" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#343831] hover:text-[#263D32] rounded-full hover:bg-[#C9AE8C]/20 transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-6 py-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[#343831] hover:text-[#263D32] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs font-sans text-[#71866B] tracking-widest">
                  →
                </span>
              </a>
            ))}
          </nav>

          {/* Single mobile enquiry action */}
          <div className="pt-6 border-t border-[#C9AE8C]/40">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#263D32] text-[#F4F1E7] py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#1A2B23] transition-colors cursor-pointer shadow-md"
            >
              <span>Enquire / Book Stay</span>
              <ArrowUpRight className="w-4 h-4 text-[#C9AE8C]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
