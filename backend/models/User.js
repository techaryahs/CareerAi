const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    dob: { type: String },
    gender: { type: String },
    country: { type: String },
    state: { type: String },
    role: {
      type: String,
      enum: ["student", "teacher", "consultant", "parent", "admin"],
      default: "student",
    },

    // 🔥 PROFILE DETAILS (NESTED OBJECT) 🔥
    // The user explicitly requested an embedded subdocument so that it can simply be expanded in their database IDE.
    profile: {
      // LINKING
      parentOf: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      teacherProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", default: null },
      consultantProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Consultant", default: null },

      // OTP & VERIFICATION
      isVerified: { type: Boolean, default: false },

      // PREMIUM SUBSCRIPTIONS
      isPremium: { type: Boolean, default: false },
      premiumPlan: { type: String, default: null },
      premiumStartAt: { type: Date, default: null },
      premiumExpiresAt: { type: Date, default: null },

      // RECEIPTS
      receiptUrl: { type: String, default: null },
      receiptStatus: {
        type: String,
        enum: ["pending", "approved", "denied"],
        default: "pending"
      },

      // COSMETIC PROFILE DATA
      profileImage: { type: String, default: null },
      resumeUrl: { type: String, default: null },
      resumeName: { type: String, default: null },
      bio: { type: String, default: "" },
      location: { type: String, default: "" },
      portfolio: { type: String, default: "" },

      // QUIZ TRACKING
      services: {
        quiz: {
          attempted: { type: Boolean, default: false },
          totalAttempts: { type: Number, default: 0 },
          bestScore: { type: Number, default: 0 },
          lastAttemptAt: { type: Date, default: null }
        }
      },
      // EXTENDED SERVICE USAGE
      serviceActivity: {
        resumeBuilder: {
          used: { type: Boolean, default: false },
          lastUsedAt: Date
        },
        careerRoadmap: {
          used: { type: Boolean, default: false },
          lastUsedAt: Date,
          careerPathName: String
        }
      },

      // 🔥 NEW REGISTRATION / DASHBOARD CARD DATA 🔥
      highSchool: [{
        schoolName: String,
        cgpa: String,
        outOf: String,
        addedAt: { type: Date, default: Date.now }
      }],
      underGrad: [{
        uniName: String,
        degreeName: String,
        cgpa: String,
        outOf: String,
        startDate: Date,
        endDate: Date,
        isOngoing: { type: Boolean, default: false },
        addedAt: { type: Date, default: Date.now }
      }],
      masters: [{
        uniName: String,
        degreeName: String,
        cgpa: String,
        outOf: String,
        startDate: Date,
        endDate: Date,
        isOngoing: { type: Boolean, default: false },
        addedAt: { type: Date, default: Date.now }
      }],
      testScores: [{
        testType: String,
        score: String,
        sectionScores: mongoose.Schema.Types.Mixed,
        date: Date,
        addedAt: { type: Date, default: Date.now }
      }],
      workExperience: [{
        role: String,
        organization: String,
        type: String,
        startDate: Date,
        endDate: Date,
        isOngoing: { type: Boolean, default: false },
        country: String,
        state: String,
        description: String,
        addedAt: { type: Date, default: Date.now }
      }],
      research: [{
        title: String,
        publisher: String,
        date: Date,
        description: String,
        contributors: [String],
        url: String,
        addedAt: { type: Date, default: Date.now }
      }],
      projects: [{
        title: String,
        category: String,
        description: String,
        technologies: [String],
        isOngoing: { type: Boolean, default: false },
        startDate: Date,
        endDate: Date,
        projectUrl: String,
        addedAt: { type: Date, default: Date.now }
      }],
      volunteering: [{
        organization: String,
        role: String,
        startDate: Date,
        endDate: Date,
        isOngoing: { type: Boolean, default: false },
        cause: String,
        description: String,
        addedAt: { type: Date, default: Date.now }
      }],
      targetUniversities: [{
        uniName: String,
        degree: String,
        major: String,
        term: String,
        year: String,
        priority: { type: Number, default: 0 },
        addedAt: { type: Date, default: Date.now }
      }],
    }
  },
  { timestamps: true }
);

// Pre-save hook to hash password
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
