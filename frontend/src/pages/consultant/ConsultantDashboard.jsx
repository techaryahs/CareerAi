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
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const consultantId = user?._id;

  // New states for Consultant Profile Status
  const [consultantStatus, setConsultantStatus] = useState("pending");
  const [rejectionReason, setRejectionReason] = useState("");
  const [consultantProfile, setConsultantProfile] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // States for Editing Profile Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editExpertise, setEditExpertise] = useState("");
  const [editExperience, setEditExperience] = useState("");
  const [editAvailability, setEditAvailability] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // States for adding availability slot
  const [newDay, setNewDay] = useState("Monday");
  const [newStart, setNewStart] = useState("09:00");
  const [newEnd, setNewEnd] = useState("17:00");

  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Fetch profile status on mount and trigger refreshes
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/auth/me");
        if (res.data.success) {
          const profile = res.data.user?.profile?.consultantProfile;
          if (profile) {
            setConsultantStatus(profile.status || "pending");
            setRejectionReason(profile.rejectionReason || "");
            setConsultantProfile(profile);
            
            // Set edit form defaults
            setEditName(res.data.user.name || "");
            setEditBio(profile.bio || "");
            setEditRole(profile.role || "");
            setEditExpertise(profile.expertise || "");
            setEditExperience(profile.experience || "");
            setEditAvailability(profile.availability || []);
            setImagePreview(profile.image || "");
          }
        }
      } catch (err) {
        console.error("Error fetching consultant profile status:", err);
      }
    };
    fetchProfile();
  }, [refreshTrigger]);

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
  }, [consultantId, user?.email, refreshTrigger]);

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
    if (consultantStatus === "disabled") {
      alert("🚫 Action Blocked: Your account has been temporarily disabled by the administrator.");
      return;
    }
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

  const handleOpenEditModal = () => {
    if (consultantProfile) {
      setEditBio(consultantProfile.bio || "");
      setEditRole(consultantProfile.role || "");
      setEditExpertise(consultantProfile.expertise || "");
      setEditExperience(consultantProfile.experience || "");
      setEditAvailability(consultantProfile.availability || []);
      setImagePreview(consultantProfile.image || "");
      setUploadFile(null);
    }
    setIsEditModalOpen(true);
  };

  const handleAddSlot = () => {
    if (!newStart || !newEnd) return;
    const newSlot = { day: newDay, startTime: newStart, endTime: newEnd };
    setEditAvailability((prev) => [...prev, newSlot]);
  };

  const handleRemoveSlot = (indexToRemove) => {
    setEditAvailability((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("name", editName);
      formData.append("bio", editBio);
      formData.append("role", editRole);
      formData.append("expertise", editExpertise);
      formData.append("experience", editExperience);
      formData.append("availability", JSON.stringify(editAvailability));
      if (uploadFile) {
        formData.append("profileImage", uploadFile);
      }

      const res = await api.post("/api/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("✅ Profile updated successfully!");
        setIsEditModalOpen(false);
        setRefreshTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      await api.delete('/api/user/delete-account');
      alert('Your account has been deleted successfully.');
      logout();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(error.response?.data?.message || 'Failed to delete account. Please try again.');
      setIsDeletingAccount(false);
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
        {/* Status Warnings Banner */}
        {consultantStatus === "pending" && (
          <div className="dashboard-banner pending-banner">
            <span className="banner-icon">⏳</span>
            <div className="banner-text">
              <strong>Application Under Review:</strong> Your consultant profile is currently pending administrator approval. You will become visible on the marketplace once approved.
              {consultantProfile?.createdAt && (
                <div style={{ marginTop: "4px", fontSize: "0.85rem", opacity: 0.8 }}>
                  Submitted on: {new Date(consultantProfile.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        {consultantStatus === "disabled" && (
          <div className="dashboard-banner disabled-banner">
            <span className="banner-icon">🚫</span>
            <div className="banner-text">
              <strong>Account Temporarily Disabled:</strong> Your account has been temporarily deactivated by the administrator. New bookings are suspended.
            </div>
          </div>
        )}
        {consultantStatus === "rejected" && (
          <div className="dashboard-banner rejected-banner">
            <div>
              <span className="banner-icon" style={{ marginRight: "8px" }}>❌</span>
              <strong>Application Rejected:</strong> Your profile application was not approved.
            </div>
            {rejectionReason && (
              <div className="rejection-reason-box">
                Reason: {rejectionReason}
              </div>
            )}
            <div className="resubmit-notice">
              Please update your profile details or availability slots below to automatically resubmit your profile for review.
            </div>
          </div>
        )}

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
            <div className="header-actions">
              <button 
                className="edit-profile-btn-modern" 
                onClick={handleOpenEditModal}
                disabled={consultantStatus === "disabled"}
                title={consultantStatus === "disabled" ? "Account disabled" : "Edit Profile"}
              >
                ⚙️ Edit Profile & Availability
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`stats-grid-modern ${consultantStatus === "disabled" ? "opacity-50" : ""}`}>
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
                      {consultantStatus === "disabled" ? (
                        <span style={{ fontSize: "0.85rem", color: "#ef4444", fontWeight: "600" }}>
                          🚫 Action Blocked (Disabled)
                        </span>
                      ) : (
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
                      )}
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

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content profile-edit-modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "1rem" }}>⚙️ Edit Profile & Availability</h2>
            <form onSubmit={handleProfileSave}>
              <div className="form-group-modern">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group-modern">
                <label>Job Title / Role</label>
                <input 
                  type="text" 
                  value={editRole} 
                  onChange={(e) => setEditRole(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group-modern">
                <label>Expertise</label>
                <input 
                  type="text" 
                  value={editExpertise} 
                  onChange={(e) => setEditExpertise(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group-modern">
                <label>Experience (e.g. 5 Years)</label>
                <input 
                  type="text" 
                  value={editExperience} 
                  onChange={(e) => setEditExperience(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group-modern">
                <label>Bio</label>
                <textarea 
                  value={editBio} 
                  onChange={(e) => setEditBio(e.target.value)} 
                  required 
                  rows={3}
                />
              </div>

              <div className="form-group-modern">
                <label>Profile Image</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {imagePreview && (
                    <img 
                      src={imagePreview.startsWith("data:") ? imagePreview : `${import.meta.env.REACT_APP_API_URL}${imagePreview}`} 
                      alt="Preview" 
                      style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} 
                    />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                </div>
              </div>

              <div className="form-group-modern">
                <label>Availability Slots</label>
                <div className="availability-list-edit">
                  {editAvailability.map((slot, index) => (
                    <div key={index} className="availability-item-edit">
                      <span>{slot.day}: {slot.startTime} - {slot.endTime}</span>
                      <button 
                        type="button" 
                        className="remove-slot-btn" 
                        onClick={() => handleRemoveSlot(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {editAvailability.length === 0 && (
                    <div style={{ color: "#6b7280", fontSize: "13px" }}>No availability slots added yet.</div>
                  )}
                </div>

                <div className="add-slot-row">
                  <select value={newDay} onChange={(e) => setNewDay(e.target.value)}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  <input 
                    type="text" 
                    value={newStart} 
                    onChange={(e) => setNewStart(e.target.value)} 
                    placeholder="09:00" 
                  />
                  <input 
                    type="text" 
                    value={newEnd} 
                    onChange={(e) => setNewEnd(e.target.value)} 
                    placeholder="17:00" 
                  />
                  <button 
                    type="button" 
                    className="add-slot-btn-icon" 
                    onClick={handleAddSlot}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="modal-actions" style={{ marginTop: "1.5rem" }}>
                <button type="submit" className="submit-btn" style={{ background: "#2563eb" }}>
                  Save Profile Settings
                </button>
                <button type="button" className="close-btn" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="close-btn" 
                  style={{ color: '#ef4444', borderColor: '#ef4444' }}
                  onClick={() => setShowDeleteAccount(true)}
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteAccount && (
        <div className="modal-overlay" style={{ zIndex: 3000 }}>
          <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Delete Account?</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '14px' }}>
              Are you sure you want to delete your account? This will permanently remove all your personal data, profile info, and settings. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowDeleteAccount(false)}
                disabled={isDeletingAccount}
                className="close-btn"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount}
                className="submit-btn"
                style={{ background: '#ef4444' }}
              >
                {isDeletingAccount ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantDashboard;
