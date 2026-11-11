import React, { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Users, User, Phone, MessageCircle, AlertCircle, Info, BedDouble } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

const getTodayString = () => new Date().toISOString().split('T')[0];

const addDaysToDate = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export default function BookingModal({ isOpen, onClose, initialData }) {
  const today = getTodayString();
  const defaultCheckIn = today;
  const defaultCheckOut = addDaysToDate(today, 1);

  // Derive initial accommodation if opened with room name
  const initialMatch = useMemo(() => {
    if (!initialData?.bhk) return null;
    return homestayConfig.accommodations.find(
      (acc) =>
        acc.name.toLowerCase() === initialData.bhk.toLowerCase() ||
        initialData.bhk.toLowerCase().includes(acc.name.toLowerCase())
    );
  }, [initialData]);

  const [formData, setFormData] = useState({
    checkIn: initialData?.checkIn || defaultCheckIn,
    checkOut: initialData?.checkOut || defaultCheckOut,
    adults: '2',
    children: '0',
    extraBeds: '0',
    accommodationId: initialMatch?.id || initialData?.accommodationId || 'upper-suite',
    guestName: '',
    phone: '',
    specialRequests: '',
  });

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const selectedAccommodation = useMemo(() => {
    return (
      homestayConfig.accommodations.find(
        (acc) => acc.id === formData.accommodationId
      ) || homestayConfig.accommodations[0]
    );
  }, [formData.accommodationId]);

  // Adjust extra beds if changing accommodation
  const handleAccommodationChange = (id) => {
    const acc = homestayConfig.accommodations.find((a) => a.id === id);
    const maxExtra = acc ? acc.capacity.maxExtraBeds : 0;
    const currentExtra = parseInt(formData.extraBeds, 10) || 0;
    setFormData((prev) => ({
      ...prev,
      accommodationId: id,
      extraBeds: currentExtra > maxExtra ? String(maxExtra) : prev.extraBeds,
    }));
  };

  // Date validation & correction
  const handleCheckInChange = (newCheckIn) => {
    let newCheckOut = formData.checkOut;
    if (!newCheckOut || newCheckOut <= newCheckIn) {
      newCheckOut = addDaysToDate(newCheckIn, 1);
    }
    setFormData((prev) => ({
      ...prev,
      checkIn: newCheckIn,
      checkOut: newCheckOut,
    }));
  };

  const handleCheckOutChange = (newCheckOut) => {
    setFormData((prev) => ({
      ...prev,
      checkOut: newCheckOut,
    }));
  };

  const isDateInvalid = Boolean(
    !formData.checkIn ||
    !formData.checkOut ||
    formData.checkOut <= formData.checkIn
  );

  const adultsNum = parseInt(formData.adults, 10) || 0;
  const childrenNum = parseInt(formData.children, 10) || 0;
  const extraBedsNum = parseInt(formData.extraBeds, 10) || 0;
  const totalGuests = adultsNum + childrenNum;
  const isGuestCountInvalid = adultsNum < 1;

  // Real-time nights calculation
  const nights = useMemo(() => {
    if (isDateInvalid) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [formData.checkIn, formData.checkOut, isDateInvalid]);

  // Transparent Price Calculation
  const priceCalculation = useMemo(() => {
    const rate = selectedAccommodation.pricePerNight || 0;
    const extraBedRate = selectedAccommodation.extraBedCharge || 0;
    const safeNights = nights > 0 ? nights : 1;

    const baseTotal = rate * safeNights;
    const extraBedTotal = extraBedsNum * extraBedRate * safeNights;
    const grandTotal = baseTotal + extraBedTotal;

    return {
      rate,
      extraBedRate,
      nights: safeNights,
      baseTotal,
      extraBedTotal,
      grandTotal,
    };
  }, [selectedAccommodation, nights, extraBedsNum]);

  // Formatted date string for clear user visibility
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Capacity Guidance
  const capacityInfo = useMemo(() => {
    const std = selectedAccommodation.capacity.standard;
    const max = selectedAccommodation.capacity.totalMax;
    const maxExtra = selectedAccommodation.capacity.maxExtraBeds;

    if (totalGuests > max) {
      return {
        isOverMax: true,
        message: `${selectedAccommodation.name} has a maximum limit of ${max} guests (${std} standard + ${maxExtra} extra beds). For larger groups, please select Entire Villa or contact the host.`,
      };
    }
    if (totalGuests > std && extraBedsNum === 0 && maxExtra > 0) {
      return {
        isOverMax: false,
        message: `Your party of ${totalGuests} exceeds the standard capacity of ${std}. Please select extra bed(s) below (up to ${maxExtra} available at ₹${selectedAccommodation.extraBedCharge}/night).`,
      };
    }
    return null;
  }, [selectedAccommodation, totalGuests, extraBedsNum]);

  if (!isOpen) return null;

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();

    if (isDateInvalid || isGuestCountInvalid) {
      return;
    }

    const { rate, extraBedRate, extraBedTotal, grandTotal } = priceCalculation;

    // Clean, professionally formatted WhatsApp enquiry message per brief specification
    const guestName = formData.guestName.trim() || 'Guest';
    const lines = [
      'Hello Hesil Villa! 🌿',
      '',
      "I'd like to enquire about a stay.",
      '',
      '*Guest Details*',
      `Name: ${guestName}`,
      `Adults: ${adultsNum}`,
      `Children: ${childrenNum}`,
      ...(formData.phone.trim() ? [`Phone: ${formData.phone.trim()}`] : []),
      '',
      '*Stay Details*',
      `Accommodation: ${selectedAccommodation.name} (${selectedAccommodation.acType})`,
      `Check-in: ${formatDateDisplay(formData.checkIn)}`,
      `Check-out: ${formatDateDisplay(formData.checkOut)}`,
      `Duration: ${nights} ${nights === 1 ? 'night' : 'nights'}`,
      `Extra beds: ${extraBedsNum}`,
      '',
      '*Price Estimate*',
      `Accommodation: ₹${rate.toLocaleString('en-IN')} × ${nights}`,
      ...(extraBedsNum > 0 ? [`Extra beds: ₹${extraBedTotal.toLocaleString('en-IN')} (${extraBedsNum} bed${extraBedsNum > 1 ? 's' : ''} × ₹${extraBedRate.toLocaleString('en-IN')} × ${nights}N)`] : []),
      `Estimated total: ₹${grandTotal.toLocaleString('en-IN')}`,
      ...(formData.specialRequests.trim() ? ['', `Notes: ${formData.specialRequests.trim()}`] : []),
      '',
      'Could you please confirm availability and help me with the booking?',
      '',
      'Thank you!',
    ];

    const formattedMessage = lines.join('\n');
    const encoded = encodeURIComponent(formattedMessage);
    // Open primary WhatsApp number for all main bookings
    const targetUrl = `${homestayConfig.contact.primaryWhatsappUrl}?text=${encoded}`;
    window.open(targetUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#C9AE8C]/60 rounded-3xl shadow-2xl p-5 sm:p-7 z-10 my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header & Dismiss */}
        <div className="flex items-start justify-between pb-3.5 border-b border-[#C9AE8C]/30">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#71866B] block mb-0.5">
              Direct Communication
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#263D32] font-normal">
              WhatsApp Stay Enquiry
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#52574E] hover:text-[#263D32] rounded-full hover:bg-[#F4F1E7] transition-colors cursor-pointer"
            aria-label="Close Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitWhatsApp} className="py-4 space-y-4">
          
          {/* Group 1: Accommodation Selection */}
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1">
              Select Accommodation
            </label>
            <select
              value={formData.accommodationId}
              onChange={(e) => handleAccommodationChange(e.target.value)}
              className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
            >
              <optgroup label="Suites & Entire Villa (AC)">
                {homestayConfig.accommodations
                  .filter((a) => a.categoryGroup === 'suites')
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} — {acc.priceDisplay}/night ({acc.acType}, up to {acc.capacity.totalMax} guests)
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Cottages (Non-AC)">
                {homestayConfig.accommodations
                  .filter((a) => a.categoryGroup === 'cottages')
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} — {acc.priceDisplay}/night ({acc.acType}, up to {acc.capacity.totalMax} guests)
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          {/* Group 2: Dates Row with Validation & Real-time Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Check-in</span>
              </label>
              <input
                type="date"
                required
                min={today}
                value={formData.checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Check-out</span>
              </label>
              <input
                type="date"
                required
                min={formData.checkIn ? addDaysToDate(formData.checkIn, 1) : addDaysToDate(today, 1)}
                value={formData.checkOut}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                className={`w-full bg-[#F4F1E7] border rounded-xl px-3 py-2 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none transition-colors ${
                  isDateInvalid ? 'border-red-500 focus:border-red-600' : 'border-[#C9AE8C]/50 focus:border-[#263D32]'
                }`}
              />
            </div>
          </div>

          {/* Stay Duration Badge */}
          {!isDateInvalid && nights > 0 ? (
            <div className="px-3 py-1.5 bg-[#F4F1E7] border border-[#C9AE8C]/40 rounded-lg flex items-center justify-between text-xs font-sans text-[#263D32]">
              <span>
                <strong>Duration:</strong> {nights} {nights === 1 ? 'Night' : 'Nights'}
              </span>
              <span className="text-[11px] text-[#52574E]">
                {formatDateDisplay(formData.checkIn)} → {formatDateDisplay(formData.checkOut)}
              </span>
            </div>
          ) : (
            <p className="text-[11px] text-red-600 font-sans flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Checkout date must be later than check-in date.</span>
            </p>
          )}

          {/* Group 3: Guests & Extra Beds Row */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Adults</span>
              </label>
              <select
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-2.5 py-2 text-xs text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Children</span>
              </label>
              <select
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-2.5 py-2 text-xs text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1 flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Extra Beds</span>
              </label>
              <select
                value={formData.extraBeds}
                onChange={(e) => setFormData({ ...formData, extraBeds: e.target.value })}
                disabled={selectedAccommodation.capacity.maxExtraBeds === 0}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-2.5 py-2 text-xs text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="0">0 Extra Beds</option>
                {Array.from({ length: selectedAccommodation.capacity.maxExtraBeds }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} Bed ({selectedAccommodation.extraBedChargeDisplay} ea)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Capacity Guidance Note */}
          {capacityInfo && (
            <div className={`p-2.5 rounded-xl border text-xs font-sans flex items-start gap-2 ${
              capacityInfo.isOverMax
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-[#F4F1E7] border-[#C9AE8C]/40 text-[#52574E]'
            }`}>
              <Info className="w-4 h-4 text-[#71866B] mt-0.5 shrink-0" />
              <span>{capacityInfo.message}</span>
            </div>
          )}

          {/* Group 4: Transparent Price Breakdown Summary */}
          {!isDateInvalid && nights > 0 && (
            <div className="p-3 rounded-2xl bg-[#F4F1E7]/80 border border-[#C9AE8C]/50 space-y-1.5 text-xs font-sans text-[#343831]">
              <span className="text-[10px] uppercase tracking-wider text-[#71866B] font-semibold block mb-0.5">
                Price Breakdown
              </span>
              <div className="flex justify-between">
                <span>{selectedAccommodation.name} ({selectedAccommodation.priceDisplay} × {nights} {nights === 1 ? 'night' : 'nights'})</span>
                <span className="font-medium">₹{priceCalculation.baseTotal.toLocaleString()}</span>
              </div>
              {extraBedsNum > 0 && (
                <div className="flex justify-between text-[#52574E]">
                  <span>Extra Bed(s) ({selectedAccommodation.extraBedChargeDisplay} × {extraBedsNum} × {nights}N)</span>
                  <span>₹{priceCalculation.extraBedTotal.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-1.5 border-t border-[#C9AE8C]/30 flex justify-between font-semibold text-sm text-[#263D32]">
                <span>Estimated Total</span>
                <span>₹{priceCalculation.grandTotal.toLocaleString()}</span>
              </div>
              <span className="block text-[10px] text-[#52574E]/80 pt-0.5">
                * Rates are per night. Complimentary breakfast included. Advance payment required to confirm reservation.
              </span>
            </div>
          )}

          {/* Group 5: Guest Name & Optional Message */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Your Name *</span>
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Your Phone (Optional)</span>
              </label>
              <input
                type="tel"
                placeholder="+91..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors"
              />
            </div>
          </div>

          <div>
            <textarea
              rows="2"
              placeholder="Notes or special requests (e.g. arrival time, dietary questions)..."
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3 py-2 text-xs text-[#343831] focus:outline-none focus:border-[#263D32] transition-colors resize-none"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isDateInvalid || isGuestCountInvalid}
            className={`w-full py-3.5 rounded-full text-xs font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 mt-2 ${
              !isDateInvalid && !isGuestCountInvalid
                ? 'bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] cursor-pointer shadow-md hover:shadow-lg'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed opacity-80'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <p className="text-center text-[11px] text-[#52574E]/80 font-sans font-light">
            * Availability is subject to host confirmation and advance payment is required to confirm a booking.
          </p>
        </form>

      </div>
    </div>
  );
}
