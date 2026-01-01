import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const BookSlot = () => {
  const { user } = useAuth();
  const { consultantId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const consultant = location.state?.consultant;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const API = import.meta.env.VITE_API_URL;

  /* =========================
     FETCH BOOKED SLOTS
  ========================= */
  const fetchBookedSlots = useCallback(async () => {
    if (!date) return;
    try {
      const res = await axios.get(`${API}/api/bookings/booked-slots`, {
        params: { consultantId, date },
      });
      setBookedTimes(res.data.bookedTimes || []);
    } catch (err) {
      console.error("❌ Failed to fetch booked slots:", err.message);
      setBookedTimes([]);
    }
  }, [API, consultantId, date]);

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    if (!consultant) {
      navigate("/consult");
      return;
    }

    const userData = user;
    if (userData?.email) {
      setUserEmail(userData.email);
    }
  }, [consultant, navigate, user]);

  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  /* =========================
     BOOK SLOT
  ========================= */
  const handleBooking = async () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    setIsBooking(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        return;
      }

      const userData = user;
      if (!userData) {
        alert("User data not found. Please log in again.");
        return;
      }

      const payload = {
        consultantId,
        consultantEmail: consultant.email || consultant.user?.email,
        consultantName: consultant.name,
        date,
        time,
        userEmail: userData?.email,
        userId: userData?._id, // ✅ Pass student's User ID
        userPhone: userData?.mobile || userData?.phone || "Not Provided",
        userName: userData?.name || userData?.fullName || "User",
        userPlan: userData?.isPremium ? "Premium" : "Standard",
        consultantType: consultant?.isPremium ? "Premium" : "Standard",
      };

      const res = await api.post("/api/bookings/book-consultant", payload);

      alert("✅ Appointment booked successfully!");
      navigate("/history");
    } catch (err) {
      console.error("❌ Booking error:", err.response?.data || err);
      alert(err.response?.data?.message || "Slot already booked");
    } finally {
      setIsBooking(false);
    }
  };

  /* =========================
     AVAILABLE TIME SLOTS
  ========================= */
  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  /* =========================
     PAST SLOT CHECK
  ========================= */
  const isPastSlot = (slot) => {
    if (!date) return false;

    const today = new Date();
    const selected = new Date(date);

    if (today.toDateString() !== selected.toDateString()) return false;

    const [timePart, modifier] = slot.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    minutes = minutes || 0;

    const slotDate = new Date(selected);
    slotDate.setHours(hours, minutes, 0, 0);

    return slotDate <= today;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-gray-200"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Book Slot with{" "}
          <span className="text-blue-600">{consultant?.name}</span>
        </h1>
        <p className="mb-6 text-center">
          Blur Time Slots are already Booked Slots
        </p>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            📅 Select Date
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]} // 🔹 restrict to today or future
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        {/* Time Slots */}
        {date && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-3">
              ⏰ Select Time
            </label>
            <div className="flex flex-wrap gap-3 justify-center">
              {availableTimes.map((t) => {
                const disabled = bookedTimes.includes(t) || isPastSlot(t);
                return (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={t}
                    disabled={disabled}
                    onClick={() => setTime(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                      ${
                        disabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed filter blur-sm opacity-60"
                          : time === t
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
                      }`}
                  >
                    {t} {bookedTimes.includes(t) && "❌"}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Confirm Button */}
        <motion.div
          whileHover={{ scale: !isBooking ? 1.05 : 1 }}
          whileTap={{ scale: !isBooking ? 0.95 : 1 }}
          className="text-center"
        >
          <button
            onClick={handleBooking}
            disabled={isBooking}
            className={`px-6 py-2 rounded-lg font-semibold shadow-sm transition text-sm
              ${
                isBooking
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {isBooking ? "Booking..." : "✅ Confirm Appointment"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookSlot;
