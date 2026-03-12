// backend/models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // For Consultants
    consultantId: { type: mongoose.Schema.Types.ObjectId, ref: "Consultant" },
    consultantEmail: { type: String },
    consultantName: { type: String },

    // For Teachers
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    teacherEmail: { type: String },
    teacherName: { type: String },

    bookingType: {
      type: String,
      enum: ["consultant", "teacher"],
      default: "consultant"
    },
    classMode: {
      type: String,
      enum: ["online", "offline"]
    },

    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: "HH:mm" (24-hour)
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    userName: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    },
    meetingId: { type: String }, // For video calls
  },
  { timestamps: true }
);

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
