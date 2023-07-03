const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json("You're not authorized to access this page");
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json("You're not authorized to access this page");
  }
};

module.exports = authMiddleWare;
