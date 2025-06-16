const express = require("express");
const {
  // adminCreation,
  getLoginAdmin,
  postLoginAdmin,
  getAdminDashboard,
  adminLogout,
  deleteUser,
  getEditUserPage,
  postEditUser,
  searchUsers,
  getCreateUserPage,
  postCreateUser,
} = require("../controller/adminController");

const adminRouter = express.Router();

// Admin login
adminRouter.get("/login", getLoginAdmin);       // GET login page
adminRouter.post("/login", postLoginAdmin);     // POST login data

// Admin dashboard
adminRouter.get("/dashboard", getAdminDashboard);

// Admin logout
adminRouter.get("/logout", adminLogout);

// User management
adminRouter.get("/delete/:id", deleteUser);
adminRouter.get("/edit/:id", getEditUserPage);
adminRouter.post("/edit/:id", postEditUser);
adminRouter.get("/create", getCreateUserPage);
adminRouter.post("/create", postCreateUser);

// Search
adminRouter.get("/search", searchUsers);

// Optional: Uncomment if you want to use this route for initial admin setup
// adminRouter.post("/creation", adminCreation);

module.exports = adminRouter;
