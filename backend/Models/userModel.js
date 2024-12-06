const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Event Name"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
    unique: true,
  },
  image: {
    type: String,
    default: "gs://next-app-f9dba.appspot.com/users/Profile-Avatar-PNG.png",
  },
  password: {
    type: String,
    default: "",
    select: false,
  },
  mobileNo: {
    type: String,
    required: [true],
    maxLength: [10, "Phone Number cannot exceed 10 digits"],
  },
  designation: {
    type: String,
    enum: ["HR","Manager","Sales"],
  },
  createdBy:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: [true, "Please specify the gender"],
  },
  course: {
    type: String,
    enum: {
      values: ["MCA", "BCA", "BSC"],
      message: "Course must be either MCA, BCA, or BSC",
    },
    required: [true, "Please specify the course(s)"],
  },
  createdAt :{
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("save", function (next) {
  if (!this.createdBy) {
    this.createdBy = this._id;
  }
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);