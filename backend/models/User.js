const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  mobile: {
    type: String,
    match: /^[0-9]{10}$/,
    required: function () {
      return this.role === "student";
    }
  },

  password: { type: String, required: true },

  // ROLE
  role: {
    type: String,
    enum: ["student", "parent", "admin", "teacher", "consultant"],
    default: "student"
  },

  // PARENT–STUDENT LINKING
  parentOf: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  // LINKED PROFILES (Unified Auth)
  teacherProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    default: null
  },
  consultantProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consultant",
    default: null
  },

  // OTP
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiresAt: Date,

  // PREMIUM
  isPremium: { type: Boolean, default: false },
  premiumPlan: String,
  premiumStartAt: Date,
  premiumExpiresAt: Date,

  // RECEIPT
  receiptUrl: String,
  receiptStatus: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending"
  },

  // PROFILE DATA
  profileImage: { type: String, default: null },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  portfolio: { type: String, default: "" },

  // =========================
  // ✅ QUIZ TRACKING ONLY
  // =========================
  services: {
    quiz: {
      attempted: { type: Boolean, default: false },
      totalAttempts: { type: Number, default: 0 },
      bestScore: { type: Number, default: 0 },
      lastAttemptAt: { type: Date, default: null }
    }
  }

}, { timestamps: true });

// PASSWORD HASH
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
