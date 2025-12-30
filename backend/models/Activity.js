const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userModel' 
  },
  userModel: {
    type: String,
    required: true,
    enum: ['User', 'Teacher', 'Consultant'] // dynamic reference to the collection
  },
  role: { type: String, required: true }, // e.g., 'student', 'parent', 'teacher', 'consultant'
  name: { type: String },
  email: { type: String },
  
  // SESSION TRACKING
  loginTime: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  deviceInfo: { type: String }, // optional: user agent or similar
  ipAddress: { type: String },

  // DURATION (in minutes or seconds, updated on heartbeat)
  sessionDuration: { type: Number, default: 0 } // in minutes

}, { timestamps: true });

// Index for quick lookup of active users
activitySchema.index({ lastActive: 1 });
activitySchema.index({ userId: 1 });

module.exports = mongoose.model("Activity", activitySchema);
