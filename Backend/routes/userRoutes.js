const express = require("express");
const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

// Register a new user
userRouter.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  // Input validation
  if (!fullName || !email || !password) {
    return res.status(400).send({ msg: "All fields are required" });
  }

  if (password.length < 8) {
    return res.status(400).send({ msg: "Password must be at least 8 characters" });
  }

  try {
    // Check for unique email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const user = new UserModel({ fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).send({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

// Login a user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ msg: "Email and password are required" });
  }

  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.status(200).send({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

// Get user items for the user
userRouter.get("/", async (req, res) => {
  try {
    const product = await UserModel.find();
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
