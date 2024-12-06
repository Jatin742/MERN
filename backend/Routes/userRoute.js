const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getAllCreatedUsers,
  createUser,
  getCreatedUserDetails,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");
const { isAuthenticatedUser} = require("../Middlewares/auth");

const Router = express.Router();

Router.route("/register").post(registerUser);

Router.route("/login").post(loginUser);

Router.route("/logout").get(logout);

Router.route("/me").get(isAuthenticatedUser, getUserDetails);

Router.route("/all/users").get(isAuthenticatedUser, getAllCreatedUsers);

Router.route("/create/user").post(isAuthenticatedUser, createUser);

Router.route("/user/:id").get(isAuthenticatedUser, getCreatedUserDetails)
.put(isAuthenticatedUser, updateUser)
.delete(isAuthenticatedUser, deleteUser);

module.exports = Router;