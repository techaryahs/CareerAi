import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { useAuth } from '../../context/AuthContext';
const AdminDashboard = () => {
  const [usersWithReceipts, setUsersWithReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImg, setModalImg] = useState(null);
  const [apiKeyModal, setApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  // ✅ NEW: Activity Stats Logic
  const [activityStats, setActivityStats] = useState(null);

  useEffect(() => {
    // Only fetch for specific admins
  
      fetchActivityStats();
      const interval = setInterval(fetchActivityStats, 30000);
      return () => clearInterval(interval);
  }, []);

  const fetchActivityStats = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/activity/stats`);
      const data = await res.json();
      setActivityStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };


  const {user,logout} = useAuth();




  const fetchUsersWithReceipts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/receipts`);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/save-api-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const pendingReceipts = usersWithReceipts.filter(u => u.receiptStatus === 'pending');
  const approvedReceipts = usersWithReceipts.filter(u => u.receiptStatus === 'approved');

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>👑 Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="logout-btn" onClick={logout}>Logout</button>
          <button className="apikey-btn" onClick={() => setApiKeyModal(true)}>API Key</button>
          {/* 🔻 Removed Register Consultant Button */}
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/activity/user-stats`);
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
                  <strong>{u.name || "Unknown"}</strong><br/>
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

