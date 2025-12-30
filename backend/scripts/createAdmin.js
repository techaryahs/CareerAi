// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const createAdmin = async () => {
//   try {
//     const adminEmail = "admin@gmail.com";
//     const existingAdmin = await User.findOne({ email: adminEmail });

//     if (!existingAdmin) {
//       const admin = new User({
//         name: "Admin",
//         email: adminEmail,
//         password: "aryahs@999", // Pre-save hook will hash this
//         mobile: "0000000000",
//         role: "admin",
//         isVerified: true
//       });
      
//       await admin.save();
//       console.log("✅ Admin account created successfully");
//     } else {
//       console.log("ℹ️ Admin account already exists");
//     }
//   } catch (error) {
//     console.error("❌ Error creating admin:", error.message);
//   }
// };

// module.exports = createAdmin;
