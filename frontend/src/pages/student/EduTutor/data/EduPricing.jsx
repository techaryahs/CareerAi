// src/data/EduPricing.js

/**
 * Centralised pricing configuration for EduTutor.
 *
 * IMPORTANT:
 * - UI must NEVER calculate money on its own
 * - Backend can mirror this logic later
 * - All prices are assumed per hour
 */

export const EDU_PRICING = {
  currency: "INR",
  currencySymbol: "₹",

  // Platform service fee (percentage on tutor fee)
  platformFeePercent: 5,

  // Tax percentage (GST)
  taxPercent: 18
};

/**
 * Calculate price breakdown for cart
 *
 * @param {number} baseAmount - Tutor fee total (subjects × hours × rate)
 * @returns {object} detailed price breakdown
 */
export const calculatePriceBreakdown = (baseAmount = 0) => {
  const platformFee =
    (baseAmount * EDU_PRICING.platformFeePercent) / 100;

  const taxableAmount = baseAmount + platformFee;

  const tax =
    (taxableAmount * EDU_PRICING.taxPercent) / 100;

  const total = taxableAmount + tax;

  return {
    currency: EDU_PRICING.currency,
    currencySymbol: EDU_PRICING.currencySymbol,

    baseAmount: round(baseAmount),
    platformFee: round(platformFee),
    tax: round(tax),
    total: round(total)
  };
};

/**
 * Utility: round to 2 decimal places
 */
const round = (value) => Number(value.toFixed(2));
