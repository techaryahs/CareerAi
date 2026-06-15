const PricingSettings = require("../models/PricingSettings");

class PricingService {
  /**
   * Default package and membership prices.
   */
  getDefaultPricing() {
    return {
      smart: { price: 2999, enabled: true },
      premium: { price: 5999, enabled: true },
      eliteVip: { price: 9999, enabled: true },
      premium1Month: { price: 1999, enabled: true },
      premium2Months: { price: 2999, enabled: true },
      premium3Months: { price: 3999, enabled: true }
    };
  }

  /**
   * Seeds pricing settings if no document exists in the collection,
   * or migrates existing flat schema fields to the new nested schema structure.
   */
  async ensurePricingSettings() {
    try {
      const rawDoc = await PricingSettings.findOne().lean();
      if (!rawDoc) {
        await PricingSettings.create(this.getDefaultPricing());
        // console.log("🌱 Default pricing configurations successfully seeded.");
      } else {
        let doc = await PricingSettings.findOne();
        let needsUpdate = false;
        const keys = ["smart", "premium", "eliteVip", "premium1Month", "premium2Months", "premium3Months"];
        
        for (const key of keys) {
          const rawValue = rawDoc[key];
          // If stored as a flat number in database
          if (typeof rawValue === "number") {
            doc[key] = {
              price: rawValue,
              enabled: true
            };
            needsUpdate = true;
          } else if (!rawValue || typeof rawValue.price === "undefined") {
            // Missing field or invalid structure
            doc[key] = {
              price: this.getDefaultPricing()[key].price,
              enabled: true
            };
            needsUpdate = true;
          }
        }
        
        if (needsUpdate) {
          await doc.save();
          // console.log("🌱 Successfully migrated existing pricing configurations to nested structure.");
        }
      }
    } catch (err) {
      console.error("❌ Failed to seed/migrate pricing settings:", err);
    }
  }

  /**
   * Fetches the raw pricing settings document from MongoDB.
   */
  async getSettings() {
    try {
      let settings = await PricingSettings.findOne();
      if (!settings) {
        await this.ensurePricingSettings();
        settings = await PricingSettings.findOne();
      }
      return settings || this.getDefaultPricing();
    } catch (err) {
      console.error("Error retrieving pricing settings from DB, using defaults:", err);
      return this.getDefaultPricing();
    }
  }

  /**
   * Returns a specific plan's price based on its name.
   * Standardizes naming key mappings used in frontend and payment checkouts.
   */
  async getPlanPrice(planName) {
    try {
      const settings = await this.getSettings();
      
      const mapping = {
        "SMART": settings.smart?.price,
        "PREMIUM": settings.premium?.price,
        "ELITE VIP": settings.eliteVip?.price,
        "1 Month": settings.premium1Month?.price,
        "2 Months": settings.premium2Months?.price,
        "3 Months": settings.premium3Months?.price
      };

      const price = mapping[planName];
      if (price === undefined) {
        throw new Error(`Plan "${planName}" does not have a mapped price in configuration.`);
      }
      return price;
    } catch (err) {
      console.error(`Error resolving price for plan "${planName}":`, err);
      // Fail-safe fallbacks if DB is down
      const defaults = this.getDefaultPricing();
      const defaultMapping = {
        "SMART": defaults.smart.price,
        "PREMIUM": defaults.premium.price,
        "ELITE VIP": defaults.eliteVip.price,
        "1 Month": defaults.premium1Month.price,
        "2 Months": defaults.premium2Months.price,
        "3 Months": defaults.premium3Months.price
      };
      return defaultMapping[planName] || 0;
    }
  }

  /**
   * Returns a specific plan's activation status based on its name.
   */
  async isPlanEnabled(planName) {
    try {
      const settings = await this.getSettings();
      
      const mapping = {
        "SMART": settings.smart?.enabled,
        "PREMIUM": settings.premium?.enabled,
        "ELITE VIP": settings.eliteVip?.enabled,
        "1 Month": settings.premium1Month?.enabled,
        "2 Months": settings.premium2Months?.enabled,
        "3 Months": settings.premium3Months?.enabled
      };

      const enabled = mapping[planName];
      return enabled !== false; // Default to true if undefined
    } catch (err) {
      console.error(`Error checking activation status for plan "${planName}":`, err);
      return true; // Safe fallback
    }
  }

  /**
   * Validates and updates the pricing settings document.
   */
  async updatePricingSettings(data) {
    const isValidPrice = (val) => {
      const num = Number(val);
      return val !== undefined && !isNaN(num) && Number.isFinite(num) && num >= 0 && num <= 100000;
    };
    const isValidBool = (val) => {
      return val === true || val === false || val === 'true' || val === 'false';
    };

    const keys = ["smart", "premium", "eliteVip", "premium1Month", "premium2Months", "premium3Months"];
    for (const key of keys) {
      const planData = data[key];
      if (!planData || !isValidPrice(planData.price)) {
        throw new Error(`Invalid price value for ${key}. Must be a finite number between 0 and 100,000.`);
      }
      if (planData.enabled !== undefined && !isValidBool(planData.enabled)) {
        throw new Error(`Invalid status value for ${key}. Must be a boolean.`);
      }
    }

    let settings = await PricingSettings.findOne();
    if (!settings) {
      settings = new PricingSettings();
    }

    const toBool = (val) => String(val) === 'true' || val === true;

    settings.smart = { price: Number(data.smart.price), enabled: toBool(data.smart.enabled) };
    settings.premium = { price: Number(data.premium.price), enabled: toBool(data.premium.enabled) };
    settings.eliteVip = { price: Number(data.eliteVip.price), enabled: toBool(data.eliteVip.enabled) };
    settings.premium1Month = { price: Number(data.premium1Month.price), enabled: toBool(data.premium1Month.enabled) };
    settings.premium2Months = { price: Number(data.premium2Months.price), enabled: toBool(data.premium2Months.enabled) };
    settings.premium3Months = { price: Number(data.premium3Months.price), enabled: toBool(data.premium3Months.enabled) };

    await settings.save();
    return settings;
  }
}

module.exports = new PricingService();

