import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const QrPopup = ({ selectedPlan, onClose }) => {
  const navigate = useNavigate();

  const planPrices = {
    "1 Month": "1999",
    "2 Months": "2999",
    "3 Months": "3999",
  };

  const upiId = "shailapadwal83@okhdfcbank";
  const planAmount = planPrices[selectedPlan];
  const upiLink = `upi://pay?pa=${upiId}&pn=Rahul Padwal&am=${planAmount}&cu=INR`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-scaleIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl font-bold text-gray-500 hover:text-red-500"
        >
          ✖
        </button>

        <h3 className="mb-2 text-center text-xl font-semibold">
          Scan to Pay
        </h3>

        <p className="text-center text-sm text-gray-600">
          <strong>Plan:</strong> {selectedPlan}
        </p>

        <p className="mb-4 text-center text-lg font-bold text-green-600">
          ₹{planAmount}
        </p>

        {/* QR Code */}
        <div className="flex justify-center">
          <QRCodeSVG value={upiLink} size={200} />
        </div>

        <p className="mt-4 break-all text-center text-sm">
          <strong>UPI ID:</strong> {upiId}
        </p>

        <button
          onClick={() => navigator.clipboard.writeText(upiId)}
          className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          📋 Copy UPI ID
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          After payment, upload your receipt
        </p>

        <button
          onClick={() => navigate("/upload-receipt")}
          className="mt-3 w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700"
        >
          📤 Upload Receipt
        </button>
      </div>
    </div>
  );
};

export default QrPopup;
