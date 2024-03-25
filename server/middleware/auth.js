const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log('In verify Token')
    if (!token) {
      throw new Error("No token provided");
    }
    console.log('In verify Token 1.5')

    const {userId,isAdmin} = jwt.verify(token, process.env.TOKEN_KEY);
    console.log('In verify Token 1.6')

    req.user = {
      ...req.body,
      userId,
      isAdmin,
    };
    console.log('In verify Token 2')

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { verifyToken };
