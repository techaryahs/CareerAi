const User = require("../models/User");
const Consultant = require("../models/Consultant");
const ApiKey = require("../models/ApiKey");
const sendEmail = require("../utils/sendEmail");

const fs = require("fs");
const path = require("path");

/* =========================
   SUBMIT RECEIPT
========================= */
exports.submitReceipt = async (req, res) => {
  const { email, receiptUrl } = req.body;

  if (!email || !receiptUrl) return res.status(400).json({ error: 'Email and receipt URL are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.profile) user.profile = {};
    user.profile.receiptUrl = receiptUrl;
    user.profile.receiptStatus = 'pending';
    await user.save();

    const adminEmail = process.env.ADMIN_NOTIFY_TO || 'tech.aryahas@gmail.com';
    const subject = `📤 New Premium Request from ${user.name}`;
    const html = `<p>A new user ${user.name} submitted a premium receipt.</p><a href="${receiptUrl}">View</a>`;

    await sendEmail(adminEmail, subject, '', html);
    res.json({ message: '✅ Receipt saved and admin notified successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error saving receipt' });
  }
};

/* =========================
   SAVE API KEY
========================= */
exports.saveApiKey = async (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey) return res.status(400).json({ error: 'API key is required.' });

  try {
    let existing = await ApiKey.findOne();
    if (existing) {
      existing.key = apiKey; await existing.save();
    } else {
      await ApiKey.create({ key: apiKey });
    }

    const envPath = path.join(process.cwd(), ".env");
    let env = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
    const regex = /^OPENROUTER_API_KEY=.*$/m;
    if (regex.test(env)) {
      env = env.replace(regex, `OPENROUTER_API_KEY=${apiKey}`);
    } else {
      env += `\\nOPENROUTER_API_KEY=${apiKey}\\n`;
    }
    fs.writeFileSync(envPath, env);

    res.status(200).json({ message: 'API key saved and .env updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while saving API key.' });
  }
};

/* =========================
   GET RECEIPTS
========================= */
exports.getReceipts = async (req, res) => {
  try {
    const usersWithReceipts = await User.find({
      "profile.receiptUrl": { $exists: true, $ne: null },
      "profile.receiptStatus": { $in: ['pending', 'approved'] }
    });

    const users = usersWithReceipts.map(u => ({
        name: u.name,
        email: u.email,
        receiptUrl: u.profile.receiptUrl,
        updatedAt: u.updatedAt,
        receiptStatus: u.profile.receiptStatus
    }));

    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching receipts' });
  }
};

/* =========================
   APPROVE USER
========================= */
exports.approveUser = async (req, res) => {
  const { email, plan } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (!user.profile) user.profile = {};

    user.profile.isPremium = true;
    user.profile.premiumPlan = plan || 'default';
    user.profile.receiptStatus = 'approved';

    const planDuration = { '1month': 30, '2months': 60, '3months': 90, 'default': 0 };
    const days = planDuration[user.profile.premiumPlan] || 0;
    user.profile.premiumExpiresAt = new Date(Date.now() + days * 86400000);

    await user.save();

    await sendEmail(user.email, '✅ Premium Approved', '', `<p>Hi ${user.name}, approved!</p>`);
    res.json({ message: '✅ User approved and email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Server error approving user' });
  }
};

/* =========================
   DENY USER
========================= */
exports.denyUser = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.profile) user.profile = {};

    user.profile.receiptUrl = null;
    user.profile.receiptStatus = 'denied';
    await user.save();

    await sendEmail(email, '❌ Premium Denied', '', `<p>Denied.</p>`);
    res.json({ message: '🚫 Receipt denied and user notified' });
  } catch (err) {
    res.status(500).json({ error: 'Server error denying receipt' });
  }
};

/* =========================
   REGISTER CONSULTANT
========================= */
exports.registerConsultant = async (req, res) => {
  try {
    const consultant = new Consultant(req.body);
    await consultant.save();
    res.status(201).json({ message: 'Consultant registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while registering consultant' });
  }
};
