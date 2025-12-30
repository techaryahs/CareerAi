import React, { useEffect, useState } from "react";
import {
    FaCalendarAlt,
    FaPlus,
    FaUserTie,
    FaClock,
    FaHistory,
} from "react-icons/fa";
import axios from "axios";
import {useAuth } from "../../../../../context/AuthContext";
const UpcomingConsultations = () => {
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} =useAuth();
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchBookings();
    }, [user]);

    const fetchBookings = async () => {
        try {
            if (!user?.email) return setLoading(false);

            const res = await axios.get(`${API}/api/bookings/user/${user.email}`);
            const now = new Date();

            setUpcomingBookings(
                res.data
                    .filter((b) => new Date(`${b.date} ${b.time}`) >= now)
                    .slice(0, 3)
            );

            setPastBookings(
                res.data
                    .filter((b) => new Date(`${b.date} ${b.time}`) < now)
                    .slice(0, 3)
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 animate-fadeIn">
            {/* HEADER */}
            <div className="px-2 py-3 flex items-center gap-5">
                <h2 className="text-lg font-semibold whitespace-nowrap">
                    Your Consultations
                </h2>

                <button
                    className="w-8 h-8  flex items-center justify-center
               bg-blue-600 text-white rounded-lg
               hover:bg-blue-700 transition"
                >
                    +
                </button>
            </div>

            {/* SPLIT LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* UPCOMING */}
                <div className="border rounded-xl p-4">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <FaCalendarAlt className="text-green-600" />
                        Upcoming
                    </h3>

                    {loading ? (
                        <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
                    ) : upcomingBookings.length ? (
                        upcomingBookings.map((b, i) => (
                            <div
                                key={i}
                                className="border rounded-lg p-4 mb-3 hover:shadow-sm transition"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-9 flex items-center justify-center bg-gray-100 rounded-full">
                                        <FaUserTie />
                                    </div>
                                    <div>
                                        <p className="font-medium">{b.consultantName}</p>
                                        <p className="text-xs text-gray-500">
                                            {b.consultantEmail}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt /> {formatDate(b.date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaClock /> {b.time}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-6">
                            No upcoming sessions
                        </p>
                    )}
                </div>

                {/* PAST */}
                <div className="border rounded-xl p-4">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <FaHistory className="text-gray-600" />
                        Ongoing
                    </h3>

                    {loading ? (
                        <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
                    ) : pastBookings.length ? (
                        pastBookings.map((b, i) => (
                            <div
                                key={i}
                                className="border rounded-lg p-4 mb-3 bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full">
                                        <FaUserTie />
                                    </div>
                                    <div>
                                        <p className="font-medium">{b.consultantName}</p>
                                        <p className="text-xs text-gray-500">
                                            {b.consultantEmail}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt /> {formatDate(b.date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaClock /> {b.time}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-6">
                            No past sessions
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpcomingConsultations;
