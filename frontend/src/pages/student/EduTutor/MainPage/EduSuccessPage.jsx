// import React from "react";

export default function EduSuccessPage() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h2>

      <p className="text-gray-700 text-lg mb-6">
        Your tutor booking has been confirmed.  
        You will receive a confirmation email shortly.
      </p>

      <div className="mt-6">
        <a
          href="/edu"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
