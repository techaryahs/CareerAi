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

  if (!email || !receiptUrl) {
    return res.status(400).json({ error: 'Email and receipt URL are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.receiptUrl = receiptUrl;
    user.receiptStatus = 'pending';
    await user.save();

    const adminEmail = process.env.ADMIN_NOTIFY_TO || 'tech.aryahas@gmail.com';
    const subject = `📤 New Premium Request from ${user.name}`;
    const html = `...YOUR FULL HTML EXACTLY AS-IS...`;

    await sendEmail(adminEmail, subject, '', html);

    res.json({ message: '✅ Receipt saved and admin notified successfully' });
  } catch (err) {
    console.error('❌ Receipt Save Error:', err.message);
    res.status(500).json({ error: 'Server error saving receipt' });
  }
};

/* =========================
   SAVE API KEY
========================= */
exports.saveApiKey = async (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required.' });
  }

  try {
    let existing = await ApiKey.findOne();
    if (existing) {
      existing.key = apiKey;
      await existing.save();
    } else {
      await ApiKey.create({ key: apiKey });
    }

    const envPath = path.join(process.cwd(), ".env"); // ✅ FIX
    let env = fs.readFileSync(envPath, "utf8");

    const regex = /^OPENROUTER_API_KEY=.*$/m;
    if (regex.test(env)) {
      env = env.replace(regex, `OPENROUTER_API_KEY=${apiKey}`);
    } else {
      env += `\nOPENROUTER_API_KEY=${apiKey}\n`;
    }

    fs.writeFileSync(envPath, env);

    res.status(200).json({
      message: 'API key saved and .env updated. Please restart your server!'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while saving API key.' });
  }
};

/* =========================
   GET RECEIPTS
========================= */
exports.getReceipts = async (req, res) => {
  try {
    const users = await User.find({
      receiptUrl: { $exists: true, $ne: null },
      receiptStatus: { $in: ['pending', 'approved'] }
    }).select('name email receiptUrl updatedAt receiptStatus');

    res.json({ users });
  } catch (err) {
    console.error('❌ Error fetching receipts:', err.message);
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
    const planDuration = {
      '1month': 30,
      '2months': 60,
      '3months': 90,
      'default': 0,
    };

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isPremium = true;
    user.premiumPlan = plan || 'default';
    user.receiptStatus = 'approved';

    const days = planDuration[user.premiumPlan] || 0;
    user.premiumExpiresAt = new Date(Date.now() + days * 86400000);

    await user.save();

    const subject = '🎉 Your Premium Plan Has Been Approved!';
    const html = `...YOUR FULL HTML EXACTLY AS-IS...`;

    await sendEmail(user.email, subject, '', html);

    res.json({ message: '✅ User approved and email sent' });
  } catch (err) {
    console.error('Approval error:', err);
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

    user.receiptUrl = null;
    user.receiptStatus = 'denied';
    await user.save();

    const subject = '❌ Premium Request Denied';
    const html = `...YOUR FULL HTML EXACTLY AS-IS...`;

    await sendEmail(email, subject, '', html);

    res.json({ message: '🚫 Receipt denied and user notified via email' });
  } catch (err) {
    console.error('Deny error:', err.message);
    res.status(500).json({ error: 'Server error denying receipt' });
  }
};

/* =========================
   REGISTER CONSULTANT
========================= */
exports.registerConsultant = async (req, res) => {
  try {
    const consultantData = req.body;
    const consultant = new Consultant(consultantData);
    await consultant.save();

    res.status(201).json({ message: 'Consultant registered successfully' });
  } catch (error) {
    console.error('Consultant Registration Error:', error);
    res.status(500).json({ error: 'Server error while registering consultant' });
  }
};
