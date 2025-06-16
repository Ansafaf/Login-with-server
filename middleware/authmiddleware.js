const User = require('../model/User');

const authMiddleware = async (req, res, next) => {
  try {
    // First, check if the session and user data exist
    if (!req.session.user || !req.session.user.id) {
      return res.redirect('/login');  // or '/' based on your app
    }
    // Safe to access req.session.user.id now
    const user = await User.findById(req.session.user.id);

    if (!user) {
      // User is deleted → destroy session and redirect
      req.session.destroy(() => {
        res.clearCookie('connect.sid'); // use the default session cookie name
        return res.redirect('/');
      });
    } else {
      next(); // User exists → continue
    }
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authMiddleware;
