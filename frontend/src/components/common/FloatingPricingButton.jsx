import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IndianRupee } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const FloatingPricingButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Show only on Consult page
  if (location.pathname !== "/consult") return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate("/consult-pricing")}
        className="floating-pricing-btn"
      >
        <IndianRupee size={16} className="flex-shrink-0" />
        <span>View Pricing</span>

        <style>{`
          .floating-pricing-btn {
            position: fixed;
            right: 16px;
            bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
            z-index: 9999;
            height: 50px;
            padding: 0 20px;

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            border: none;
            border-radius: 999px;

            font-size: 14px;
            font-weight: 700;
            color: #fff;
            cursor: pointer;

            background: linear-gradient(
              90deg,
              #007bff 0%,
              #00b4ff 40%,
              #007bff 80%
            );
            background-size: 200% auto;

            box-shadow: 0 8px 20px rgba(0, 123, 255, 0.35);
            transition: all 0.3s ease;
          }

          .floating-pricing-btn:hover {
            background-position: right center;
            box-shadow: 0 10px 24px rgba(0, 123, 255, 0.45);
          }

          /* Small tablets */
          @media (min-width: 480px) and (max-width: 767px) {
            .floating-pricing-btn {
              height: 54px;
              padding: 0 24px;
              font-size: 15px;
            }
          }

          /* Desktop & Laptop */
          @media (min-width: 768px) {
            .floating-pricing-btn {
              left: auto;
              bottom: auto;

              top: 90px;
              right: 24px;

              height: 48px;
              padding: 0 22px;
              border-radius: 14px;
              font-size: 14px;

              z-index: 99999;
            }
          }

          /* Large Desktop */
          @media (min-width: 1440px) {
            .floating-pricing-btn {
              top: 100px;
              right: 32px;
            }
          }
        `}</style>
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingPricingButton;