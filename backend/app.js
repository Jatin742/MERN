const express = require("express");
const dotenv=require("dotenv").config();
const app = express();
const errorMiddleware = require("./Middlewares/error");
const cookieParser=require("cookie-parser");
const morgan=require("morgan");
const fileUpload=require("express-fileupload");
const cors=require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
  }));
app.use(morgan('dev'));
app.use(fileUpload());

const user = require("./Routes/userRoute");

app.use("/api/v1", user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;