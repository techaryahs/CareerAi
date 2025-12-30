const nodemailer = require('nodemailer');

// Define card names if not already globally available
const cardNames = {
  linkedin: 'LinkedIn Profile',
  naukri: 'Naukri.com Profile',
  resume: 'Professional Resume',
  github: 'GitHub Profile',
  portfolio: 'Portfolio Website',
  'cover-letter': 'Winning Cover Letter',
};
exports.sendEnquiry = async (req, res) => {
  console.log('📩 Enquiry received:', req.body);

  const { email, message, profileType } = req.body;

  if (!email || !message || !profileType) {
    return res.status(400).json({ error: 'Email, message, and profile type required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Cards Enquiry" <${process.env.MAIL_USER}>`,
      to: process.env.RECIPIENT_MAIL,
      subject: `New ${cardNames[profileType] || profileType} Enquiry`,
      text: `
New enquiry received:

👤 Email: ${email}
📋 Profile: ${cardNames[profileType] || profileType}
💬 Message: ${message}

🕒 ${new Date().toLocaleString()}
      `.trim(),
    });

    res.status(201).json({ ok: true, message: 'Enquiry sent!' });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    
    if (error.code === 'EAUTH') {
      res.status(500).json({ error: 'Email authentication failed. Check app password.' });
    } else {
      res.status(500).json({ error: 'Failed to send email' });
    }
  }
};