import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  FaCreditCard,
  FaCalendar,
  FaVideo,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaRocket,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "./History.css";
import PageLoader from "../../../components/PageLoader/PageLoader";
import { useAuth } from "../../../context/AuthContext";

const StudentHistory = () => {
  const [receiptUrl, setReceiptUrl] = useState(null);
  const [receiptStatus, setReceiptStatus] = useState(null);
  const [premiumPlan, setPremiumPlan] = useState(null);
  const [premiumExpiresAt, setPremiumExpiresAt] = useState(null);
  const [premiumStartDate, setPremiumStartDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalImg, setModalImg] = useState(null);

  const [counsellingBookings, setCounsellingBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("payment");
  const [activeMeetings, setActiveMeetings] = useState(new Set());

  const navigate = useNavigate();
  const { user } = useAuth();

  const API = import.meta.env.VITE_API_URL;

  const fetchReceipt = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/user/${user.email}`);
      const data = await res.json();

      if (res.ok) {
        if (data.receiptStatus === "denied") {
          await fetch(`${API}/api/user/delete-receipt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });
          setReceiptUrl(null);
          setReceiptStatus(null);
        } else {
          setReceiptUrl(data.receiptUrl);
          setReceiptStatus(data.receiptStatus);
          setPremiumPlan(data.premiumPlan);
          setPremiumExpiresAt(data.premiumExpiresAt);
          setPremiumStartDate(
            data.premiumStartDate || data.updatedAt || data.createdAt
          );
        }
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError(
        "Failed to fetch receipt. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  }, [user?.email, API]);

  const fetchCounsellingBookings = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/bookings/counselling/${user.email}`);
      const data = await res.json();
      if (res.ok) {
        setCounsellingBookings(data.bookings || []);
      }
    } catch (err) {
      console.error("Error fetching counselling bookings:", err);
    }
  }, [user?.email, API]);

  useEffect(() => {
    if (user?.email) {
      fetchReceipt();
      fetchCounsellingBookings();
    } else {
      setLoading(false);
    }
  }, [fetchCounsellingBookings, fetchReceipt, user?.email]);

  useEffect(() => {
    const webrtcServerUrl =
      import.meta.env.VITE_WEBRTC_SERVER_URL || "http://localhost:5001";
    const socket = io(webrtcServerUrl);

    socket.on("call-started", ({ sessionId }) => {
      setActiveMeetings((prev) => new Set(prev).add(sessionId));
    });

    socket.on("call-ended", ({ sessionId }) => {
      setActiveMeetings((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sessionId);
        return newSet;
      });
    });

    return () => socket.disconnect();
  }, []);

  const formatDate = (date) => {
    const parsed = new Date(date);
    if (parsed.toString() === "Invalid Date") return "N/A";
    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateTime) => {
    const parsed = new Date(dateTime);
    if (parsed.toString() === "Invalid Date") return "N/A";
    return parsed.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDaysLeft = () => {
    if (!premiumExpiresAt) return null;
    const now = new Date();
    const end = new Date(premiumExpiresAt);
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const getPlanLabel = (key) => {
    switch (key) {
      case "1month":
        return "1 Month Elite";
      case "2months":
        return "2 Months Elite";
      case "3months":
        return "3 Months Elite";
      default:
        return "Premium Membership";
    }
  };

  // Generate unique color for consultant
  const getAvatarColor = (email) => {
    if (!email) return "#6366f1";
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "#6366f1",
      "#8b5cf6",
      "#ec4899",
      "#3b82f6",
      "#06b6d4",
      "#10b981",
      "#f59e0b",
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) return <PageLoader />;

  return (
    <div className="history-page-container">
      <div className="history-max-width">
        {/* Header */}
        <header className="history-header-v4">
          <div className="history-header-content">
            <div>
              <h1 className="history-title-v4">
                <FaRocket className="title-icon-v4" />
                History & Logs
              </h1>
              <p className="history-subtitle-v4">
                Track your premium subscriptions and scheduled career
                masterclasses in one place.
              </p>
            </div>
          </div>
        </header>

        {/* Segmented Tabs */}
        <div className="history-tabs-v4">
          <button
            onClick={() => setActiveTab("payment")}
            className={`tab-btn-v4 ${activeTab === "payment" ? "active" : ""}`}
          >
            <FaCreditCard /> Payments
          </button>
          <button
            onClick={() => setActiveTab("counselling")}
            className={`tab-btn-v4 ${
              activeTab === "counselling" ? "active" : ""
            }`}
          >
            <FaVideo /> Classes & Masterclasses
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content-v4">
          {activeTab === "payment" && (
            <>
              {error ? (
                <div className="error-state-modern">
                  <p>{error}</p>
                </div>
              ) : receiptUrl ? (
                <div className="payment-card-v4">
                  <div className="payment-card-header-v4">
                    <h3>Elite Subscription</h3>
                    <span
                      className={`badge-v4 ${
                        receiptStatus === "approved" ? "approved" : "pending"
                      }`}
                    >
                      {receiptStatus === "approved" ? "Active" : "Processing"}
                    </span>
                  </div>

                  <div className="payment-info-grid-v4">
                    <div className="info-item-v4">
                      <span className="label">Plan</span>
                      <span className="value">{getPlanLabel(premiumPlan)}</span>
                    </div>
                    <div className="info-item-v4">
                      <span className="label">Started</span>
                      <span className="value">
                        {formatDate(premiumStartDate)}
                      </span>
                    </div>
                    <div className="info-item-v4">
                      <span className="label">Renewal Date</span>
                      <span className="value">
                        {formatDate(premiumExpiresAt)}
                      </span>
                    </div>
                    <div className="info-item-v4">
                      <span className="label">Remaining</span>
                      <span className="value highlight">
                        {getDaysLeft()} Days
                      </span>
                    </div>
                  </div>

                  <div className="receipt-section-v4">
                    <div className="receipt-preview-v4">
                      <img
                        src={receiptUrl}
                        alt="Receipt"
                        className="receipt-img-h"
                        onClick={() => setModalImg(receiptUrl)}
                      />
                      <div className="receipt-meta">
                        <span
                          style={{
                            display: "block",
                            fontWeight: "700",
                            fontSize: "14px",
                          }}
                        >
                          Payment Proof
                        </span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "var(--text-sub-h)",
                          }}
                        >
                          Click to enlarge image
                        </span>
                      </div>
                    </div>
                    <button
                      className="view-btn-v4"
                      onClick={() => setModalImg(receiptUrl)}
                    >
                      <FaEye /> Full Preview
                    </button>
                  </div>
                </div>
              ) : (
                <div className="empty-state-v4">
                  <FaCreditCard className="empty-icon-v4" />
                  <h3>No Transactions</h3>
                  <p>Your payment history will appear here once you upgrade.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "counselling" && (
            <div className="sessions-grid-v4">
              {counsellingBookings.length > 0 ? (
                counsellingBookings.map((booking) => {
                  const bookingDateTime = new Date(
                    `${booking.date} ${booking.time}`
                  );
                  const now = new Date();
                  const timeDiffMinutes = (bookingDateTime - now) / (1000 * 60);
                  const isMeetingActive = activeMeetings.has(booking._id);
                  const canJoin =
                    (timeDiffMinutes <= 5 && timeDiffMinutes >= -60) ||
                    isMeetingActive;
                  const sessionEnded = timeDiffMinutes < -60;
                  const consultantImg =
                    booking.consultantProfileImage || booking.consultantPfp;

                  return (
                    <div key={booking._id} className="session-card-v4">
                      <div className="session-header-v4">
                        {consultantImg ? (
                          <img
                            src={consultantImg}
                            alt=""
                            className="session-pfp-v4"
                          />
                        ) : (
                          <div
                            className="session-pfp-placeholder-v4"
                            style={{
                              backgroundColor: getAvatarColor(
                                booking.consultantEmail
                              ),
                            }}
                          >
                            {getInitials(booking.consultantName)}
                          </div>
                        )}
                        <div className="session-header-info-v4">
                          <h4>
                            {booking.consultantName ||
                              booking.teacherName ||
                              "Expert"}
                          </h4>
                          <span
                            style={{
                              fontSize: "10px",
                              color: "var(--text-sub-h)",
                              background: "#f1f5f9",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              textTransform: "uppercase",
                              fontWeight: "800",
                            }}
                          >
                            {booking.bookingType === "teacher"
                              ? "Class"
                              : "Consultation"}
                          </span>
                        </div>
                        <span className={`badge-v4 ${booking.status}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="session-body-v4">
                        <div
                          className="session-details-row mb-3"
                          style={{
                            borderBottom: "1px solid #f1f5f9",
                            paddingBottom: "8px",
                          }}
                        >
                          <p style={{ fontSize: "13px", margin: "0" }}>
                            <b style={{ color: "#475569" }}>Student:</b>{" "}
                            <span
                              style={{ color: "#2563eb", fontWeight: "bold" }}
                            >
                              {booking.userName || user?.name}
                            </span>
                          </p>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#64748b",
                              fontStyle: "italic",
                              margin: "2px 0 0 0",
                            }}
                          >
                            {booking.consultantId?.expertise ||
                              "Professional Mentoring"}
                          </p>
                        </div>
                        <div className="session-time-row-v4">
                          <div className="time-item-v4">
                            <FaCalendar /> {formatDate(booking.date)}
                          </div>
                          <div className="time-item-v4">
                            <FaClock /> {booking.time}
                          </div>
                          {booking.classMode && (
                            <div className="time-item-v4 capitalize">
                              <FaChalkboardTeacher /> {booking.classMode}
                            </div>
                          )}
                        </div>

                        <div
                          style={{
                            fontSize: "10px",
                            color: "var(--text-sub-h)",
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>
                            Registered: {formatDateTime(booking.createdAt)}
                          </span>
                          <span>ID: {booking._id?.slice(-6)}</span>
                        </div>

                        {booking.status === "accepted" && !sessionEnded ? (
                          <div style={{ marginTop: "16px" }}>
                            {canJoin ? (
                              <button
                                onClick={() =>
                                  navigate(`/video-call/${booking._id}`, {
                                    state: { booking },
                                  })
                                }
                                className="join-btn-v4 active"
                                style={{
                                  width: "100%",
                                  background:
                                    "linear-gradient(135deg, #2563eb, #1e40af)",
                                  boxShadow:
                                    "0 4px 12px rgba(37, 99, 235, 0.3)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "8px",
                                  padding: "12px",
                                  borderRadius: "10px",
                                  color: "white",
                                  fontWeight: "bold",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <FaVideo /> Start Zoom Meeting
                              </button>
                            ) : (
                              <div
                                style={{
                                  backgroundColor: "#fff7ed",
                                  color: "#c2410c",
                                  fontSize: "11px",
                                  padding: "10px",
                                  borderRadius: "8px",
                                  border: "1px solid #ffedd5",
                                  textAlign: "center",
                                }}
                              >
                                ⏳ Link becomes active 5 mins before start
                              </div>
                            )}
                          </div>
                        ) : sessionEnded ? (
                          <div
                            className="join-btn-v4 disabled mt-3"
                            style={{
                              background: "#f8fafc",
                              color: "#64748b",
                              justifyContent: "center",
                            }}
                          >
                            <FaCheckCircle style={{ color: "#10b981" }} />{" "}
                            Completed
                          </div>
                        ) : (
                          <div
                            className="join-btn-v4 disabled mt-3"
                            style={{
                              background: "#f0f9ff",
                              color: "#0369a1",
                              justifyContent: "center",
                              flexDirection: "column",
                              padding: "15px",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <FaClock /> Awaiting Confirmation
                            </div>
                            <span
                              style={{
                                fontSize: "9px",
                                opacity: 0.7,
                                marginTop: "4px",
                              }}
                            >
                              Consultant must accept this booking to enable
                              video call
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  className="empty-state-v4"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <FaVideo className="empty-icon-v4" />
                  <h3>No Sessions</h3>
                  <p>
                    Book your first masterclass with an industry expert today.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {modalImg && (
          <div className="modal-overlay-h" onClick={() => setModalImg(null)}>
            <div
              className="modal-content-h"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-h"
                onClick={() => setModalImg(null)}
              >
                ✕
              </button>
              <img src={modalImg} alt="Receipt" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHistory;
