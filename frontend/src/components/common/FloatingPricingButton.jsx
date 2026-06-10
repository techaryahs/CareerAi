import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IndianRupee } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const FloatingPricingButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Only render on the Consult page
  if (location.pathname !== "/consult") return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96, y: 0 }}
        onClick={() => navigate("/consult-pricing")}
        className="floating-pricing-btn"
      >
        <IndianRupee size={16} className="flex-shrink-0" />
        <span>View Pricing</span>

        <style>{`
          .floating-pricing-btn {
            position: fixed;
            left: 12px;
            bottom: calc(env(safe-area-inset-bottom, 0px) + 80px);
            z-index: 9999;
            height: 50px;
            width: auto;
            border-radius: 999px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 700;
            border: none;
            cursor: pointer;
            color: #fff;
            background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%);
            box-shadow: 0 8px 16px rgba(0, 123, 255, 0.25);
            transition: transform 0.2s, box-shadow 0.2s, background-position 0.4s ease;
          }

          .floating-pricing-btn:hover {
            box-shadow: 0 10px 24px rgba(0, 123, 255, 0.4);
          }

          @media (min-width: 480px) and (max-width: 767px) {
            .floating-pricing-btn {
              height: 54px;
              padding: 0 24px;
              font-size: 15px;
            }
          }

          @media (min-width: 768px) {
            .floating-pricing-btn {
              position: absolute;
              top: 30px;
              right: 30px;
              bottom: auto;
              left: auto;
              z-index: 10;
              height: auto;
              width: auto;
              border-radius: 14px;
              padding: 12px 22px;
              font-size: 14px;
              background: linear-gradient(90deg, #007BFF 0%, #00b4ff 40%, #007BFF 80%);
              background-size: 200% auto;
              box-shadow: none;
            }
            
            .floating-pricing-btn:hover {
              background-position: right center;
              box-shadow: 0 6px 20px rgba(0, 123, 255, 0.45);
            }
          }
        `}</style>
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingPricingButton;
