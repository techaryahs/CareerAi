const Booking = require("../models/Booking");
const Consultant = require("../models/Consultant");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
// const transporter = require("../utils/transporter"); // nodemailer instance
const sendEmail = require("../utils/sendEmail");     // used in bookConsultant
const crypto = require('crypto');

const SECRET_KEY = process.env.MEETING_SECRET_KEY || 'careergenai-meeting-secret-2024';

const generateMeetingId = (sessionId) => {
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(sessionId.toString());
  const hash = hmac.digest('hex');
  return hash.substring(0, 12).toUpperCase();
};

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/* =========================
   BOOK CONSULTANT
========================= */
exports.bookConsultant = async (req, res) => {
  try {
    let {
      consultantId,
      consultantEmail,
      consultantName,
      date,
      time,
      userEmail,
      userPhone,
      userName,
      userId,
      consultantType,
      userPlan
    } = req.body;

    console.log(`📡 [Booking] Request: ${req.body.date} ${req.body.time} for ID: ${consultantId}`);

    if (!consultantId || !date || !time || !userEmail || !userPhone) {
      return res.status(400).json({ message: 'Missing required data' });
    }

    // Fetch consultant info if missing (Stronger Fetch)
    if (!consultantEmail || !consultantName) {
      const consultant = await Consultant.findById(consultantId).populate('user');
      if (consultant) {
        consultantEmail = consultantEmail || consultant.user?.email || consultant.email;
        consultantName = consultantName || consultant.name || consultant.user?.name;
      } else {
        // Check if it's a teacher
        const teacher = await Teacher.findById(consultantId).populate('user');
        if (teacher) {
          consultantEmail = teacher.user?.email || teacher.email;
          consultantName = teacher.fullName || teacher.user?.name;
        }
      }
    }

    if (!consultantEmail) {
      return res.status(400).json({ message: 'Consultant email not found' });
    }

    if (consultantType === "Premium" && userPlan !== "Premium") {
      return res.status(403).json({
        message: "This counselor is available only for Premium Users."
      });
    }

    if (userPlan !== "Premium") {
      const todayBooking = await Booking.findOne({ userEmail, date });
      if (todayBooking) {
        return res.status(403).json({
          message: "Free users can book only 1 consultation per day."
        });
      }
    }

    const alreadyBooked = await Booking.findOne({ consultantId, date, time });
    if (alreadyBooked) {
      console.warn(`🚫 [Booking] Conflict found: ${date} ${time} for consultant ${consultantId}`);
      return res.status(400).json({ message: 'Slot already booked' });
    }

    // Generate deterministic meeting ID
    const meetingId = generateMeetingId(`${consultantId}-${date}-${time}-${userEmail}`);

    const booking = await Booking.create({
      consultantId,
      consultantEmail,
      consultantName,
      date,
      time,
      userEmail,
      userName,
      userPhone,
      userId,
      consultantType,
      userPlan,
      meetingId
    });

    try {
      await sendEmail(
        userEmail,
        "Your CareerGenAI Consultation is Confirmed",
        "",
        `<p>Your appointment with <b>${consultantName}</b> is confirmed.</p>
             <p>Date: <b>${date}</b></p>
             <p>Time: <b>${time}</b></p>
             <p>Meeting ID: <b>${meetingId}</b></p>`
      );

      await sendEmail(
        consultantEmail,
        "New Consultation Booking",
        "",
        `<p>You have a new booking from <b>${userName}</b>.</p>`
      );

      await sendEmail(
        process.env.ADMIN_NOTIFY_TO || "admin@careergenai.com",
        "New Consultation Booking (Admin Copy)",
        "",
        `<p>User: ${userName} (${userEmail})</p><p>Mentor: ${consultantName}</p>`
      );
    } catch (emailErr) {
      console.warn("⚠️ Email notification failed, but booking was successful:", emailErr.message);
    }

    res.json({ message: "Booking successful", booking });

  } catch (err) {
    console.error("❌ Booking error:", err.message);
    res.status(500).json({ message: "Server error. Could not complete booking." });
  }
};

/* =========================
   BOOK TEACHER
========================= */
exports.bookTeacher = async (req, res) => {
  try {
    const {
      teacherId,
      teacherEmail,
      teacherName,
      date,
      time,
      userEmail,
      userPhone,
      userName,
      classMode
    } = req.body;

    if (!teacherId || !teacherEmail || !date || !time || !userEmail || !classMode) {
      return res.status(400).json({ message: 'Missing required data' });
    }

    const alreadyBooked = await Booking.findOne({ teacherId, date, time });
    if (alreadyBooked) {
      console.warn(`🚫 [Teacher Booking] Conflict found: ${date} ${time} for teacher ${teacherId}`);
      return res.status(400).json({ message: 'Slot already booked' });
    }

    const booking = await Booking.create({
      teacherId,
      teacherEmail,
      teacherName,
      date,
      time,
      userEmail,
      userName,
      userPhone,
      bookingType: "teacher",
      classMode
    });

    // Notify Teacher
    await sendEmail(
      teacherEmail,
      "New Class Booking",
      "",
      `<p>You have a new <b>${classMode}</b> class booking from <b>${userName}</b>.</p>
       <p>Date: <b>${date}</b></p>
       <p>Time: <b>${time}</b></p>`
    );

    // Notify Student
    await sendEmail(
      userEmail,
      "Class Booking Confirmed",
      "",
      `<p>Your <b>${classMode}</b> class with <b>${teacherName}</b> is confirmed.</p>`
    );

    res.json({ message: "Booking successful", booking });

  } catch (err) {
    console.error("❌ Teacher booking error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   SEARCH TEACHERS
========================= */
exports.searchTeachers = async (req, res) => {
  try {
    const { query, fieldId, programId } = req.query;

    let filter = {}; // Removed isVerified requirement for testing
    // let filter = { isVerified: true }; // TODO: Re-enable for production

    // Apply field filter
    if (fieldId && fieldId.trim()) {
      filter["teachingField.fieldId"] = fieldId.trim();
    }

    // Apply program filter
    if (programId && programId.trim()) {
      filter["program.programId"] = programId.trim();
    }

    // Apply text search if query provided
    if (query && query.trim()) {
      try {
        const safeQuery = escapeRegex(query.trim());
        const searchRegex = new RegExp(safeQuery, 'i');

        filter.$or = [
          { fullName: searchRegex },
          { bio: searchRegex },
          { "teachingField.fieldName": searchRegex },
          { "program.programName": searchRegex },
          { selectedSubjects: searchRegex }
        ];
      } catch (regexErr) {
        console.error("❌ Regex error:", regexErr);
        // If regex fails, just search by exact match
        filter.$or = [
          { fullName: { $regex: query.trim(), $options: 'i' } },
          { selectedSubjects: { $regex: query.trim(), $options: 'i' } }
        ];
      }
    }

    const teachers = await Teacher.find(filter).select('-password');

    res.json({ teachers });
  } catch (err) {
    console.error("❌ Search error:", err.message);
    console.error(err.stack);
    res.status(500).json({
      message: "Search error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

/* =========================
   GET TEACHER BOOKED SLOTS
========================= */
exports.getTeacherBookedSlots = async (req, res) => {
  try {
    const { teacherId, date } = req.query;
    if (!teacherId || !date) {
      return res.status(400).json({ message: 'Missing teacherId or date' });
    }

    console.log(`🔍 [Teacher Slots] Fetching for: ${teacherId} on ${date}`);
    const bookings = await Booking.find({ teacherId, date });
    const bookedTimes = bookings.map(b => b.time);

    res.json({ bookedTimes });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   GET BOOKED SLOTS
========================= */
exports.getBookedSlots = async (req, res) => {
  try {
    const { consultantId, date } = req.query;
    if (!consultantId || !date) {
      return res.status(400).json({ message: 'Missing consultantId or date' });
    }

    console.log(`🔍 [Consultant Slots] Fetching for: ${consultantId} on ${date}`);
    const bookings = await Booking.find({ consultantId, date });
    const bookedTimes = bookings.map(b => b.time);

    res.json({ bookedTimes });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   USER COUNSELLING HISTORY
========================= */
exports.getUserCounselling = async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email })
      .populate('consultantId')
      .sort({ date: -1 });

    const enrichedBookings = await Promise.all(bookings.map(async (b) => {
      const bookingObj = b.toObject();
      // Ensure student name is there (fetch from User if missing in booking)
      if (!bookingObj.userName) {
        const user = await User.findOne({ email: req.params.email });
        bookingObj.userName = user?.name || "Student";
      }
      return bookingObj;
    }));

    res.json({ bookings: enrichedBookings });
  } catch (error) {
    console.error('Error in getUserCounselling:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   GET USER BOOKINGS (FOR PROFILE)
========================= */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email })
      .sort({ date: -1 });

    res.json(bookings); // Return array directly
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   CONSULTANTS LIST
========================= */
exports.getAllConsultants = async (req, res) => {
  const consultants = await Consultant.find({}).populate('user', 'email name');
  res.json({ consultants });
};

/* =========================
   CONSULTANT BOOKINGS
========================= */
exports.getConsultantBookings = async (req, res) => {
  try {
    const { consultantId } = req.params; // Can be User ID or Profile ID
    const { email } = req.query;
    console.log(`🔍 [Dashboard] Fetching bookings. ID: ${consultantId}, Email: ${email}`);

    if (!consultantId || consultantId === "undefined") {
      return res.status(400).json({ message: "Invalid ID provided" });
    }

    // 1. Resolve Profile IDs for this User (could be Consultant or Teacher profile)
    const consultantProfiles = await Consultant.find({ user: consultantId });
    const teacherProfiles = await Teacher.find({ user: consultantId });

    const profileIds = [
      ...consultantProfiles.map(p => p._id),
      ...teacherProfiles.map(p => p._id)
    ];

    // 2. Build a multi-prong query
    let bookingsQuery = { $or: [] };

    // Prong A: Direct ID matches (the passed ID is already a Profile ID)
    bookingsQuery.$or.push({ consultantId: consultantId });
    bookingsQuery.$or.push({ teacherId: consultantId });

    // Prong B: Mapped Profile IDs (the passed ID was a User ID)
    if (profileIds.length > 0) {
      bookingsQuery.$or.push({ consultantId: { $in: profileIds } });
      bookingsQuery.$or.push({ teacherId: { $in: profileIds } });
    }

    // Prong C: Email Fallback (Bulletproof for dev/seed data)
    if (email) {
      bookingsQuery.$or.push({ consultantEmail: email });
      bookingsQuery.$or.push({ teacherEmail: email });
    }

    const bookings = await Booking.find(bookingsQuery)
      .sort({ date: 1, time: 1 });

    console.log(`📊 [Dashboard] Found ${bookings.length} bookings using query:`, JSON.stringify(bookingsQuery));
    res.json(bookings);
  } catch (err) {
    console.error("❌ [Dashboard] Error:", err.message);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

/* =========================
   TEACHER BOOKINGS
========================= */
exports.getTeacherBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ teacherId: req.params.teacherId })
      .sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

/* =========================
   ACCEPT BOOKING (EMAIL)
========================= */
exports.acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "accepted";
    await booking.save();

    const user = await User.findOne({ email: booking.userEmail });

    await sendEmail(
      booking.userEmail,
      "✅ Appointment Accepted",
      "",
      `<p>Hello ${user?.name || "User"}, your booking is accepted.</p>`
    );

    res.json({ message: "Booking accepted and email sent", booking });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   REJECT BOOKING (EMAIL)
========================= */
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "rejected";
    await booking.save();

    const user = await User.findOne({ email: booking.userEmail });

    await sendEmail(
      booking.userEmail,
      "❌ Appointment Rejected",
      "",
      `<p>Hello ${user?.name || "User"}, your booking was rejected.</p>`
    );

    res.json({ message: "Booking rejected and email sent", booking });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================
   SEED DUMMY CONSULTANTS
========================= */
exports.seedConsultants = async (req, res) => {
  try {
    // If user is authenticated, use their real ID. 
    // Otherwise check body for a userId (helpful for testing via Postman)
    const creatorId = req.user?.id || req.body.userId || "64b0f1a2c3d4e5f6a7b8c9d0";

    const dummyConsultants = [
      {
        name: "Dr. Aryan Sharma",
        email: req.user?.email || "aryan@example.com",
        role: "Senior Career Pathologist",
        expertise: "Science & Engineering",
        experience: "10+ Years",
        bio: "Expert in helping students find their passion in STEM fields with a proven track record of successful placements.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        price: 0,
        isPremium: false,
        user: creatorId
      },
      {
        name: "Ms. Priya Varma",
        email: req.user?.email || "priya@example.com",
        role: "Academic Counselor",
        expertise: "Arts & Humanities",
        experience: "8 Years",
        bio: "Specializes in creative fields and helps students build portfolios for top design and arts colleges.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        price: 500,
        isPremium: true,
        user: creatorId
      },
      {
        name: "Personal Counselor",
        email: req.user?.email || "mentor@example.com",
        role: "Premium Mentor",
        expertise: "Holistic Guidance",
        experience: "15 Years",
        bio: "One-on-one personal guidance for high-achievers. Available only for premium subscribers.",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        price: 1500,
        isPremium: true,
        user: creatorId
      }
    ];

    // Warning: This is a simple seeding for demo, in production use a script
    for (const consultant of dummyConsultants) {
      const exists = await Consultant.findOne({ name: consultant.name });
      if (!exists) {
        await Consultant.create(consultant);
      }
    }

    res.json({ message: "Consultants seeded successfully" });
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    res.status(500).json({ message: "Seeding failed" });
  }
};
