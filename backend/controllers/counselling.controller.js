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

    // GENERATE OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    // STORE OTP
    otpStore[phone] = otp;

    // DLT APPROVED MESSAGE
    const message = encodeURIComponent(
      `Your NexSalon login OTP is ${otp}. Valid for 5 minutes. Do not share this OTP with anyone.`
    );

    // MSG91 URL
    const smsUrl =
      `https://control.msg91.com/api/sendhttp.php` +
      `?authkey=${process.env.MSG91_AUTH_KEY}` +
      `&mobiles=${mobile.replace("+91", "")}` +
      `&message=${message}` +
      `&sender=NXSLON` +
      `&route=1` +
      `&country=91` +
      `&DLT_TE_ID=1107177133272980578`;
    // SEND SMS
    await axios.get(smsUrl);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};


// =====================================
// VERIFY OTP
// =====================================
const verifyOtp = async (req, res) => {
  try {

    const { phone, otp } = req.body;

    if (otpStore[phone] == otp) {

      otpStore[phone] = "VERIFIED";

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "OTP verification failed",
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

    console.log(error);

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

    console.log(error);

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