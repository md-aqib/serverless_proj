const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('DB_URL')

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('testuser', userSchema);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post("/adduser", async(req, res) => {
  const { name, email } = req.body;
  let obj = {
    name,
    email
  };
  const newUser = await User.create(obj);
  return res.status(200).json({
    message: "Data added successfully", status: true, data: newUser
  });
});

app.get("/getuser", async(req, res) => {
  const list = await User.find({});
  return res.status(200).json({
    message: "Data found successfully", status: true, data: list
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
