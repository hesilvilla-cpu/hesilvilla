import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, User, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { homestayConfig } from '../config/homestayConfig';

const getTodayString = () => new Date().toISOString().split('T')[0];
const getTomorrowString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export default function BookingModal({ isOpen, onClose, initialData }) {
  const today = getTodayString();
  const tomorrow = getTomorrowString();
  const hasWhatsApp = Boolean(homestayConfig.contact.whatsappNumber);

  const [formData, setFormData] = useState({
    checkIn: initialData?.checkIn || today,
    checkOut: initialData?.checkOut || tomorrow,
    adults: '2',
    children: '0',
    bhk: initialData?.bhk || 'The Upper BHK',
    guestName: '',
    phone: '',
    specialRequests: '',
  });

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

  if (!isOpen) return null;

  // Validation logic
  const isDateInvalid = formData.checkIn && formData.checkOut && formData.checkOut <= formData.checkIn;
  const adultsNum = parseInt(formData.adults, 10) || 0;
  const childrenNum = parseInt(formData.children, 10) || 0;
  const totalGuests = adultsNum + childrenNum;
  const isGuestCountInvalid = adultsNum < 1;

  // Capacity guidance
  const isCapacityWarning = (formData.bhk.includes('Upper') || formData.bhk.includes('Lower')) && totalGuests > 3;

  // Nights calculation
  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut || isDateInvalid) return 1;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  const selectedRoom = homestayConfig.accommodations.find(
    (acc) => acc.name.toLowerCase() === formData.bhk.toLowerCase() || formData.bhk.includes(acc.name)
  ) || homestayConfig.accommodations[0];

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();

    if (isDateInvalid || isGuestCountInvalid) {
      return;
    }

    if (!hasWhatsApp) {
      return;
    }

    const formattedMessage = 
`*STAY ENQUIRY — HESIL VILLA, ALAPPUZHA*
----------------------------------------
*Guest Name:* ${formData.guestName.trim() || 'Guest'}
*Contact Phone:* ${formData.phone.trim() || 'Shared via WhatsApp'}
*Selected Accommodation:* ${formData.bhk}
*Check-in Date:* ${formData.checkIn}
*Check-out Date:* ${formData.checkOut} (${nights} ${nights === 1 ? 'Night' : 'Nights'})
*Guests:* ${adultsNum} Adult${adultsNum > 1 ? 's' : ''}${childrenNum > 0 ? `, ${childrenNum} Child${childrenNum > 1 ? 'ren' : ''}` : ''}
${formData.specialRequests ? `*Notes / Special Requests:* ${formData.specialRequests}\n` : ''}----------------------------------------
*Note:* This is an availability enquiry. Please confirm current rates and availability. Thank you!`;

    const encoded = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/${homestayConfig.contact.whatsappNumber}?text=${encoded}`, '_blank');
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
              Enquire About Stay
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
          
          {/* Accommodation Selection */}
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5">
              Select Accommodation
            </label>
            <select
              value={formData.bhk}
              onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
              className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
            >
              {homestayConfig.accommodations.map((acc) => (
                <option key={acc.id} value={acc.name}>
                  {acc.name} — {acc.tagline}
                </option>
              ))}
            </select>
          </div>

          {/* Dates Row with Validation */}
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
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Check-out Date {!isDateInvalid ? `(${nights}N)` : ''}</span>
              </label>
              <input
                type="date"
                required
                min={formData.checkIn || today}
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className={`w-full bg-[#F4F1E7] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none transition-colors ${
                  isDateInvalid ? 'border-red-500 focus:border-red-600' : 'border-[#C9AE8C]/50 focus:border-[#263D32]'
                }`}
              />
            </div>
          </div>

          {/* Date Validation Error Message */}
          {isDateInvalid && (
            <p className="text-[11px] text-red-600 font-sans flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Check-out date must be later than check-in date.</span>
            </p>
          )}

          {/* Adults & Children Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Adults (Age 13+)</span>
              </label>
              <select
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
                <option value="5">5 Adults</option>
                <option value="6">6 Adults</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#71866B]" />
                <span>Children (Age 0-12)</span>
              </label>
              <select
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#343831] font-medium focus:outline-none focus:border-[#263D32] transition-colors cursor-pointer"
              >
                <option value="0">0 Children</option>
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
                <option value="3">3 Children</option>
              </select>
            </div>
          </div>

          {/* Capacity Guidance Note */}
          {isCapacityWarning && (
            <p className="text-[11px] text-[#71866B] font-sans bg-[#F4F1E7] p-2 rounded-lg">
              Note: The {formData.bhk} is designed for up to 3 guests. For larger parties, we recommend selecting <strong>The Entire Villa</strong>.
            </p>
          )}

          {/* Guest Name & Phone */}
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
                <span>Contact Phone (Optional)</span>
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

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#263D32] mb-1.5">
              Notes or Questions (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Estimated arrival time, dietary questions, extra mattress..."
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="w-full bg-[#F4F1E7] border border-[#C9AE8C]/50 rounded-xl px-3.5 py-2 text-xs text-[#343831] focus:outline-none focus:border-[#263D32] transition-colors resize-none"
            />
          </div>

          {/* Rate Notice */}
          <div className="p-3.5 rounded-xl bg-[#F4F1E7] border border-[#C9AE8C]/50 flex items-center justify-between text-xs font-sans">
            <span className="text-[#52574E]">
              {selectedRoom?.price?.amount
                ? `Tariff: ${selectedRoom.price.amount} / night`
                : "Current Tariff: Contact us for rates"}
            </span>
            <span className="text-[#71866B] font-medium">Direct Host Chat</span>
          </div>

          {/* Launch Blocker Notice if host WhatsApp is not set */}
          {!hasWhatsApp && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold block mb-0.5">Host Number Configuration Notice:</span>
                <span>The host WhatsApp number has not yet been configured in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">homestayConfig.contact.whatsappNumber</code>. Direct messaging will open automatically once a number is supplied.</span>
              </div>
            </div>
          )}

          {/* Action */}
          <button
            type="submit"
            disabled={!hasWhatsApp || isDateInvalid || isGuestCountInvalid}
            className={`w-full py-3.5 rounded-full text-xs font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 mt-2 ${
              hasWhatsApp && !isDateInvalid && !isGuestCountInvalid
                ? 'bg-[#263D32] hover:bg-[#1A2B23] text-[#F4F1E7] cursor-pointer'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed opacity-80'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>{hasWhatsApp ? 'Send Enquiry via WhatsApp' : 'Host Number Pending Configuration'}</span>
          </button>

          <p className="text-center text-[11px] text-[#52574E]/80 font-sans font-light">
            * This opens WhatsApp directly with your host. This is an enquiry, not an automated reservation.
          </p>
        </form>

      </div>
    </div>
  );
}
