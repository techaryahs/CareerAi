import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { EDU_SUBJECTS } from "../data/EduSubjects";
// import { EDU_TUTORS } from "../data/EduTutors";
import { EDU_PRICING } from "../data/EduPricing";

export default function EduCartPage() {
  const navigate = useNavigate();

  const {
    // FIX: use selectedTutor from BookingContext
    // selectedTutorId was not provided by context, causing cart to miss tutor details.
    selectedTutorObj: tutor,
    selectedSlot,
    selectedSubjects,
  } = useBooking();

  const subjectObjects = useMemo(
    () =>
      EDU_SUBJECTS.filter((s) => selectedSubjects.includes(s.id)),
    [selectedSubjects]
  );

  // ===== Pricing calculations (FIXED CONTRACT) =====
  // Subjects have NO price in this frontend contract. Tutor defines price per hour.
  // Broken: subjectTotal used subject.price (not part of data model) and tutorFee read hourlyPrice (nonexistent).
  // Fixed: subjectTotal = 0, tutorFee = tutor.price (as defined in EduTutors.js).
  const subjectTotal = 0;
  const tutorFee = (tutor?.price ?? tutor?.hourlyPrice) || 0;
  const baseTotal = tutorFee;

  const platformFee = Math.round(
    (baseTotal * EDU_PRICING.platformFeePercent) / 100
  );

  const taxAmount = Math.round(
    ((baseTotal + platformFee) * EDU_PRICING.taxPercent) / 100
  );

  const grandTotal = baseTotal + platformFee + taxAmount;

  const handleCheckout = () => {
    navigate("/edu/checkout");
  };

  if (!selectedSubjects.length) {
    return (
      <p className="text-gray-500 text-sm">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-900">
        Review Your Booking
      </h2>

      {/* Tutor & Slot */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm">
        <p className="font-semibold text-gray-800 mb-1">
          Tutor & Time Slot
        </p>

        {tutor ? (
          <>
            <p className="text-gray-700">
              Tutor:{" "}
              <span className="font-semibold">
                {tutor.name}
              </span>{" "}
              ({(tutor.experience ?? tutor.experienceYears)} yrs • Online)
            </p>
            <p className="text-gray-700 mt-1">
              Slot:{" "}
              <span className="font-semibold">
                {selectedSlot?.day ? `${selectedSlot.day}: ${selectedSlot.startTime} - ${selectedSlot.endTime}` : selectedSlot}
              </span>
            </p>
          </>
        ) : (
          <p className="text-gray-500">
            No tutor selected yet.
          </p>
        )}
      </div>

      {/* Subjects */}
      <div>
        <h3 className="font-bold mb-2 text-gray-900 text-sm">
          Selected Subjects
        </h3>

        <div className="space-y-2">
          {subjectObjects.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm"
            >
              <span className="text-gray-800">
                {sub.name}
              </span>
              {/* No subject price shown per platform rules */}
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm text-sm space-y-1">
        <div className="flex justify-between">
          <span>Subjects Total</span>
          <span>
            {EDU_PRICING.currencySymbol}
            {subjectTotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tutor Hourly Fee</span>
          <span>
            {EDU_PRICING.currencySymbol}
            {tutorFee}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>
            Platform Fee ({EDU_PRICING.platformFeePercent}%)
          </span>
          <span>
            {EDU_PRICING.currencySymbol}
            {platformFee}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Tax ({EDU_PRICING.taxPercent}%)</span>
          <span>
            {EDU_PRICING.currencySymbol}
            {taxAmount}
          </span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between font-bold text-gray-900 text-base">
          <span>Total Amount</span>
          <span>
            {EDU_PRICING.currencySymbol}
            {grandTotal}
          </span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={!tutor || !selectedSlot}
        className="w-full py-3 bg-blue-600 text-white rounded-lg
                   hover:bg-blue-700 disabled:bg-gray-400
                   disabled:cursor-not-allowed transition-all font-semibold"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
