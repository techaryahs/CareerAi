import { Capacitor } from "@capacitor/core";

const APPLE_PRODUCT_IDS = {
  SMART: "com.careergenai.plan.smart",
  PREMIUM: "com.careergenai.plan.premium",
  "ELITE VIP": "com.careergenai.plan.elitevip",
};

let storeReady = false;
let registeredProducts = false;

const isNativeIOSApp = () =>
  Capacitor.isNativePlatform() && Capacitor.getPlatform() === "ios";

const waitForStore = (timeout = 8000) =>
  new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      if (window.CdvPurchase && window.CdvPurchase.store) {
        resolve(window.CdvPurchase);
        return;
      }

      if (Date.now() - start > timeout) {
        reject(
          new Error("Apple IAP store not available on window.CdvPurchase"),
        );
        return;
      }

      setTimeout(check, 250);
    };

    check();
  });

export const initializeAppleIAP = async ({ onApproved, onError } = {}) => {
  if (!isNativeIOSApp()) return;

  const CdvPurchase = await waitForStore();
  const { store, ProductType, Platform } = CdvPurchase;

  if (!registeredProducts) {
    store.register([
      {
        id: APPLE_PRODUCT_IDS.SMART,
        type: ProductType.NON_CONSUMABLE,
        platform: Platform.APPLE_APPSTORE,
      },
      {
        id: APPLE_PRODUCT_IDS.PREMIUM,
        type: ProductType.NON_CONSUMABLE,
        platform: Platform.APPLE_APPSTORE,
      },
      {
        id: APPLE_PRODUCT_IDS["ELITE VIP"],
        type: ProductType.NON_CONSUMABLE,
        platform: Platform.APPLE_APPSTORE,
      },
    ]);

    registeredProducts = true;
  }

  // Remove noisy duplicate registrations by guarding once
  if (!storeReady) {
    store
      .when()
      .approved(async (transaction) => {
        try {
          await transaction.verify();
        } catch (e) {
          console.error("Apple transaction verify() failed:", e);
          onError?.(e);
        }
      })
      .verified(async (receipt) => {
        try {
          const transaction =
            receipt?.transactions?.[receipt.transactions.length - 1] || null;

          if (transaction) {
            await onApproved?.({
              productId: transaction.products?.[0]?.id || null,
              transactionId: transaction.transactionId || null,
              platform: "ios",
              rawReceipt: receipt,
            });
          }

          await receipt.finish();
        } catch (e) {
          console.error("Apple verified handler failed:", e);
          onError?.(e);
        }
      })
      .error((err) => {
        console.error("Apple IAP store error:", err);
        onError?.(err);
      });

    await store.initialize([Platform.APPLE_APPSTORE]);
    storeReady = true;
  }

  try {
    await store.update();
  } catch (e) {
    console.warn("Apple store update warning:", e);
  }
};

export const purchaseApplePlan = async (planName) => {
  if (!isNativeIOSApp()) {
    throw new Error("Apple IAP is only available in the iOS app.");
  }

  const CdvPurchase = await waitForStore();
  const { store, Platform } = CdvPurchase;

  const productId = APPLE_PRODUCT_IDS[planName];
  if (!productId) {
    throw new Error(`No Apple product configured for plan: ${planName}`);
  }

  const product = store.get(productId, Platform.APPLE_APPSTORE);

  if (!product) {
    throw new Error(
      `Apple product not loaded yet for ${planName} (${productId}). Try again in a moment.`,
    );
  }

  const offer = product.getOffer?.();
  if (!offer) {
    throw new Error(`No purchase offer available for ${planName}.`);
  }

  await offer.order();
};

export const restoreApplePurchases = async () => {
  if (!isNativeIOSApp()) return;

  const CdvPurchase = await waitForStore();
  const { store } = CdvPurchase;
  await store.restorePurchases();
};

export const applePlanProductIds = APPLE_PRODUCT_IDS;
export const isAppleIAPPlatform = isNativeIOSApp;
