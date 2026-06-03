const mongoose = require("mongoose");
require("dotenv").config({ path: "c:\\Users\\sahil\\OneDrive\\Desktop\\CareerAi\\backend\\.env" });

async function run() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections in DB:");
    collections.forEach(col => console.log(` - ${col.name}`));

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
