const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
  const token = req.cookie;
  if (!token || !jwt.verify(token, process.env.JWT_SECRETE_KEY)) {
    return res
      .status(401)
      .json({ message: "You're not authorized to access this page" });
  }
  next();
};

module.exports = authMiddleWare;
