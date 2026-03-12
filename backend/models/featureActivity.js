const mongoose = require("mongoose");

const featureActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "userModel",
    },
    userModel: {
      type: String,
      required: true,
      enum: ["User", "Teacher", "Consultant"],
    },
    role: {
      type: String,
      default: "student",
    },
    featureType: {
      type: String,
      required: true,
    },
    title: String,
    description: String,
    meta: Object,

    duration: {
      type: Number, // in seconds
      default: 0,
    },

    score: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: ["Started", "In Progress", "Completed"],
      default: "Completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "FeatureActivity",
  featureActivitySchema
);