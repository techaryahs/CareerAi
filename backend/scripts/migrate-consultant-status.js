const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });
const Consultant = require("../models/Consultant");

const runMigration = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/careerai";
    // console.log(`📡 Connecting to MongoDB at ${mongoUri.replace(/:([^:@]+)@/, ':****@')}...`);
    await mongoose.connect(mongoUri);
    // console.log("📡 Connected to MongoDB...");

    // Find all consultants that do not have a status field and set them to approved
    const result = await Consultant.updateMany(
      { status: { $exists: false } },
      { $set: { status: "approved" } }
    );

    // console.log(`✅ Migration complete. Updated ${result.modifiedCount} consultants to 'approved'.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    process.exit(1);
  }
};

runMigration();
