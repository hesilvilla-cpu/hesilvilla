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
    selectedContactId: 'primary', // 'primary' | 'secondary'
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

  // Date validation
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

  // Selected Host Contact
  const chosenContact = useMemo(() => {
    return (
      homestayConfig.contact.phoneList.find(
        (c) => c.id === formData.selectedContactId
      ) || homestayConfig.contact.phoneList[0]
    );
  }, [formData.selectedContactId]);

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
        message: `Your group of ${totalGuests} exceeds the standard capacity of ${std}. Please select extra bed(s) below (up to ${maxExtra} available at ₹${selectedAccommodation.extraBedCharge}/night).`,
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

    const { rate, extraBedRate, baseTotal, extraBedTotal, grandTotal } = priceCalculation;

    const formattedMessage = 
`*STAY ENQUIRY — HESIL VILLA, ALAPPUZHA*
----------------------------------------
*Guest Name:* ${formData.guestName.trim() || 'Guest'}
${formData.phone.trim() ? `*Contact Phone:* ${formData.phone.trim()}\n` : ''}*Selected Accommodation:* ${selectedAccommodation.name} (${selectedAccommodation.acType})
*Check-in Date:* ${formData.checkIn} (${formatDateDisplay(formData.checkIn)})
*Check-out Date:* ${formData.checkOut} (${formatDateDisplay(formData.checkOut)})
*Duration:* ${nights} ${nights === 1 ? 'Night' : 'Nights'}
*Guests:* ${adultsNum} Adult${adultsNum > 1 ? 's' : ''}${childrenNum > 0 ? `, ${childrenNum} Child${childrenNum > 1 ? 'ren' : ''}` : ''}
*Extra Beds Requested:* ${extraBedsNum}

*ESTIMATED PRICE BREAKDOWN:*
- ${selectedAccommodation.name}: ₹${rate.toLocaleString()} × ${nights} ${nights === 1 ? 'night' : 'nights'} = ₹${baseTotal.toLocaleString()}
${extraBedsNum > 0 ? `- Extra Beds: ₹${extraBedRate.toLocaleString()} × ${extraBedsNum} × ${nights} = ₹${extraBedTotal.toLocaleString()}\n` : ''}- *Estimated Accommodation Total:* ₹${grandTotal.toLocaleString()}
${formData.specialRequests.trim() ? `\n*Notes / Requests:* ${formData.specialRequests.trim()}\n` : ''}----------------------------------------
*Note:* Complimentary breakfast included. Availability and final booking confirmation are subject to confirmation by the host. Looking forward to your response!`;

    const encoded = encodeURIComponent(formattedMessage);
    window.open(`${chosenContact.whatsappUrl}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#C9AE8C]/60 rounded-3xl shadow-xl p-6 sm:p-8 z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header & Dismiss */}
        <div className="flex items-start justify-between pb-4 border-b border-[#C9AE8C]/30">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#71866B] block mb-1">
              Direct Host Communication
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#263D32] font-normal">
              Enquire on WhatsApp
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
        <form onSubmit={handleSubmitWhatsApp} className="py-5 space-y-4">
          
          {/* 1. Host WhatsApp Number Selector */}
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5">
              Send Enquiry To
            </label>
            <div className="grid grid-cols-2 gap-2">
              {homestayConfig.contact.phoneList.map((contact) => (
                <button
                  type="button"
                  key={contact.id}
                  onClick={() => setFormData({ ...formData, selectedContactId: contact.id })}
                  className={`p-2.5 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer ${
                    formData.selectedContactId === contact.id
                      ? 'border-[#263D32] bg-[#263D32] text-white shadow-xs'
                      : 'border-[#C9AE8C]/50 bg-[#F4F1E7] text-[#343831] hover:border-[#263D32]'
                  }`}
                >
                  <span className="block font-semibold text-[11px]">{contact.label}</span>
                  <span className="text-[10px] opacity-90">{contact.display}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Accommodation Selection */}
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5">
              Select Accommodation
            </label>
            <select
              value={formData.accommodationId}
              onChange={(e) => handleAccommodationChange(e.target.value)}
              className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
            >
              <optgroup label="Suites & Entire Villa">
                {homestayConfig.accommodations
                  .filter((a) => a.categoryGroup === 'suites')
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} — {acc.priceDisplay}/night ({acc.acType}, up to {acc.capacity.totalMax} guests)
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Cottages">
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

          {/* 3. Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Check-in Date</span>
              </label>
              <input
                type="date"
                required
                min={today}
                value={formData.checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Check-out Date</span>
              </label>
              <input
                type="date"
                required
                min={formData.checkIn ? addDaysToDate(formData.checkIn, 1) : addDaysToDate(today, 1)}
                value={formData.checkOut}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                className={`w-full bg-[#F4F1E7] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none transition-colors ${
                  isDateInvalid ? 'border-red-500 focus:border-red-600' : 'border-[#C9AE8C]/50 focus:border-[#263D32]'
                }`}
              />
            </div>
          </div>

          {/* Date Summary Banner */}
          {!isDateInvalid && nights > 0 ? (
            <div className="px-3.5 py-2 bg-[#F4F1E7] border border-[#C9AE8C]/40 rounded-xl flex items-center justify-between text-xs font-sans text-[#263D32]">
              <span>
                <strong>Stay Duration:</strong> {nights} {nights === 1 ? 'Night' : 'Nights'}
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

          {/* 4. Guests & Extra Beds Row */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Adults</span>
              </label>
              <select
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3 py-2 text-xs text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Children</span>
              </label>
              <select
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3 py-2 text-xs text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Extra Beds</span>
              </label>
              <select
                value={formData.extraBeds}
                onChange={(e) => setFormData({ ...formData, extraBeds: e.target.value })}
                disabled={selectedAccommodation.capacity.maxExtraBeds === 0}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3 py-2 text-xs text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
            <div className={`p-3 rounded-xl border text-xs font-sans flex items-start gap-2 ${
              capacityInfo.isOverMax
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-[#F4F1E7] border-[#C9AE8C]/40 text-[#52574E]'
            }`}>
              <Info className="w-4 h-4 text-[#71866B] mt-0.5 shrink-0" />
              <span>{capacityInfo.message}</span>
            </div>
          )}

          {/* 5. Transparent Price Calculation Breakdown */}
          {!isDateInvalid && nights > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#F4F1E7]/70 border border-[#C9AE8C]/50 space-y-1.5 text-xs font-sans text-[#343831]">
              <span className="text-[10px] uppercase tracking-wider text-[#71866B] font-semibold block mb-1">
                Estimated Price Breakdown
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
              <div className="pt-2 border-t border-[#C9AE8C]/30 flex justify-between font-semibold text-sm text-[#263D32]">
                <span>Estimated Total</span>
                <span>₹{priceCalculation.grandTotal.toLocaleString()}</span>
              </div>
              <span className="block text-[10px] text-[#52574E]/80 pt-1">
                * Rates are per night. Complimentary breakfast included. Contact host to confirm availability.
              </span>
            </div>
          )}

          {/* 6. Guest Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Your Name</span>
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Phone (Optional)</span>
              </label>
              <input
                type="tel"
                placeholder="+91..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors"
              />
            </div>
          </div>

          {/* 7. Optional Notes */}
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5">
              Notes or Questions (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Estimated arrival time, dietary questions, extra bed preferences..."
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2 text-xs text-[#343831] focus:outline-none focus:border-[#263D32] transition-colors resize-none"
            />
          </div>

          {/* Action */}
          <button
            type="submit"
            disabled={isDateInvalid || isGuestCountInvalid}
            className={`w-full py-3.5 rounded-full text-xs font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 mt-2 ${
              !isDateInvalid && !isGuestCountInvalid
                ? 'bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] cursor-pointer'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed opacity-80'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Send Enquiry to {chosenContact.label} ({chosenContact.display})</span>
          </button>

          <p className="text-center text-[11px] text-[#52574E]/80 font-sans font-light">
            * Opens WhatsApp directly with the host. Availability and final confirmation are confirmed by the host.
          </p>
        </form>

      </div>
    </div>
  );
}
