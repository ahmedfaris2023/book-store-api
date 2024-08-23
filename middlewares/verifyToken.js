const jwt = require("jsonwebtoken");
//verify token
function verifytoken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decode;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

//verify Token & Authorize the user
function verfiyTokenAndHuthorizat(req, res, next) {
  verifytoken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "you are not allowed" });
    }
  });
}

//verify Token & Admin
function verfiyTokenAndAdmin(req, res, next) {
  verifytoken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "you are not allowed ,only admin" });
    }
  });
}

module.exports = {
  verifytoken,
  verfiyTokenAndHuthorizat,
  verfiyTokenAndAdmin,
};
