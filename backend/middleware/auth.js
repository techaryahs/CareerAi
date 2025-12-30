const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
