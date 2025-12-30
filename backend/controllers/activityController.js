const Activity = require("../models/Activity");
const User = require("../models/user"); // Assuming User model path
const Teacher = require("../models/Teacher");
const Consultant = require("../models/Consultant");

// ====================================================
// HEARTBEAT (Updates online status & duration)
// ====================================================
exports.recordHeartbeat = async (req, res) => {
  try {
    const { userId, role, name, email } = req.body;
    
    // Determine the collection model name based on role
    // 'student'/'parent' -> 'User'
    // 'teacher' -> 'Teacher'
    // 'consultant' -> 'Consultant'
    let userModel = 'User';
    if (role === 'teacher') userModel = 'Teacher';
    if (role === 'consultant') userModel = 'Consultant';

    // Find the most recent active session for this user (e.g. within last 30 mins)
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);

    let activity = await Activity.findOne({
      userId: userId,
      lastActive: { $gte: thirtyMinsAgo }
    }).sort({ createdAt: -1 });

    if (activity) {
      // ✅ UPDATE EXISTING SESSION
      // Calculate minutes since last update to add to duration
      // (This is a simplified approach; accurate duration needs precise start/end)
      // For a heartbeat, we just update lastActive. 
      // We can approximate duration by difference between now and loginTime.
      
      activity.lastActive = new Date();
      const durationMs = activity.lastActive - activity.loginTime;
      activity.sessionDuration = Math.round(durationMs / 1000 / 60); // minutes
      
      await activity.save();
    } else {
      // ✅ CREATE NEW SESSION
      activity = await Activity.create({
        userId,
        userModel,
        role,
        name,
        email,
        loginTime: new Date(),
        lastActive: new Date(),
        sessionDuration: 0
      });
    }

    res.status(200).json({ success: true, activityId: activity._id });

  } catch (error) {
    console.error("❌ Heartbeat Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ====================================================
// GET ONLINE USERS (Active in last 5 mins)
// ====================================================
exports.getOnlineUsers = async (req, res) => {
  try {
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);

    // Aggregate to get unique users active in last 5 mins
    const onlineUsers = await Activity.aggregate([
      { $match: { lastActive: { $gte: fiveMinsAgo } } },
      { 
        $group: {
          _id: "$userId",
          name: { $first: "$name" },
          email: { $first: "$email" },
          role: { $first: "$role" },
          lastActive: { $max: "$lastActive" }
        }
      },
      { $sort: { lastActive: -1 } }
    ]);

    res.status(200).json({ 
      count: onlineUsers.length, 
      users: onlineUsers 
    });
  } catch (error) {
    console.error("❌ Get Online Users Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ====================================================
// GET ACTIVITY STATS (Admin)
// ====================================================
exports.getActivityStats = async (req, res) => {
  try {
    // Total sessions recorded
    const totalSessions = await Activity.countDocuments();

    // Active users count (5 mins)
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const activeCount = await Activity.distinct("userId", { lastActive: { $gte: fiveMinsAgo } });

    // Active users count (24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const active24hCount = await Activity.distinct("userId", { lastActive: { $gte: twentyFourHoursAgo } });

    // Active users count (7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const active7dCount = await Activity.distinct("userId", { lastActive: { $gte: sevenDaysAgo } });

    // Active users count (30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const active30dCount = await Activity.distinct("userId", { lastActive: { $gte: thirtyDaysAgo } });

    // Group by Role
    const roleDistribution = await Activity.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 } // counts total sessions, not unique users, but gives idea of traffic
        }
      }
    ]);

    res.status(200).json({
      totalSessions,
      onlineCount: activeCount.length,
      active24h: active24hCount.length,
      active7d: active7dCount.length,
      active30d: active30dCount.length,
      roleStats: roleDistribution
    });

  } catch (error) {
    console.error("❌ Stats Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ====================================================
// GET USER VISIT STATS (Unique Users & Frequency)
// ====================================================
exports.getUserVisitStats = async (req, res) => {
  try {
    const userStats = await Activity.aggregate([
      {
        $group: {
          _id: "$userId", // Group by unique User ID
          name: { $first: "$name" },
          email: { $first: "$email" },
          role: { $first: "$role" },
          visitCount: { $sum: 1 }, // Count total sessions
          lastActive: { $max: "$lastActive" } // Get most recent activity
        }
      },
      { $sort: { visitCount: -1 } } // Sort by most frequent visitors
    ]);

    res.status(200).json(userStats);
  } catch (error) {
    console.error("❌ User Stats Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
