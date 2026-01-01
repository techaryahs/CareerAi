import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";
import {
  FaCalendarCheck,
  FaHourglassHalf,
  FaCheckCircle,
  FaVideo,
  FaClock,
  FaEnvelope,
  FaChartLine,
  FaTimesCircle,
} from "react-icons/fa";
import "./ConsultantDashboard.css";

const ConsultantDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const consultantId = user?._id;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!consultantId) return;
      try {
        const res = await api.get(`/api/bookings/consultant/${consultantId}`, {
          params: { email: user?.email },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [consultantId, user?.email]);

  const bookingSummary = useMemo(() => {
    const pendingCount = bookings.filter((b) => b.status === "pending").length;
    const acceptedCount = bookings.filter(
      (b) => b.status === "accepted"
    ).length;
    const rejectedCount = bookings.filter(
      (b) => b.status === "rejected"
    ).length;
    const totalBookings = bookings.length;

    const now = new Date();
    const upcoming = bookings
      .filter((b) => {
        if (b.status !== "accepted") return false;
        const bDate = new Date(b.date);
        // If date is future, definitely upcoming
        if (bDate > now) return true;
        // If date is today, check time
        if (bDate.toDateString() === now.toDateString()) {
          // Basic time check (e.g. "10:00 AM")
          // For simplicity, if it's today and accepted, we'll keep it as upcoming for now
          return true;
        }
        return false;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      totalBookings,
      pendingCount,
      acceptedCount,
      rejectedCount,
      upcoming,
    };
  }, [bookings]);

  const updateBookingStatus = async (id, action) => {
    try {
      const res = await api.put(`/api/bookings/${id}/${action}`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: res.data.booking.status } : b
        )
      );
    } catch (err) {
      console.error(
        "Error updating booking:",
        err.response?.data || err.message
      );
      alert("Failed to update booking");
    }
  };

  if (loading) {
    return (
      <div className="loading-container-modern">
        <div className="spinner-modern"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="consultant-dashboard-modern">
      <div className="dashboard-max-width">
        {/* Modern Header with Gradient */}
        <div className="dashboard-header-modern">
          <div className="header-content-modern">
            <div>
              <h1 className="dashboard-title-modern">
                <FaChartLine className="title-icon" />
                Consultant Dashboard
              </h1>
              <p className="dashboard-subtitle-modern">
                Welcome back, {user?.name || "Consultant"}! Manage your
                appointments and sessions.
              </p>
              <p className="text-[10px] text-gray-400 opacity-50">
                Debug ID: {user?._id}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid-modern">
          <div className="stat-card-modern total">
            <div className="stat-icon-wrapper">
              <FaCalendarCheck />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total Bookings</span>
              <span className="stat-value">{bookingSummary.totalBookings}</span>
            </div>
          </div>

          <div className="stat-card-modern pending">
            <div className="stat-icon-wrapper">
              <FaHourglassHalf />
            </div>
            <div className="stat-content">
              <span className="stat-label">Pending</span>
              <span className="stat-value">{bookingSummary.pendingCount}</span>
            </div>
          </div>

          <div className="stat-card-modern accepted">
            <div className="stat-icon-wrapper">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <span className="stat-label">Accepted</span>
              <span className="stat-value">{bookingSummary.acceptedCount}</span>
            </div>
          </div>

          <div className="stat-card-modern rejected">
            <div className="stat-icon-wrapper">
              <FaTimesCircle />
            </div>
            <div className="stat-content">
              <span className="stat-label">Rejected</span>
              <span className="stat-value">{bookingSummary.rejectedCount}</span>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="section-modern">
          <h2 className="section-title-modern">
            <FaClock /> Upcoming Appointments
          </h2>
          {bookingSummary.upcoming.length > 0 ? (
            <div className="upcoming-grid-modern">
              {bookingSummary.upcoming.slice(0, 4).map((booking) => (
                <div key={booking._id} className="upcoming-card-modern">
                  <div className="upcoming-date-badge">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="upcoming-info">
                    <div className="upcoming-user">
                      <FaEnvelope className="info-icon" />
                      <span>{booking.userEmail}</span>
                    </div>
                    <div className="upcoming-time">
                      <FaClock className="info-icon" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <button
                    className="join-upcoming-btn"
                    onClick={() =>
                      navigate(`/video-call/${booking._id}`, {
                        state: { booking },
                      })
                    }
                  >
                    <FaVideo /> Join Call
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-modern">
              <FaClock className="empty-icon" />
              <h3>No Upcoming Appointments</h3>
              <p>You don't have any scheduled appointments</p>
            </div>
          )}
        </div>

        {/* Pending Requests */}
        {bookings.filter((b) => b.status === "pending").length > 0 && (
          <div className="section-modern">
            <h2 className="section-title-modern">
              <FaHourglassHalf className="text-amber-500" /> Pending Approval
            </h2>
            <div className="bookings-grid-modern">
              {bookings
                .filter((b) => b.status === "pending")
                .map((booking) => (
                  <div key={booking._id} className="booking-card-modern">
                    <div className="booking-card-header">
                      <div className="booking-date-info">
                        <span className="booking-date">
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                        <span className="booking-time">{booking.time}</span>
                      </div>
                      <span className="status-badge-modern pending">
                        ⏳ New
                      </span>
                    </div>
                    <div className="booking-card-body">
                      <div className="booking-user-info">
                        <FaEnvelope /> <span>{booking.userEmail}</span>
                      </div>
                      <div className="action-buttons-group">
                        <button
                          className="action-btn accept"
                          onClick={() =>
                            updateBookingStatus(booking._id, "accept")
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="action-btn reject"
                          onClick={() =>
                            updateBookingStatus(booking._id, "reject")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Confirmed Sessions */}
        <div className="section-modern">
          <h2 className="section-title-modern">
            <FaCheckCircle className="text-green-500" /> Confirmed Sessions
          </h2>
          {bookings.filter((b) => b.status === "accepted").length > 0 ? (
            <div className="bookings-grid-modern">
              {bookings
                .filter((b) => b.status === "accepted")
                .map((booking) => {
                  const bookingDateTime = new Date(
                    `${booking.date} ${booking.time}`
                  );
                  const isFuture = bookingDateTime >= new Date();
                  return (
                    <div key={booking._id} className="booking-card-modern">
                      <div className="booking-card-header">
                        <div className="booking-date-info">
                          <span className="booking-date">
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                          <span className="booking-time">{booking.time}</span>
                        </div>
                        <span className="status-badge-modern accepted">
                          Confirmed
                        </span>
                      </div>
                      <div className="booking-card-body">
                        <div className="booking-user-info">
                          <FaEnvelope /> <span>{booking.userEmail}</span>
                        </div>
                        {isFuture ? (
                          <button
                            className="action-btn video-call"
                            onClick={() =>
                              navigate(`/video-call/${booking._id}`, {
                                state: { booking },
                              })
                            }
                          >
                            <FaVideo /> Join Call
                          </button>
                        ) : (
                          <span className="session-ended">
                            <FaCheckCircle /> Completed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="empty-state-modern">
              <p>No confirmed sessions yet.</p>
            </div>
          )}
        </div>

        {/* History */}
        {bookings.filter((b) => b.status === "rejected").length > 0 && (
          <div className="section-modern">
            <h2 className="section-title-modern">
              <FaTimesCircle className="text-red-500" /> Rejected Bookings
            </h2>
            <div className="bookings-grid-modern">
              {bookings
                .filter((b) => b.status === "rejected")
                .map((booking) => (
                  <div
                    key={booking._id}
                    className="booking-card-modern opacity-60"
                  >
                    <div className="booking-user-info">
                      <FaEnvelope /> <span>{booking.userEmail}</span>
                      <span className="ml-auto">
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const isPast = (date, time) => {
  if (!date || !time) return false;
  try {
    const bookingDate = new Date(`${date} ${time}`);
    const now = new Date();
    return bookingDate < now;
  } catch (e) {
    return false;
  }
};

export default ConsultantDashboard;
