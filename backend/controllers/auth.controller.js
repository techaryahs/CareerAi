const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Consultant = require("../models/Consultant");
const Teacher = require("../models/Teacher");
const axios = require("axios");

const otpStore = new Map();
const otpStoreMobile = new Map();

const { sendSMSOTP } = require("../utils/otpsms");

/* =========================
   REGISTER STUDENT (Base User)
========================= */
exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, dob, gender, country, state } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // 🔍 Check existing user
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 👤 Create user
    const newUser = new User({
      name,
      email: normalizedEmail,
      mobile,
      password: password, // Pre-save hook will hash
      dob,
      gender,
      country,
      state,
      role: "student",
      profile: {
        isPremium: false,
        isVerified: false
      }
    });

    await newUser.save();

    // 🔢 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    otpStore.set(normalizedEmail, { otp, expiresAt });

    // console.log("📌 Generated OTP for student:", otp, "Expires at:", new Date(expiresAt).toLocaleString());

    // 📧 Send OTP
    await sendEmail(
      normalizedEmail,
      "Verify Your Email - CareerGenAI",
      "",
      `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;
                  background:#ffffff;border-radius:10px;
                  box-shadow:0 10px 25px rgba(0,0,0,0.1);overflow:hidden;">

        <div style="background:#1e40af;padding:20px;text-align:center;color:white;">
          <h1 style="margin:0;">CareerGenAI</h1>
          <p style="margin:5px 0;font-size:14px;">AI Powered Career Guidance</p>
        </div>

        <div style="padding:30px;color:#0f172a;">
          <h2>Hello ${name}, 👋</h2>

          <p>
            Thank you for registering with <b>CareerGenAI</b>.
            Please use the OTP below to verify your email address.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <span style="
              display:inline-block;
              padding:15px 30px;
              font-size:28px;
              letter-spacing:6px;
              background:#f1f5f9;
              border-radius:8px;
              color:#1e40af;
              font-weight:bold;">
              ${otp}
            </span>
          </div>

          <p style="font-size:14px;">
            ⏰ This OTP is valid for <b>10 minutes</b>.
          </p>

          <p style="font-size:14px;color:#64748b;">
            If you didn’t request this, you can safely ignore this email.
          </p>

          <hr style="margin:30px 0;" />

          <p style="font-size:12px;color:#94a3b8;">
            © ${new Date().getFullYear()} CareerGenAI. All rights reserved.
          </p>
        </div>
      </div>
      `
    );

    res.status(200).json({
      message: "OTP sent to email successfully",
      email: normalizedEmail,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   RESEND OTP
========================= */
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      console.warn("⚠️ Resend OTP called without email");
      return res.status(400).json({
        message: "Email is required to resend OTP",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if already verified
    if (user.profile?.isVerified) {
      return res.status(400).json({
        message: "User is already verified",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

    // Save OTP in memory store
    otpStore.set(normalizedEmail, {
      otp,
      expiresAt,
    });

    // console.log(
    //   `📌 Resent OTP for ${normalizedEmail}: ${otp} (Expires: ${new Date(
    //     expiresAt
    //   ).toLocaleString()})`
    // );

    // Send email
    await sendEmail(
      normalizedEmail,
      "Resend - Verify Your Email",
      "",
      `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${user.name || "User"},</h2>

        <p>Your new OTP for email verification is:</p>

        <div style="
          font-size: 32px;
          font-weight: bold;
          color: #1e40af;
          letter-spacing: 6px;
          margin: 20px 0;
        ">
          ${otp}
        </div>

        <p>This OTP is valid for <strong>10 minutes</strong>.</p>

        <p>
          If you did not request this OTP, please ignore this email.
        </p>

        <br />

        <p>Regards,</p>
        <p><strong>CareerGenAI Team</strong></p>
      </div>
      `
    );

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });

  } catch (err) {
    console.error("❌ Resend OTP Error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while resending OTP",
    });
  }
};

/* =========================
   VERIFY OTP
========================= */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const storedData = otpStore.get(normalizedEmail);

    // console.log("📌 OTP Verification Attempt:");
    // console.log("Email:", normalizedEmail);
    // console.log("Entered OTP:", otp);
    // console.log("Stored Data:", storedData);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new OTP.",
      });
    }

    const isOtpMatch =
      String(storedData.otp).trim() === String(otp).trim();

    const isExpired = Date.now() > storedData.expiresAt;

    if (!isOtpMatch) {
      console.warn("❌ OTP Mismatch");

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (isExpired) {
      console.warn("❌ OTP Expired");

      otpStore.delete(normalizedEmail);

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please resend OTP.",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify profile
    if (!user.profile) {
      user.profile = {};
    }

    user.profile.isVerified = true;

    await user.save();

    // Remove OTP after successful verification
    otpStore.delete(normalizedEmail);

    // console.log(`✅ User verified: ${normalizedEmail}`);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      userId: user._id,
    });

  } catch (error) {
    console.error("❌ verifyOtp Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};

/* =========================
   LOGIN
========================= */
const generateToken = (id, role) => {
  return jwt.sign({ userId: id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.login = async (req, res) => {

  try {
    // 🔥 NORMALIZE INPUT
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // 1️⃣ FIND USER and populate nested Linked profiles
    const user = await User.findOne({ email }).populate('profile.teacherProfile profile.consultantProfile');

    // Use the model method matchPassword
    if (user && (await user.matchPassword(password))) {

      await user.save();

      const profile = user.profile || {};

      res.json({
        message: "Login successful",
        token: generateToken(user._id, user.role),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: profile.isVerified || false,
          mobile: user.mobile,
          profileImage: profile.profileImage || profile.teacherProfile?.image || profile.consultantProfile?.image || null,
          isPremium: profile.isPremium || false
        }
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   GET CURRENT USER
========================= */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").populate('profile.teacherProfile profile.consultantProfile');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Safety fallback
    if (!user.profile) {
      user.profile = {};
      await user.save();
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error("🔥 getMe error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   REGISTER TEACHER
========================= */
exports.registerTeacher = async (req, res) => {
  try {
    const {
      fullName, email, phone, password, experienceYears, bio,
      teachingField, program, selectedSubjects, teachingMode,
      onlinePrice, offlinePrice, offlineLocation, slots,
      qualificationFile, idProofFile
    } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    // 1️⃣ CHECK UNIQUE EMAIL
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 2️⃣ CREATE TEACHER PROFILE
    // We need to create the newTeacher first to get its ID, then pass it down
    let newTeacherId = null;
    const newTeacher = new Teacher({
      experienceYears: Number(experienceYears),
      bio,
      teachingField,
      program,
      selectedSubjects,
      teachingMode,
      onlinePrice: onlinePrice ? Number(onlinePrice) : undefined,
      offlinePrice: offlinePrice ? Number(offlinePrice) : undefined,
      offlineLocation,
      slots,
      qualificationFile,
      idProofFile
    });

    // We'll set the user ref after user is created
    // But we need to save the user first to get User ID.

    // 2️⃣ CREATE USER (Role: teacher)
    const newUser = new User({
      name: fullName,
      email: normalizedEmail,
      mobile: phone.replace('+91', ''),
      password: password, // Hashed by pre-save
      role: "teacher",
      profile: {
        isPremium: false,
        isVerified: false,
        teacherProfile: newTeacher._id
      }
    });
    await newUser.save();

    newTeacher.user = newUser._id;
    await newTeacher.save();

    // 6️⃣ GENERATE & SEND OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore.set(normalizedEmail, { otp, expiresAt });

    // console.log("📌 Generated OTP for Teacher:", otp);

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Hello ${fullName}, 👋</h2>
        <p>Thank you for registering as a Teacher on <b>CareerGenAI</b>.</p>
        <p>Your OTP is: <b style="font-size:24px;color:#1e40af;">${otp}</b></p>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `;

    await sendEmail(normalizedEmail, "Verify Teacher Account - CareerGenAI", "", emailHtml);

    res.status(201).json({
      message: "Teacher registered successfully. Please verify your email.",
      email: normalizedEmail
    });

  } catch (error) {
    console.error("❌ Teacher Registration Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   REGISTER CONSULTANT
========================= */
exports.registerConsultant = async (req, res) => {
  try {
    // console.log("📌 Incoming Consultant Registration Payload:", req.body);
    // console.log("📌 Incoming File Data:", req.file);

    let {
      name,
      email,
      password,
      role: consultantRole,
      expertise,
      experience,
      bio,
      availability,
      image
    } = req.body;

    // 1️⃣ HANDLE MULTIPART (FormData) PARSING
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (typeof availability === 'string') {
      try {
        availability = JSON.parse(availability);
      } catch (e) {
        console.warn("⚠️ Failed to parse availability string, keeping as is:", e.message);
      }
    }

    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail || !password || !name) {
      return res.status(400).json({ error: "Missing required basic fields (name, email, password)" });
    }

    // 2️⃣ CHECK UNIQUE EMAIL
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newConsultant = new Consultant({
      name,
      email: normalizedEmail,
      role: consultantRole,
      expertise,
      experience,
      bio,
      image,
      availability: availability || [], // Now array of objects {day, startTime, endTime}
      bookings: []
    });

    // 3️⃣ CREATE USER (Role: consultant)
    const newUser = new User({
      name,
      email: normalizedEmail,
      mobile: '0000000000', // Placeholder
      password: password,
      role: "consultant",
      profile: {
          isPremium: true,
          isVerified: false,
          consultantProfile: newConsultant._id
      }
    });
    await newUser.save();

    // 4️⃣ SAVE CONSULTANT
    newConsultant.user = newUser._id;
    await newConsultant.save();

    // 7️⃣ GENERATE & SEND OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore.set(normalizedEmail, { otp, expiresAt });

    // console.log("📌 Generated OTP for Consultant:", otp);

    const emailHtml = `
        <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Hello ${name}, 👋</h2>
        <p>Thank you for registering as a Consultant on <b>CareerGenAI</b>.</p>
        <p>Your OTP is: <b style="font-size:24px;color:#1e40af;">${otp}</b></p>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
        `;

    await sendEmail(normalizedEmail, "Verify Consultant Account - CareerGenAI", "", emailHtml);

    res.status(201).json({
      message: "OTP sent successfully. Please verify to complete registration.",
      email: normalizedEmail
    });

  } catch (error) {
    console.error("❌ Consultant Registration Error:", error);

    // Check for Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(', ') });
    }

    res.status(500).json({ error: "Server error: " + error.message });
  }
};

/* =========================
   REGISTER PARENT
========================= */
exports.registerParent = async (req, res) => {
  try {
    const { parentName, email, password, studentId } = req.body;

    // Check existing
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    // Validate Student
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ error: "Student not found" });
    }

    // Create Parent User
    const parent = new User({
      name: parentName,
      email,
      password,
      role: "parent",
      profile: {
          parentOf: [student._id],
          isVerified: false
      }
    });
    await parent.save();

    // Link Student to Parent Profile
    if (!student.profile) student.profile = {};
    if (!student.profile.parents) student.profile.parents = [];
    student.profile.parents.push(parent._id);
    await student.save();

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore.set(email, { otp, expiresAt });

    await sendEmail(email, "Verify Parent Account", "", `<p>OTP: ${otp}</p><p>Valid for 10 mins.</p>`);

    res.status(201).json({ message: "Parent registered", parentId: parent._id });

  } catch (error) {
    console.error("❌ Parent Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/* =========================
   FORGOT / RESET PASSWORD
========================= */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expiresAt: Date.now() + 600000 });

  await sendEmail(email, "Reset Password", "", `<p>OTP: ${otp}</p>`);
  res.json({ message: "OTP sent" });
};

exports.verifyForgotOtp = async (req, res) => {
  const { email, otp } = req.body;
  const data = otpStore.get(email);

  if (!data) return res.status(400).json({ error: "No OTP found" });

  const isOtpMatch = data.otp.toString() === otp.toString();
  const isExpired = Date.now() > data.expiresAt;

  if (!isOtpMatch) return res.status(400).json({ error: "Invalid OTP" });
  if (isExpired) return res.status(400).json({ error: "OTP expired" });

  res.json({ message: "Verified" });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const data = otpStore.get(email);

  if (!data) return res.status(400).json({ error: "No OTP found" });

  const isOtpMatch = data.otp.toString() === otp.toString();
  const isExpired = Date.now() > data.expiresAt;

  if (!isOtpMatch) return res.status(400).json({ error: "Invalid OTP" });
  if (isExpired) {
    otpStore.delete(email);
    return res.status(400).json({ error: "OTP expired" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });
  otpStore.delete(email);
  res.json({ message: "Password reset" });
};


exports.sendOtpMobile = async (req, res) => {
  try {

    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        error: "Mobile number is required"
      });
    }

    const otp =
      Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt =
      Date.now() + 10 * 60 * 1000;

    otpStoreMobile.set(mobile, {
      otp,
      expiresAt,
      verified: false
    });

    // console.log(`📱 Mobile OTP (${mobile}) : ${otp}`);

    const smsResult = await sendSMSOTP(
      mobile.replace("+91", ""),
      otp
    );

    if (!smsResult.success) {
      return res.status(500).json({
        error: smsResult.message
      });
    }

    res.json({
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to send OTP"
    });
  }
};


exports.verifyOtpMobile = async (req, res) => {
  try {

    const { mobile, otp } = req.body;

    const storedData =
      otpStoreMobile.get(mobile);

    if (!storedData) {
      return res.status(400).json({
        error: "No OTP found"
      });
    }

    if (
      storedData.otp.toString() !==
      otp.toString()
    ) {
      return res.status(400).json({
        error: "Invalid OTP"
      });
    }

    if (
      Date.now() >
      storedData.expiresAt
    ) {
      otpStoreMobile.delete(mobile);

      return res.status(400).json({
        error: "OTP expired"
      });
    }

    storedData.verified = true;

    otpStoreMobile.set(
      mobile,
      storedData
    );

    res.json({
      message: "Mobile verified successfully",
      verified: true
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Verification failed"
    });
  }
};