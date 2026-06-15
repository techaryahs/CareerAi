const nodemailer = require("nodemailer");
const axios = require("axios");

const otpStore = {};


// =====================================
// SEND OTP
// =====================================
const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Generate OTP as number
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP with phone as key (normalize to remove +91 for consistency)
    const normalizedPhone = String(phone).replace("+91", "").trim();
    otpStore[normalizedPhone] = otp;

    // Clean Phone for MSG91
    const cleanPhone = String(phone).replace("+91", "");

    // console.log("\n" + "=".repeat(50));
    // console.log("🟢 SEND OTP REQUEST");
    // console.log("=".repeat(50));
    // console.log("📱 Phone received (original):", phone);
    // console.log("📱 Phone normalized (storage key):", normalizedPhone);
    // console.log("📱 Phone for MSG91 (clean):", cleanPhone);
    // console.log("🔐 Generated OTP:", otp, "(type:", typeof otp + ")");
    // console.log("📦 OTP Store after save:", otpStore);

    // Message MUST match approved NexSalon template
    const message = encodeURIComponent(
      `Your NexSalon login OTP is ${otp}. Valid for 5 minutes. Do not share this OTP with anyone.`
    );

    // console.log("🔑 MSG91 AUTH:", process.env.MSG91_AUTH_KEY ? "✅ Set" : "❌ Missing");
    // console.log("🔑 MSG91 TEMPLATE:", process.env.MSG91_TEMPLATE_ID ? "✅ Set" : "❌ Missing");

    // MSG91 SMS API
    const smsUrl =
      `https://control.msg91.com/api/sendhttp.php` +
      `?authkey=${process.env.MSG91_AUTH_KEY}` +
      `&mobiles=${cleanPhone}` +
      `&message=${message}` +
      `&sender=${process.env.MSG91_SENDER_ID}` +
      `&route=4` +
      `&country=91` +
      `&DLT_TE_ID=${process.env.MSG91_TEMPLATE_ID}`;

    // console.log("📤 SMS URL:", smsUrl);

    const response = await axios.get(smsUrl);

    // console.log("✅ MSG91 RESPONSE:", response.data);
    // console.log("=".repeat(50) + "\n");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("\n" + "=".repeat(50));
    console.error("❌ SEND OTP ERROR");
    console.error("=".repeat(50));

    if (error.response) {
      console.error("STATUS:", error.response.status);
      console.error("DATA:", error.response.data);
    } else {
      console.error("MESSAGE:", error.message);
    }

    console.error("=".repeat(50) + "\n");

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to send OTP",
    });
  }
};


// =====================================
// VERIFY OTP
// =====================================
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // console.log("\n" + "=".repeat(50));
    // console.log("🔵 VERIFY OTP REQUEST");
    // console.log("=".repeat(50));
    // console.log("📱 Phone received:", phone);
    // console.log("🔐 OTP received:", otp);
    // console.log("🔐 OTP type:", typeof otp);
    // console.log("📦 OTP Store keys:", Object.keys(otpStore));
    // console.log("📦 OTP Store state:", otpStore);

    // Validate inputs
    if (!phone || !otp) {
      // console.log("❌ Missing phone or OTP");
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    // Normalize phone number (remove +91 if present)
    const normalizedPhone = String(phone).replace("+91", "").trim();
    const storedPhone = String(phone).trim();

    // console.log("🔍 Normalized phone:", normalizedPhone);
    // console.log("🔍 Stored phone:", storedPhone);
    // console.log("📍 Looking for phone in store:", Object.keys(otpStore));

    // Check if OTP exists for this phone (check both normalized and original)
    let storedOtp = otpStore[storedPhone] || otpStore[normalizedPhone];

    // console.log("📍 Stored OTP for phone:", storedOtp);
    // console.log("📍 Stored OTP type:", typeof storedOtp);

    if (!storedOtp) {
      // console.log("❌ No OTP found for phone:", storedPhone);
      return res.status(400).json({
        success: false,
        message: "No OTP found for this phone number. Please request a new OTP.",
      });
    }

    // If already verified, return error
    if (storedOtp === "VERIFIED") {
      // console.log("⚠️ Phone already verified:", storedPhone);
      return res.status(400).json({
        success: false,
        message: "Phone number already verified",
      });
    }

    // Convert both to string for comparison
    const incomingOtp = String(otp).trim();
    const dbOtp = String(storedOtp).trim();

    // console.log("🔐 Comparing OTPs:");
    // console.log("  Incoming OTP:", incomingOtp, "(type:", typeof incomingOtp + ")");
    // console.log("  Stored OTP:", dbOtp, "(type:", typeof dbOtp + ")");
    // console.log("  Match (strict equality):", incomingOtp === dbOtp);
    // console.log("  Match (loose equality):", incomingOtp == dbOtp);

    // Use strict equality after converting both to strings
    if (incomingOtp !== dbOtp) {
      // console.log("❌ OTP mismatch");
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    // Mark as verified
    otpStore[storedPhone] = "VERIFIED";

    // console.log("✅ OTP verified successfully for:", storedPhone);
    // console.log("✅ Updated store:", otpStore);
    // console.log("=".repeat(50) + "\n");

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("❌ Verify OTP Error:", error.message);
    console.error("=".repeat(50) + "\n");

    res.status(500).json({
      success: false,
      message: "OTP verification failed: " + error.message,
    });
  }
};


// =====================================
// BOOK COUNSELLING
// =====================================
const bookCounselling = async (req, res) => {
  try {

    const {
      fullName,
      phone,
      email,
      city,
      course,
      mode,
      counsellor,
      preferredDate,
      slot,
      message,
    } = req.body;

    // CHECK VERIFIED
    if (otpStore[phone] !== "VERIFIED") {

      return res.status(401).json({
        success: false,
        message: "Phone number not verified",
      });
    }

    // CHECK SLOT ALREADY BOOKED
    const slotExists = bookedCounsellingSlots.find(
      (item) =>
        item.counsellor === counsellor &&
        item.date === preferredDate &&
        item.slot === slot
    );

    if (slotExists) {

      return res.status(400).json({
        success: false,
        message: "Slot already booked",
      });
    }

    // SAVE BOOKING
    bookedCounsellingSlots.push({
      counsellor,
      date: preferredDate,
      slot,
    });

    // EMAIL TRANSPORT
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // =====================================
    // ADMIN EMAIL
    // =====================================
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_NOTIFY_TO,
      subject: "New Free Counselling Booking",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">

          <h2 style="color: #2563eb;">
            New Free Counselling Booking
          </h2>

          <table cellpadding="10" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%;">

            <tr>
              <td><b>Name</b></td>
              <td>${fullName}</td>
            </tr>

            <tr>
              <td><b>Phone</b></td>
              <td>${phone}</td>
            </tr>

            <tr>
              <td><b>Email</b></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td><b>City</b></td>
              <td>${city}</td>
            </tr>

            <tr>
              <td><b>Course</b></td>
              <td>${course}</td>
            </tr>

            <tr>
              <td><b>Mode</b></td>
              <td>${mode}</td>
            </tr>

            <tr>
              <td><b>Counsellor</b></td>
              <td>${counsellor}</td>
            </tr>

            <tr>
              <td><b>Preferred Date</b></td>
              <td>${preferredDate}</td>
            </tr>

            <tr>
              <td><b>Slot</b></td>
              <td>${slot}</td>
            </tr>

            <tr>
              <td><b>Message</b></td>
              <td>${message}</td>
            </tr>

          </table>

        </div>
      `,
    };

    // SEND TO ADMIN
    await transporter.sendMail(adminMailOptions);

    // =====================================
    // USER CONFIRMATION EMAIL
    // =====================================
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "CareerGenAI Counselling Booking Confirmed",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">

          <h2 style="color: #2563eb;">
            Your Free Counselling Session is Confirmed
          </h2>

          <p>Hello <b>${fullName}</b>,</p>

          <p>
            Thank you for booking a free counselling session with CareerGenAI.
          </p>

          <p>
            Our counsellor will contact you shortly.
          </p>

          <h3>Booking Details:</h3>

          <ul>
            <li><b>Course:</b> ${course}</li>
            <li><b>Mode:</b> ${mode}</li>
            <li><b>Counsellor:</b> ${counsellor}</li>
            <li><b>Date:</b> ${preferredDate}</li>
            <li><b>Slot:</b> ${slot}</li>
          </ul>

          <p>
            Thank you,<br/>
            CareerGenAI Team
          </p>

        </div>
      `,
    };

    // SEND TO USER
    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      success: true,
      message: "Counselling booked successfully!",
    });

  } catch (error) {

    // console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =====================================
// TEMP BOOKING STORAGE
// =====================================
const bookedCounsellingSlots = [];


// =====================================
// GET AVAILABLE SLOTS
// =====================================
const getAvailableSlots = async (req, res) => {
  try {

    const { counsellor, date } = req.query;

    if (!counsellor || !date) {

      return res.status(400).json({
        success: false,
        message: "Counsellor and date are required",
      });
    }

    // ALL POSSIBLE SLOTS
    const allSlots = [

      "10:00 AM - 10:30 AM",
      "10:30 AM - 11:00 AM",

      "11:00 AM - 11:30 AM",
      "11:30 AM - 12:00 PM",

      "12:00 PM - 12:30 PM",
      "12:30 PM - 1:00 PM",

      "2:00 PM - 2:30 PM",
      "2:30 PM - 3:00 PM",

      "3:00 PM - 3:30 PM",
      "3:30 PM - 4:00 PM",

      "4:00 PM - 4:30 PM",
      "4:30 PM - 5:00 PM",
    ];

    // CURRENT TIME
    const now = new Date();

    // TODAY DATE
    const today = now.toISOString().split("T")[0];

    // GET BOOKED SLOTS
    const alreadyBooked = bookedCounsellingSlots
      .filter(
        (item) =>
          item.counsellor === counsellor &&
          item.date === date
      )
      .map((item) => item.slot);

    // FINAL SLOT DATA
    const slots = allSlots.map((slot) => {

      // SLOT START TIME
      const slotStart = slot.split(" - ")[0];

      // SLOT DATE TIME
      const slotDateTime = new Date(
        `${date} ${slotStart}`
      );

      // EXPIRED
      const expired =
        date === today &&
        slotDateTime < now;

      // BOOKED
      const booked =
        alreadyBooked.includes(slot);

      return {
        time: slot,
        booked,
        expired,
      };
    });

    res.status(200).json({
      success: true,
      slots,
    });

  } catch (error) {

    // console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch available slots",
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  bookCounselling,
  getAvailableSlots
};