import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Briefcase,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import PremiumPopup from "../../../components/PremiumPlans/PremiumPlans";
import Loader from "../../../components/PageLoader/PageLoader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Consult = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/consultants`
        );
        setConsultants(res.data.consultants || []);
      } catch (err) {
        console.error("❌ Failed to fetch consultants:", err.message);
        setConsultants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  const isPremiumConsultant = (consultant) =>
    consultant.name === "Personal Counselor";

  const handleBookClick = (consultant) => {
    if (isPremiumConsultant(consultant) && !user?.isPremium) {
      setShowPremiumPopup(true);
      return;
    }
    navigate(`/book-slot/${consultant._id}`, { state: { consultant } });
  };

  if (loading || authLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F9FAFE] py-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-4">
          Meet Your Career Mentors
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Our hand-picked experts are here to guide you at every stage of your
          journey.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {Array.isArray(consultants) && consultants.length > 0 ? (
          consultants.map((c) => (
            <div
              key={c._id}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100"
            >
              {/* Badge */}
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                  isPremiumConsultant(c)
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {isPremiumConsultant(c) ? (
                  <>
                    <Award size={12} /> Premium
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={12} /> Standard
                  </>
                )}
              </div>

              {/* Image */}
              <div className="mb-6 relative">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#00D4FF] to-[#1E3A8A]">
                  <img
                    src={c.image || "/default-avatar.jpg"}
                    alt={c.name}
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#1E3A8A] mb-1">
                {c.name}
              </h2>
              <h4 className="text-gray-500 font-medium mb-3 uppercase tracking-wider text-xs">
                {c.role}
              </h4>

              <div className="flex items-center gap-2 text-[#007BFF] font-semibold text-sm mb-4 bg-blue-50 px-3 py-1 rounded-full">
                <Briefcase size={14} /> {c.expertise}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                {c.bio}
              </p>

              <div className="w-full pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1 text-[#1E3A8A] bg-blue-50 px-3 py-1.5 rounded-xl text-xs font-bold">
                  <User size={12} /> {c.experience}
                </span>
                <button
                  className="flex items-center gap-2 bg-[#007BFF] hover:bg-[#0056B3] text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
                  onClick={() => handleBookClick(c)}
                >
                  <Calendar size={14} /> Book
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-blue-50 border border-blue-100 text-blue-800 px-8 py-10 rounded-3xl text-center space-y-4 shadow-sm max-w-2xl mx-auto">
            <div className="flex justify-center">
              <AlertCircle size={48} className="text-blue-400 opacity-50" />
            </div>
            <p className="text-lg font-medium leading-relaxed">
              😔 Our consultants are currently engaged in ongoing sessions.
              Please try booking your counseling session a little later. We
              appreciate your patience.
            </p>
          </div>
        )}
      </div>

      {showPremiumPopup && (
        <PremiumPopup
          onClose={() => setShowPremiumPopup(false)}
          onUpgrade={() => {
            setShowPremiumPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Consult;
