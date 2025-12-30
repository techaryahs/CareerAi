import { useNavigate } from "react-router-dom";

export default function IndiaVsAbroadHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">

      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        India vs Abroad
      </h1>

      <p className="text-gray-600 text-lg mb-10 text-center">
        Compare where to study based on your career field
      </p>

      {/* 🔵 START NOW BUTTON */}
      <button
        onClick={() =>
          navigate("/india-vs-abroad/compare", {
            state: { field: "Engineering" } // 🔥 default field (can change later)
          })
        }
        className="
          bg-blue-600
          text-white
          px-8 py-3
          rounded-xl
          font-semibold
          shadow-md
          hover:bg-blue-700
          transition
        "
      >
        Start Now
      </button>

    </div>
  );
}
