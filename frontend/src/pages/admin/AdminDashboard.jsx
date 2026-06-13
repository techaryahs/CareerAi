import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [usersWithReceipts, setUsersWithReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImg, setModalImg] = useState(null);
  const [apiKeyModal, setApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const navigate = useNavigate();

  // ✅ NEW: Activity Stats Logic
  const [activityStats, setActivityStats] = useState(null);
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    // Only fetch for specific admins

    fetchActivityStats();
    const interval = setInterval(fetchActivityStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchActivityStats = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/activity/stats`);
      const data = await res.json();
      setActivityStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };


  const { user, logout } = useAuth();

  const fetchUsersWithReceipts = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/receipts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      setUsersWithReceipts(data.users || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };




  const handleApiKeySubmit = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/save-api-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ apiKey: apiKeyInput })
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ API key saved successfully');
        setApiKeyModal(false);
        setApiKeyInput('');
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Error saving API key:', err);
      alert('Error saving API key');
    }
  };


  const handleApprove = async (email, plan) => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ email, plan })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Approved ${email} as premium`);
        fetchUsersWithReceipts();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Approval error:', err);
      alert('Error approving user');
    }
  };

  const handleDeny = async (email) => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/deny`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`🚫 Denied premium access for ${email}`);
        fetchUsersWithReceipts();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Deny error:', err);
      alert('Error denying user');
    }
  };

  const handleLogout = () => {
    setLogoutModal(false);
    logout();
  };

  const pendingReceipts = usersWithReceipts.filter(u => u.receiptStatus === 'pending');
  const approvedReceipts = usersWithReceipts.filter(u => u.receiptStatus === 'approved');

  return (
    <div className="admin-dashboard mt-15">
      <header className="admin-header">
        <h1>👑 Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="blog-posting-btn" onClick={() => navigate('/admin-dashboard/blog-posting')}>Blog Posting</button>
          <button
            className="logout-btn"
            onClick={() => setLogoutModal(true)}
          >
            Logout
          </button>

          <button
            className="apikey-btn"
            onClick={() => setApiKeyModal(true)}
          >
            API Key
          </button>

          <button
            onClick={() => navigate("/admin/coupons")}
            style={{
              background: "#7c3aed",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            🎟️ Coupon Management
          </button>
        </div>
      </header>

      <main className="admin-content">

        {/* 📊 ACTIVITY STATS SECTION */}
        {/* 📊 ACTIVITY STATS SECTION */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full"></span> Live Activity
          </h2>

          {activityStats ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {/* Online Now */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm">
                <h3 className="text-sm font-semibold text-green-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online Now
                </h3>
                <p className="text-3xl font-bold text-green-600 my-1">{activityStats.onlineCount}</p>
                <p className="text-xs text-green-700 opacity-70">Active in last 5 mins</p>
              </div>

              {/* Last 24 Hours */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 shadow-sm">
                <h3 className="text-sm font-semibold text-amber-800">🕒 Last 24 Hours</h3>
                <p className="text-3xl font-bold text-amber-500 my-1">{activityStats.active24h}</p>
                <p className="text-xs text-amber-700 opacity-70">Active users</p>
              </div>

              {/* Last 7 Days */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="text-sm font-semibold text-blue-800">📅 Last 7 Days</h3>
                <p className="text-3xl font-bold text-blue-500 my-1">{activityStats.active7d}</p>
                <p className="text-xs text-blue-700 opacity-70">Active users</p>
              </div>

              {/* Last 30 Days */}
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 shadow-sm">
                <h3 className="text-sm font-semibold text-purple-800">🗓️ Last 30 Days</h3>
                <p className="text-3xl font-bold text-purple-500 my-1">{activityStats.active30d}</p>
                <p className="text-xs text-purple-700 opacity-70">Active users</p>
              </div>

              {/* Total Sessions */}
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm">
                <h3 className="text-sm font-semibold text-red-800">📈 Total Sessions</h3>
                <p className="text-3xl font-bold text-red-500 my-1">{activityStats.totalSessions}</p>
                <p className="text-xs text-red-700 opacity-70">Lifetime records</p>
              </div>

              {/* User Roles */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800">👥 User Roles</h3>
                <div className="mt-2 space-y-1">
                  {activityStats.roleStats?.map(stat => (
                    <div key={stat._id} className="flex justify-between text-xs font-medium">
                      <span className="capitalize text-slate-500">{stat._id}:</span>
                      <span className="text-slate-900">{stat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-pulse text-slate-400">Loading live stats...</div>
          )}
        </section>

        {/* 👤 START: DETAILED USER STATS */}
        <UserVisitStats />
        {/* 👤 END: DETAILED USER STATS */}

        {/* 🩺 START: CONSULTANT MANAGEMENT */}
        <ConsultantManagement />
        {/* 🩺 END: CONSULTANT MANAGEMENT */}

        {/* 🏷️ START: PRICING MANAGEMENT */}
        <PricingManagement />
        {/* 🏷️ END: PRICING MANAGEMENT */}


        <section className="admin-section">
          <h2>📥 Pending Receipts</h2>
          {loading ? (
            <p>Loading...</p>
          ) : pendingReceipts.length === 0 ? (
            <p>No pending receipts found.</p>
          ) : (
            <div className="receipt-grid">
              {pendingReceipts.map((u) => (
                <div key={u._id} className="receipt-card pending">
                  <img src={u.receiptUrl} alt="Receipt" className="receipt-img" onClick={() => setModalImg(u.receiptUrl)} />
                  <p><strong>{u.name}</strong></p>
                  <p>{u.email}</p>
                  <p>Status: <strong>⏳ Pending</strong></p>
                  <p><small>Uploaded: {new Date(u.updatedAt).toLocaleString()}</small></p>
                  <div className="action-buttons">
                    <button className="accept-btn" onClick={() => handleApprove(u.email, '1month')}>✅ Approve 1M</button>
                    <button className="accept-btn" onClick={() => handleApprove(u.email, '2months')}>✅ Approve 2M</button>
                    <button className="accept-btn" onClick={() => handleApprove(u.email, '3months')}>✅ Approve 3M</button>
                    <button className="deny-btn" onClick={() => handleDeny(u.email)}>🚫 Deny</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="admin-section">
          <h2>✅ Approved Receipts</h2>
          {approvedReceipts.length === 0 ? (
            <p>No approved receipts found.</p>
          ) : (
            <div className="receipt-grid">
              {approvedReceipts.map((u) => (
                <div key={u._id} className="receipt-card approved">
                  <img src={u.receiptUrl} alt="Approved Receipt" className="receipt-img" onClick={() => setModalImg(u.receiptUrl)} />
                  <p><strong>{u.name}</strong></p>
                  <p>{u.email}</p>
                  <p>Status: <strong>✅ Approved</strong></p>
                  <p><small>Updated: {new Date(u.updatedAt).toLocaleString()}</small></p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <div className="modal-content">
            <img src={modalImg} alt="Full Receipt" />
            <button onClick={() => setModalImg(null)} className="close-modal">✖</button>
          </div>
        </div>
      )}
      {apiKeyModal && (
        <div className="modal-overlay" onClick={() => setApiKeyModal(false)}>
          <div className="modal-content api-key-modal" onClick={(e) => e.stopPropagation()}>
            <h3>🔑 Enter API Key</h3>
            <input
              type="text"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Your API Key"
            />
            <div className="modal-actions">
              <button className="submit-btn" onClick={handleApiKeySubmit}>Submit</button>
              <button className="close-btn" onClick={() => setApiKeyModal(false)}>X</button>
            </div>
          </div>
        </div>
      )}

      {logoutModal && (
        <div
          className="modal-overlay"
          onClick={() => setLogoutModal(false)}
        >
          <div
            className="modal-content logout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>⚠️ Confirm Logout</h3>

            <p style={{ margin: "15px 0" }}>
              Are you sure you want to logout?
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Yes, Logout
              </button>

              <button
                onClick={() => setLogoutModal(false)}
                style={{
                  background: "#e5e7eb",
                  color: "#111827",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;

// ---------------------------------------------------------------------
// 👤 SUB-COMPONENT: User Visit Stats Table
// ---------------------------------------------------------------------
const UserVisitStats = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterTime, setFilterTime] = useState('all'); // 'all', '5min', '24h', '7d', '30d'
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/activity/user-stats`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch user stats", error);
    }
  };

  // Filter Logic
  const filteredUsers = users.filter(u => {
    // Role Filter
    if (filterRole !== 'all' && u.role !== filterRole) return false;

    // Time Filter
    if (filterTime === 'all') return true;

    const lastActive = new Date(u.lastActive).getTime();
    const now = Date.now();
    let timeLimit = 0;

    switch (filterTime) {
      case '5min': timeLimit = 5 * 60 * 1000; break;
      case '24h': timeLimit = 24 * 60 * 60 * 1000; break;
      case '7d': timeLimit = 7 * 24 * 60 * 60 * 1000; break;
      case '30d': timeLimit = 30 * 24 * 60 * 60 * 1000; break;
      default: return true;
    }

    return (now - lastActive) <= timeLimit;
  });

  // Calculate Repeated Users (Frequency > 1)
  const repeatedUserCount = filteredUsers.filter(u => u.visitCount > 1).length;

  return (
    <section className="admin-section" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>👤 Detailed User Activity</h2>
          <span style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
            Repeated Users: <strong>{repeatedUserCount}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {/* TIME FILTER */}
          <select
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="all">All Time</option>
            <option value="5min">Last 5 Mins</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>

          {/* ROLE FILTER */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="consultant">Consultant</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Total Visits</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice(0, displayCount).map((u, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>
                  <strong>{u.name || "Unknown"}</strong><br />
                  <small style={{ color: '#666' }}>{u.email}</small>
                </td>
                <td style={{ padding: '12px', textTransform: 'capitalize' }}>
                  <span className={`badge ${u.role}`}>{u.role}</span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                  {u.visitCount}
                </td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#666' }}>
                  {new Date(u.lastActive).toLocaleString()}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>No users found for this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length > displayCount && (
        <button
          onClick={() => setDisplayCount(prev => prev + 20)}
          style={{ marginTop: '1rem', width: '100%', padding: '10px', background: '#f1f1f1', border: 'none', cursor: 'pointer' }}
        >
          Show More
        </button>
      )}
    </section>
  );
};

// ---------------------------------------------------------------------
// 🩺 SUB-COMPONENT: Consultant Management
// ---------------------------------------------------------------------
const ConsultantManagement = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editPriceValue, setEditPriceValue] = useState('');

  // Rejection modal state
  const [rejectionModal, setRejectionModal] = useState({ open: false, consultantId: null, reason: '' });

  const fetchConsultants = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/consultants`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setConsultants(data.consultants || []);
      }
    } catch (err) {
      console.error('Failed to fetch consultants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  const handleStatusUpdate = async (id, status, reason = '') => {
    try {
      const body = { status };
      if (status === 'rejected') {
        body.reason = reason;
      }
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/consultants/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Status updated to ${status}`);
        fetchConsultants();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Error updating consultant status:', err);
      alert('Error updating status');
    }
  };

  const handlePriceUpdate = async (id, price) => {
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0 || numPrice > 50000) {
      alert('❌ Price must be between ₹0 and ₹50,000');
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/consultants/${id}/price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ price: numPrice })
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Price updated successfully');
        setEditingPriceId(null);
        fetchConsultants();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Error updating consultant price:', err);
      alert('Error updating price');
    }
  };

  const startEditingPrice = (consultant) => {
    setEditingPriceId(consultant._id);
    setEditPriceValue(consultant.price);
  };

  const openRejectionModal = (id) => {
    setRejectionModal({ open: true, consultantId: id, reason: '' });
  };

  const submitRejection = () => {
    if (!rejectionModal.reason.trim()) {
      alert('Please specify a rejection reason');
      return;
    }
    handleStatusUpdate(rejectionModal.consultantId, 'rejected', rejectionModal.reason);
    setRejectionModal({ open: false, consultantId: null, reason: '' });
  };

  // Group pending at the top of the list, then sort by name
  const getSortedAndFilteredConsultants = () => {
    let list = [...consultants];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(c =>
        (c.name && c.name.toLowerCase().includes(term)) ||
        (c.role && c.role.toLowerCase().includes(term)) ||
        (c.expertise && c.expertise.toLowerCase().includes(term))
      );
    }

    // Filter by status dropdown
    if (statusFilter !== 'all') {
      list = list.filter(c => c.status === statusFilter);
    }

    // Sort: Pending status first, then by name
    list.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return (a.name || '').localeCompare(b.name || '');
    });

    return list;
  };

  const sortedFiltered = getSortedAndFilteredConsultants();

  // Compute counters
  const counts = {
    pending: consultants.filter(c => c.status === 'pending').length,
    approved: consultants.filter(c => c.status === 'approved').length,
    disabled: consultants.filter(c => c.status === 'disabled').length,
    rejected: consultants.filter(c => c.status === 'rejected').length,
  };

  return (
    <section className="admin-section" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>🩺 Consultant Management</h2>
        </div>
      </div>

      {/* Counters Header */}
      <div className="consultant-stats-grid">
        <div className="consultant-stat-card stat-pending">
          <h4>⏳ Pending Approval</h4>
          <p>{counts.pending}</p>
        </div>
        <div className="consultant-stat-card stat-approved">
          <h4>✅ Approved</h4>
          <p>{counts.approved}</p>
        </div>
        <div className="consultant-stat-card stat-disabled">
          <h4>🚫 Disabled</h4>
          <p>{counts.disabled}</p>
        </div>
        <div className="consultant-stat-card stat-rejected">
          <h4>❌ Rejected</h4>
          <p>{counts.rejected}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="search-filter-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name, role or expertise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #ccc', minWidth: '250px' }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
          style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="disabled">Disabled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* List / Table */}
      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        {loading ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Loading consultants...</p>
        ) : sortedFiltered.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>No consultants found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left' }}>Consultant</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Expertise & Role</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Booking Fee</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedFiltered.map((c) => (
                <tr key={c._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={c.image || 'https://via.placeholder.com/40'}
                        alt={c.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <strong>{c.name || 'No Name'}</strong><br />
                        <small style={{ color: '#666' }}>{c.user?.email || c.email}</small>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <strong>{c.role || 'No Role'}</strong><br />
                    <span style={{ fontSize: '0.85rem', color: '#1d4ed8', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                      {c.expertise || 'General'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span className={`status-badge ${c.status}`}>
                      {c.status}
                    </span>
                    {c.status === 'rejected' && c.rejectionReason && (
                      <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px', maxWidth: '200px', margin: '4px auto 0' }}>
                        Reason: {c.rejectionReason}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {editingPriceId === c._id ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '0.9rem' }}>₹</span>
                        <input
                          type="number"
                          value={editPriceValue}
                          onChange={(e) => setEditPriceValue(e.target.value)}
                          style={{ width: '80px', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <button
                          onClick={() => handlePriceUpdate(c._id, editPriceValue)}
                          style={{ border: 'none', background: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                          title="Save Price"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          style={{ border: 'none', background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                          title="Cancel"
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span>₹{c.price ?? 0}</span>
                        <button
                          onClick={() => startEditingPrice(c)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#1d4ed8', fontSize: '0.85rem' }}
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      {c.status === 'pending' && (
                        <>
                          <button
                            className="action-btn approve-btn"
                            onClick={() => handleStatusUpdate(c._id, 'approved')}
                          >
                            Approve
                          </button>
                          <button
                            className="action-btn reject-btn"
                            onClick={() => openRejectionModal(c._id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {c.status === 'approved' && (
                        <button
                          className="action-btn disable-btn"
                          onClick={() => handleStatusUpdate(c._id, 'disabled')}
                        >
                          Disable
                        </button>
                      )}
                      {c.status === 'disabled' && (
                        <button
                          className="action-btn enable-btn"
                          onClick={() => handleStatusUpdate(c._id, 'approved')}
                        >
                          Enable
                        </button>
                      )}
                      {c.status === 'rejected' && (
                        <button
                          className="action-btn approve-btn"
                          onClick={() => handleStatusUpdate(c._id, 'approved')}
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Rejection Reason Modal */}
      {rejectionModal.open && (
        <div className="modal-overlay" onClick={() => setRejectionModal({ open: false, consultantId: null, reason: '' })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🚫 Reject Application</h3>
            <p>Please provide a reason for rejecting this consultant profile:</p>
            <textarea
              value={rejectionModal.reason}
              onChange={(e) => setRejectionModal({ ...rejectionModal, reason: e.target.value })}
              placeholder="e.g. Incomplete profile details, documents missing..."
              style={{ width: '100%', minHeight: '80px', padding: '8px', margin: '10px 0', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <div className="modal-actions">
              <button className="submit-btn" style={{ background: '#f43f5e' }} onClick={submitRejection}>Confirm Rejection</button>
              <button className="close-btn" onClick={() => setRejectionModal({ open: false, consultantId: null, reason: '' })}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ---------------------------------------------------------------------
// 🏷️ SUB-COMPONENT: Pricing Settings Management
// ---------------------------------------------------------------------
const PricingManagement = () => {
  const [pricing, setPricing] = useState({
    smart: { price: 2999, enabled: true },
    premium: { price: 5999, enabled: true },
    eliteVip: { price: 9999, enabled: true },
    premium1Month: { price: 1999, enabled: true },
    premium2Months: { price: 2999, enabled: true },
    premium3Months: { price: 3999, enabled: true },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/pricing`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (res.ok && data.pricing) {
        setPricing({
          smart: {
            price: data.pricing.smart?.price ?? 2999,
            enabled: data.pricing.smart?.enabled !== false
          },
          premium: {
            price: data.pricing.premium?.price ?? 5999,
            enabled: data.pricing.premium?.enabled !== false
          },
          eliteVip: {
            price: data.pricing.eliteVip?.price ?? 9999,
            enabled: data.pricing.eliteVip?.enabled !== false
          },
          premium1Month: {
            price: data.pricing.premium1Month?.price ?? 1999,
            enabled: data.pricing.premium1Month?.enabled !== false
          },
          premium2Months: {
            price: data.pricing.premium2Months?.price ?? 2999,
            enabled: data.pricing.premium2Months?.enabled !== false
          },
          premium3Months: {
            price: data.pricing.premium3Months?.price ?? 3999,
            enabled: data.pricing.premium3Months?.enabled !== false
          }
        });
      } else {
        setErrorMsg(data.error || "Failed to load pricing settings");
      }
    } catch (err) {
      console.error("Error fetching pricing:", err);
      setErrorMsg("Failed to load pricing settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleChange = (planKey, prop, val) => {
    setPricing(prev => ({
      ...prev,
      [planKey]: {
        ...prev[planKey],
        [prop]: val
      }
    }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const isValidPrice = (val) => {
      const num = Number(val);
      return val !== "" && !isNaN(num) && Number.isFinite(num) && num >= 0 && num <= 100000;
    };

    if (
      !isValidPrice(pricing.smart.price) ||
      !isValidPrice(pricing.premium.price) ||
      !isValidPrice(pricing.eliteVip.price) ||
      !isValidPrice(pricing.premium1Month.price) ||
      !isValidPrice(pricing.premium2Months.price) ||
      !isValidPrice(pricing.premium3Months.price)
    ) {
      setErrorMsg("❌ All prices must be valid numbers between ₹0 and ₹100,000");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/admin/pricing`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          smart: { price: Number(pricing.smart.price), enabled: pricing.smart.enabled },
          premium: { price: Number(pricing.premium.price), enabled: pricing.premium.enabled },
          eliteVip: { price: Number(pricing.eliteVip.price), enabled: pricing.eliteVip.enabled },
          premium1Month: { price: Number(pricing.premium1Month.price), enabled: pricing.premium1Month.enabled },
          premium2Months: { price: Number(pricing.premium2Months.price), enabled: pricing.premium2Months.enabled },
          premium3Months: { price: Number(pricing.premium3Months.price), enabled: pricing.premium3Months.enabled },
        })
      });
      const data = await res.json();
      if (res.ok && data.pricing) {
        setSuccessMsg("🎉 Pricing updated successfully!");
        setPricing({
          smart: {
            price: data.pricing.smart?.price ?? 2999,
            enabled: data.pricing.smart?.enabled !== false
          },
          premium: {
            price: data.pricing.premium?.price ?? 5999,
            enabled: data.pricing.premium?.enabled !== false
          },
          eliteVip: {
            price: data.pricing.eliteVip?.price ?? 9999,
            enabled: data.pricing.eliteVip?.enabled !== false
          },
          premium1Month: {
            price: data.pricing.premium1Month?.price ?? 1999,
            enabled: data.pricing.premium1Month?.enabled !== false
          },
          premium2Months: {
            price: data.pricing.premium2Months?.price ?? 2999,
            enabled: data.pricing.premium2Months?.enabled !== false
          },
          premium3Months: {
            price: data.pricing.premium3Months?.price ?? 3999,
            enabled: data.pricing.premium3Months?.enabled !== false
          }
        });
      } else {
        setErrorMsg(data.error || "Failed to update pricing settings");
      }
    } catch (err) {
      console.error("Error saving pricing:", err);
      setErrorMsg("Failed to save pricing settings");
    } finally {
      setSaving(false);
    }
  };

  const renderPlanInput = (planKey, labelText) => {
    const plan = pricing[planKey];
    return (
      <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#4b5563' }}>{labelText}</label>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: plan.enabled ? '#16a34a' : '#dc2626' }}>
            {plan.enabled ? "🟢 Active" : "🔴 Disabled"}
          </span>
        </div>
        <input
          type="number"
          value={plan.price}
          onChange={(e) => handleChange(planKey, 'price', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', marginBottom: '0.5rem' }}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => handleChange(planKey, 'enabled', !plan.enabled)}
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              background: plan.enabled ? '#fee2e2' : '#dcfce7',
              color: plan.enabled ? '#dc2626' : '#16a34a',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
          >
            {plan.enabled ? "Disable Plan" : "Enable Plan"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="admin-section" style={{ marginBottom: '2rem' }}>
      <h2>🏷️ Package & Membership Pricing</h2>
      {loading ? (
        <p style={{ padding: '20px', textAlign: 'center' }}>Loading pricing settings...</p>
      ) : (
        <form onSubmit={handleSave} style={{ maxWidth: '800px', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>

            {/* Admission Packages */}
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#1d4ed8', borderBottom: '2px solid #eff6ff', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Admission Packages</h3>
              {renderPlanInput('smart', 'Smart Plan (₹)')}
              {renderPlanInput('premium', 'Premium Plan (₹)')}
              {renderPlanInput('eliteVip', 'Elite VIP Plan (₹)')}
            </div>

            {/* Premium Memberships */}
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#1d4ed8', borderBottom: '2px solid #eff6ff', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Premium Memberships</h3>
              {renderPlanInput('premium1Month', '1 Month (₹)')}
              {renderPlanInput('premium2Months', '2 Months (₹)')}
              {renderPlanInput('premium3Months', '3 Months (₹)')}
            </div>

          </div>

          {errorMsg && (
            <div style={{ padding: '10px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ padding: '10px', background: '#f0fdf4', border: '1px solid #dcfce7', color: '#16a34a', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{ width: '100%', padding: '12px', background: '#1d4ed8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? "Saving Changes..." : "Save Pricing Configurations"}
          </button>
        </form>
      )}
    </section>
  );
};
