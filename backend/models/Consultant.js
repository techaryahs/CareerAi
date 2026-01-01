const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true }
}, { _id: false });

const slotSchema = new mongoose.Schema({
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
}, { _id: false });

const consultantSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  name: { type: String, required: true },
  email: { type: String },
  role: { type: String, required: true }, // job role (Career Counselor, etc.)
  expertise: { type: String, required: true },
  experience: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  availability: [slotSchema],
  bookings: [bookingSchema]
}, { timestamps: true });

module.exports = mongoose.models.Consultant || mongoose.model('Consultant', consultantSchema);
