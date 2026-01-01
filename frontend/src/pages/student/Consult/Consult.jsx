import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Briefcase,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  IndianRupee,
} from "lucide-react";
import PremiumPopup from "../../../components/PremiumPlans/PremiumPlans";
import Loader from "../../../components/PageLoader/PageLoader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useMemo } from "react";

const Consult = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all"); // all, free, paid
  const [maxPrice, setMaxPrice] = useState(5000);

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

  const filteredConsultants = useMemo(() => {
    return consultants.filter((c) => {
      const matchesSearch =
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.expertise?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPriceType =
        priceFilter === "all" ||
        (priceFilter === "free" && (c.price === 0 || !c.price)) ||
        (priceFilter === "paid" && c.price > 0);

      const matchesPriceRange =
        priceFilter === "paid" ? c.price <= maxPrice : true;

      return matchesSearch && matchesPriceType && matchesPriceRange;
    });
  }, [consultants, searchTerm, priceFilter, maxPrice]);

  const isPremiumConsultant = (consultant) =>
    consultant.isPremium || consultant.name === "Personal Counselor";

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
        <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-10">
          Our hand-picked experts are here to guide you at every stage of your
          journey. 
        </p>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-3xl shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, role or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border-none rounded-2xl text-gray-700 focus:ring-2 focus:ring-[#007BFF] transition-all outline-hidden text-sm sm:text-base shadow-inner"
              />
            </div>

            {/* Price Type Filters */}
            <div className="flex bg-[#F8FAFC] p-1.5 rounded-2xl w-full md:w-auto shadow-inner">
              {["all", "free", "paid"].map((type) => (
                <button
                  key={type}
                  onClick={() => setPriceFilter(type)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                    priceFilter === type
                      ? "bg-white text-[#007BFF] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Price Range Dropdown (Only when 'paid' is selected) */}
            {priceFilter === "paid" && (
              <div className="relative w-full md:w-48 animate-in fade-in slide-in-from-top-2 duration-300">
                <IndianRupee
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#007BFF]"
                  size={16}
                />
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3.5 bg-[#F8FAFC] border-none rounded-2xl text-gray-700 focus:ring-2 focus:ring-[#007BFF] transition-all outline-hidden text-sm font-bold shadow-inner cursor-pointer appearance-none"
                >
                  <option value={500}>Under ₹500</option>
                  <option value={1000}>Under ₹1000</option>
                  <option value={2000}>Under ₹2000</option>
                  <option value={5000}>Any Price</option>
                </select>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
            <Filter size={12} />
            Showing {filteredConsultants.length} of {consultants.length} mentors
          </div>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {Array.isArray(filteredConsultants) &&
        filteredConsultants.length > 0 ? (
          filteredConsultants.map((c) => (
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
                <div className="w-24 h-24 rounded-full p-1 bg-linear-to-tr from-[#00D4FF] to-[#1E3A8A]">
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

              <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                {c.bio}
              </p>

              <div className="w-full pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <div className="flex flex-col items-start gap-1">
                  <span className="flex items-center gap-1 text-[#1E3A8A] bg-blue-50 px-3 py-1.5 rounded-xl text-xs font-bold">
                    <User size={12} /> {c.experience}
                  </span>
                  <span className="text-sm font-bold text-gray-700 ml-1">
                    {c.price > 0 ? (
                      `₹${c.price}`
                    ) : (
                      <span className="text-green-600 font-extrabold">
                        FREE
                      </span>
                    )}
                  </span>
                </div>
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
              <Search size={48} className="text-blue-400 opacity-50" />
            </div>
            <p className="text-lg font-medium leading-relaxed">
              No mentors found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
              }}
              className="text-[#007BFF] font-bold underline"
            >
              Clear all filters
            </button>
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
