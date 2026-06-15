import React from "react";
import {
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import CouponModal from "../../../components/CouponModal/CouponModal";



const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const ConsultPricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showCouponModal, setShowCouponModal] = React.useState(false);
  const [selectedPackage, setSelectedPackage] = React.useState(null);
  const [discountedPrice, setDiscountedPrice] = React.useState(null);
  const [appliedCoupon, setAppliedCoupon] = React.useState(null);
  const [prices, setPrices] = React.useState({
    SMART: 2999,
    PREMIUM: 5999,
    "ELITE VIP": 9999,
  });
  const [plansStatus, setPlansStatus] = React.useState({
    SMART: true,
    PREMIUM: true,
    "ELITE VIP": true,
  });

  React.useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await api.get("/api/settings/pricing");
        if (res.data && res.data.pricing) {
          const p = res.data.pricing;
          setPrices({
            SMART: p.smart?.price ?? 2999,
            PREMIUM: p.premium?.price ?? 5999,
            "ELITE VIP": p.eliteVip?.price ?? 9999,
          });
          console.log("API RESPONSE:", res.data);
          console.log("SMART FROM API:", p.smart?.price);
          setPlansStatus({
            SMART: p.smart?.enabled !== false,
            PREMIUM: p.premium?.enabled !== false,
            "ELITE VIP": p.eliteVip?.enabled !== false,
          });
        }
      } catch (err) {
        console.error("Failed to fetch dynamic prices:", err);
      }
    };
    fetchPrices();
  }, []);


  const packages = [
    {
      name: "SMART",
      price: `₹${prices.SMART.toLocaleString("en-IN")}`,
      subtitle: "Smart Admission Support",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Everything in Free",
        "45-Min Expert Session",
        "Score Analysis",
        "20 College Shortlist",
        "CAP Round Guidance",
        "Application Form Support",
        "Scholarship Eligibility Check",
        "Fee Comparison",
        "Deadline Tracking",
        "WhatsApp Support (15 Days)",
      ],
      button: "Choose Smart",
    },
    {
      name: "PREMIUM",
      price: `₹${prices.PREMIUM.toLocaleString("en-IN")}`,
      subtitle: "Complete Admission Planning",
      popular: true,
      color: "from-yellow-500 to-orange-500",
      features: [
        "Everything in Smart",
        "3 Counselling Sessions",
        "Psychometric Assessment",
        "Career Roadmap Report",
        "College Predictor",
        "Choice Filling Guidance",
        "Scholarship Assistance",
        "Institute Comparison Report",
        "Branch Selection Counselling",
        "Parent + Student Session",
        "Priority Support (30 Days)",
      ],
      button: "Choose Premium",
    },
    {
      name: "ELITE VIP",
      price: `₹${prices["ELITE VIP"].toLocaleString("en-IN")}`,
      subtitle: "End-to-End Admission Management",
      color: "from-purple-600 via-indigo-600 to-blue-700",
      features: [
        "Everything in Premium",
        "Dedicated Admission Manager",
        "Unlimited Counselling",
        "Full Admission Handholding",
        "CAP Registration Support",
        "Document Upload Assistance",
        "Spot Round Guidance",
        "Education Loan Support",
        "Hostel Guidance",
        "Emergency Deadline Support",
        "Parent Counselling Unlimited",
        "Daily Priority WhatsApp Support",
        "AI Career Report",
        "Salary Prediction Report",
        "Future Job Trend Report",
        "Internship Guidance",
        "LinkedIn Profile Setup",
      ],
      button: "Book VIP Consultation",
    },
  ];

  const handleChoosePlan = (pkg) => {
    setSelectedPackage(pkg);
    setShowCouponModal(true);
  };
  const processPayment = async (
    pkg,
    couponCode = null,
    finalAmount = null
  ) => {

  // console.log("================================");
  // console.log("PROCESS PAYMENT CALLED");
  // console.log("PACKAGE:", pkg);
  // console.log("COUPON CODE:", couponCode);
  // console.log("FINAL AMOUNT:", finalAmount);

    if (pkg.name === "FREE") {
      navigate("/free-counseling");
      return;
    }

    if (!user) {
      sessionStorage.setItem("redirectPath", "/consult-pricing");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    try {
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      // Call backend to create order
      // console.log("CALLING BACKEND ORDER API");

// console.log({
//   planName: pkg.name,
//   couponCode,
//   finalAmount,
// });

      const orderRes = await api.post("/api/payments/order", {
        planName: pkg.name,
        couponCode,
        finalAmount,
      });

      if (!orderRes.data || !orderRes.data.order) {
        throw new Error("Failed to create order on the backend");
      }

      const { order } = orderRes.data;
//       console.log("ORDER RESPONSE RECEIVED");

// console.log(order);

      const options = {
        key: "rzp_live_RseCm2t4lFlfMC", // Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "CareerGenAI",
        description: `${pkg.name} Subscription Plan`,
        order_id: order.id,
        handler: async function (response) {
          try {
            setIsProcessing(true);
            const verifyRes = await api.post("/api/payments/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              planName: pkg.name
            });

            if (verifyRes.data.success) {
              alert(`🎉 Payment successful! Your account has been upgraded to ${pkg.name}.`);
              window.location.reload();
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            alert("Error verifying payment signature. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.mobile || ""
        },
        theme: {
          color: "#0041A3",
        },
      };

//       console.log("OPENING RAZORPAY");

// console.log({
//   amount: order.amount,
//   orderId: order.id,
// });

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      const errMsg = error.response?.data?.error === "Selected plan is currently unavailable."
        ? "This plan is currently unavailable. Please choose another package."
        : (error.response?.data?.error || "Failed to initiate payment. Please try again.");
      alert(errMsg);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="text-center mb-20">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            CareerGenAI Admission Packages
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 text-gray-900">
            Admission Guidance & Counselling
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            From Career Selection to Final Admission Confirmation,
            we help students and parents make confident decisions.
          </p>
        </div>

        {user?.profile?.admissionPackage?.packageName && (
          <div className="mb-10">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-green-800">
                  🎓 Active Admission Package
                </h3>

                <p className="text-green-700 mt-1">
                  You currently have the{" "}
                  <span className="font-semibold">
                    {user.profile.admissionPackage.packageName}
                  </span>{" "}
                  package.
                </p>

                {user.profile.admissionPackage.expiresAt && (
                  <p className="text-sm text-green-600 mt-1">
                    Valid until{" "}
                    {new Date(
                      user.profile.admissionPackage.expiresAt
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>

              <button
                onClick={() => navigate("/history")}
                className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700"
              >
                View Details
              </button>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          {packages.filter(pkg => plansStatus[pkg.name] !== false).map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-3xl bg-white border shadow-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 ${pkg.popular
                ? "border-yellow-400 scale-105"
                : "border-gray-200"
                }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 text-center text-sm font-bold flex items-center justify-center gap-2">
                    <Star size={16} />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${pkg.color}`} />

              <div className="p-8">

                <div
                  className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${pkg.color} text-white text-sm font-semibold`}
                >
                  {pkg.name}
                </div>

                <h2 className="text-5xl font-black mt-6">
                  {pkg.price}
                </h2>

                <p className="text-gray-500 mt-2">
                  {pkg.subtitle}
                </p>

                <button
                  onClick={() => handleChoosePlan(pkg)}
                  disabled={isProcessing}
                  className={`w-full mt-8 bg-gradient-to-r ${pkg.color} text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${isProcessing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isProcessing ? "Processing..." : pkg.button}
                  <ArrowRight size={18} />
                </button>

                <div className="mt-8 space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Why Choose */}
        <div className="mt-24 bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose CareerGenAI?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "AI + Expert Guidance",
              "CAP Round Specialists",
              "Scholarship Assistance",
              "Admission Support",
              "Career Roadmaps",
              "Parent Counselling",
              "College Predictors",
              "Trusted Experts",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-5 text-center font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#002B5B] to-[#0041A3] rounded-3xl text-white p-14 text-center">
          <h2 className="text-4xl font-bold">
            Ready To Secure Your Admission?
          </h2>

          <p className="mt-4 text-lg opacity-90 max-w-3xl mx-auto">
            Book your consultation today and get expert admission guidance.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-8">
            <button
              onClick={() => navigate("/free-counseling")}
              className="bg-white text-[#0041A3] px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300"
            >
              Book Free Consultation
            </button>

            <button
              onClick={() => navigate("/consult")}
              className="border border-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300">
              Talk To Expert
            </button>
          </div>
        </div>

      </div>
      {showCouponModal && (
        <CouponModal
          plan={selectedPackage}
          onClose={() => setShowCouponModal(false)}
          onProceed={(paymentData) => {
            setShowCouponModal(false);

            processPayment(
              selectedPackage,
              paymentData.couponCode,
              paymentData.finalAmount
            );
          }}
        />
      )}
    </div>
  );
};

export default ConsultPricing;