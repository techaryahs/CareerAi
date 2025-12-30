// src/components/Loader.jsx
import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex space-x-3">
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce-wave [animation-delay:0s]"></div>
        <div className="w-4 h-4 rounded-full bg-pink-500 animate-bounce-wave [animation-delay:0.2s]"></div>
        <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce-wave [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
}
