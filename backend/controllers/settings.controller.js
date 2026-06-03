const pricingService = require("../services/pricing.service");

/**
 * GET /api/settings/pricing
 * Exposes the currently active pricing settings to the public.
 */
exports.getPricingSettings = async (req, res) => {
  try {
    const settings = await pricingService.getSettings();
    return res.status(200).json({
      success: true,
      pricing: settings
    });
  } catch (err) {
    console.error("Error in getPricingSettings controller:", err);
    return res.status(500).json({
      error: "Failed to fetch pricing configurations."
    });
  }
};
