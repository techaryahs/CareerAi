require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Database Connection
connectDB()




app.get("/", (req, res)=> {
  res.send("Server is running");
});
// Routes
app.use('/api/auth', require('./routes/auth.routes'));


// 👤 User
app.use("/api/user", require("./routes/user.routes"));

// 🧑‍💼 Admin (receipts, premium, consultants, api-key)
app.use("/api/admin", require("./routes/admin.routes"));

// 🎓 Careers / AI tools
app.use("/api/careers", require("./routes/career.routes"));

// 🤖 Chatbot
app.use("/api", require("./routes/chat.routes"));

// 📅 Booking & Consultants
app.use("/api/bookings", require("./routes/booking.routes"));

app.use("/api/progress", require("./routes/progressRoutes"));

app.use('/api/enquiry', require('./routes/enquiryRoutes'));

// 🧑‍🎤 Profile (IMPORTANT – WAS MISSING)
app.use("/api", require("./routes/profile.routes"));

// 👪 Parent
// 👨‍👩‍👧 Parent Dashboard
app.use("/api/parent", require("./routes/parent.routes"));

// 👨‍🏫 Teacher
// 👨‍🏫 Teacher
app.use("/api/teacher", require("./routes/teacher.routes"));

// 💓 Activity Manager (Heartbeat & Stats)
app.use("/api/activity", require("./routes/activityRoutes"));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
