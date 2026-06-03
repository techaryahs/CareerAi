const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  enabled: { type: Boolean, required: true, default: true }
}, { _id: false });

const pricingSettingsSchema = new mongoose.Schema({
  smart: { type: planSchema, required: true, default: () => ({ price: 2999, enabled: true }) },
  premium: { type: planSchema, required: true, default: () => ({ price: 5999, enabled: true }) },
  eliteVip: { type: planSchema, required: true, default: () => ({ price: 9999, enabled: true }) },
  premium1Month: { type: planSchema, required: true, default: () => ({ price: 1999, enabled: true }) },
  premium2Months: { type: planSchema, required: true, default: () => ({ price: 2999, enabled: true }) },
  premium3Months: { type: planSchema, required: true, default: () => ({ price: 3999, enabled: true }) }
}, { timestamps: true });

module.exports = mongoose.models.PricingSettings || mongoose.model("PricingSettings", pricingSettingsSchema);

