const Booking = require("../models/Booking");
const Consultant = require("../models/Consultant");
const User = require("../models/user");
const Teacher = require("../models/Teacher");
// const transporter = require("../utils/transporter"); // nodemailer instance
const sendEmail = require("../utils/sendEmail");     // used in bookConsultant

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/* =========================
   BOOK CONSULTANT
========================= */
exports.bookConsultant = async (req, res) => {
  try {
    const {
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

    if (!consultantId || !consultantEmail || !date || !time || !userEmail || !userPhone) {
      return res.status(400).json({ message: 'Missing required data' });
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
      return res.status(400).json({ message: 'Slot already booked' });
    }

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
      userPlan
    });

    await sendEmail(
      userEmail,
      "Your CareerGenAI Consultation is Confirmed",
      "",
      `<p>Your appointment with <b>${consultantName}</b> is confirmed.</p>
       <p>Date: <b>${date}</b></p>
       <p>Time: <b>${time}</b></p>`
    );

    await sendEmail(
      consultantEmail,
      "New Consultation Booking",
      "",
      `<p>You have a new booking from <b>${userName}</b>.</p>`
    );

    await sendEmail(
      process.env.ADMIN_NOTIFY_TO,
      "New Consultation Booking (Admin Copy)",
      "",
      `<p>User: ${userName} (${userEmail})</p>`
    );

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
      .sort({ date: -1 });

    // Populate consultant profile images
    const bookingsWithImages = await Promise.all(
      bookings.map(async (booking) => {
        const consultant = await Consultant.findById(booking.consultantId);
        return {
          ...booking.toObject(),
          consultantProfileImage: consultant?.image || null  // Use 'image' field
        };
      })
    );

    res.json({ bookings: bookingsWithImages });
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
  const consultants = await Consultant.find({});
  res.json({ consultants });
};

/* =========================
   CONSULTANT BOOKINGS
========================= */
exports.getConsultantBookings = async (req, res) => {
  const bookings = await Booking.find({ consultantId: req.params.consultantId })
    .sort({ date: 1, time: 1 });
  res.json(bookings);
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

    await transporter.sendMail({
      from: `"Career GenAI" <${process.env.EMAIL_USER}>`,
      to: booking.userEmail,
      subject: "✅ Appointment Accepted",
      html: `<p>Hello ${user?.name || "User"}, your booking is accepted.</p>`
    });

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

    await transporter.sendMail({
      from: `"Career GenAI" <${process.env.EMAIL_USER}>`,
      to: booking.userEmail,
      subject: "❌ Appointment Rejected",
      html: `<p>Hello ${user?.name || "User"}, your booking was rejected.</p>`
    });

    res.json({ message: "Booking rejected and email sent", booking });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
