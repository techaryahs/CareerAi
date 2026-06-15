import React, { useEffect, useState } from "react";
import api from "../../api";

const CreateCoupon = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    try {
      const res = await api.get("/api/coupons");

      if (res.data.success) {
        setCoupons(res.data.coupons);
      }
    } catch (error) {
      console.error(
        "Error fetching coupons:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();

    if (!code || !discount) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/coupons", {
        code,
        discount,
      });

      if (res.data.success) {
        alert("Coupon Created Successfully");

        setCode("");
        setDiscount("");

        fetchCoupons();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to create coupon"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.put(
        `/api/coupons/${id}/status`
      );

      if (res.data.success) {
        fetchCoupons();
      }
    } catch (error) {
      console.error(
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Coupon Management
          </h1>

          <p className="text-slate-500 mt-2">
            Create and manage discount coupons
          </p>
        </div>

        {/* Create Coupon Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">
            Create New Coupon
          </h2>

          <form
            onSubmit={handleCreateCoupon}
            className="grid md:grid-cols-3 gap-4"
          >
            <input
              type="text"
              placeholder="Coupon Code"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.toUpperCase())
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Discount %"
              value={discount}
              onChange={(e) =>
                setDiscount(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-3 font-semibold"
            >
              {loading ? "Creating..." : "Create Coupon"}
            </button>
          </form>
        </div>

        {/* Coupon List */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">
            Existing Coupons
          </h2>

          {coupons.length === 0 ? (
            <p className="text-slate-500">
              No coupons found
            </p>
          ) : (
            <div className="space-y-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="border rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {coupon.code}
                    </h3>

                    <p className="text-green-600 font-medium">
                      {coupon.discount}% OFF
                    </p>

                    <p
                      className={`text-sm mt-1 ${
                        coupon.active
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {coupon.active
                        ? "Active"
                        : "Disabled"}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleToggleStatus(coupon.id)
                    }
                    className={`px-4 py-2 rounded-lg text-white font-medium ${
                      coupon.active
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {coupon.active
                      ? "Disable"
                      : "Enable"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CreateCoupon;