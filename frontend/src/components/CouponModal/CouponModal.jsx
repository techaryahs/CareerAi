import React, { useEffect, useState } from "react";
import { X, Tag, Percent } from "lucide-react";
import api from "../../api";

const CouponModal = ({ plan, onClose, onProceed }) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const  planPrice = Number(
    String(plan?.price || 0).replace(/[₹,]/g, "")
  );

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await api.get("/api/coupons");

      const data = res.data;

      if (data.success) {
        const activeCoupons = data.coupons.filter(
          (coupon) => coupon.active
        );

        setAvailableCoupons(activeCoupons);
      }
    } catch (error) {
      console.error(
        "Error fetching coupons:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateFinalPrice = () => {
  if (!appliedCoupon) return planPrice;

  return (
    planPrice -
    (planPrice * appliedCoupon.discount) / 100
  ).toFixed(2);
};

  const finalPrice = calculateFinalPrice();

  const applyCoupon = () => {
    const coupon = availableCoupons.find(
      (c) =>
        c.code.toUpperCase() ===
        couponCode.toUpperCase()
    );

    if (!coupon) {
      alert("Invalid Coupon Code");
      return;
    }

    setAppliedCoupon(coupon);
  };

  const useCoupon = (coupon) => {
    setCouponCode(coupon.code);
    setAppliedCoupon(coupon);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            Apply Coupon
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Plan */}
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">
              {plan?.name}
            </h3>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              ₹{planPrice.toLocaleString()}
            </p>
          </div>

          {/* Coupon Input */}
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) =>
                setCouponCode(
                  e.target.value.toUpperCase()
                )
              }
              className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={applyCoupon}
              className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Apply
            </button>
          </div>

          {/* Available Coupons */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">
              Available Offers
            </h4>

            {loading ? (
              <p className="text-gray-500">
                Loading coupons...
              </p>
            ) : availableCoupons.length === 0 ? (
              <p className="text-gray-500">
                No active coupons available
              </p>
            ) : (
              <div className="space-y-3">
                {availableCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="border rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        <Tag size={16} />
                        {coupon.code}
                      </div>

                      <div className="text-green-600 text-sm flex items-center gap-1 mt-1">
                        <Percent size={14} />
                        {coupon.discount}% OFF
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        useCoupon(coupon)
                      }
                      className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-semibold"
                    >
                      Use
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-5">
            <div className="flex justify-between mb-2">
              <span>Original Price</span>
              <span>
                ₹{planPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between mb-2 text-green-600">
              <span>Discount</span>

              <span>
                {appliedCoupon
                  ? `-${appliedCoupon.discount}%`
                  : "0%"}
              </span>
            </div>

            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Final Price</span>

              <span>
                ₹{finalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Applied Coupon */}
          {appliedCoupon && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 mb-4">
              Coupon Applied:
              <strong>
                {" "}
                {appliedCoupon.code}
              </strong>
            </div>
          )}

          {/* Payment */}
          <button
            onClick={() =>
  onProceed({
    couponCode: appliedCoupon?.code || null,
    finalAmount: Number(finalPrice),
    originalAmount: planPrice,
    discount: appliedCoupon?.discount || 0,
  })
}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all"
          >
            Proceed To Payment
          </button>

        </div>
      </div>
    </div>
  );
};

export default CouponModal;