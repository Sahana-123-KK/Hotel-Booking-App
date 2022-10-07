const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  console.log("hello i am a middleware");
  try {
    const token = req.cookies.jwtoken;
    if (!token) {
      return res.status(402).json({ error: "Not Authenticated" });
    }

    const data = jwt.verify(token, process.env.JWT_KEY);
    if (!data) {
      return res.status(402).json({ error: "Token Not Valid" });
    }
    req.user = data;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyUser = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.id === req.user.user || req.user.isAdmin) {
      next();
    } else {
      return res.status(402).json({ error: "Not Authorized" });
    }
  });
};

const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(402).json({ error: "Not Authorized" });
    }
  });
};

module.exports = { verifyToken, verifyUser ,verifyAdmin};
