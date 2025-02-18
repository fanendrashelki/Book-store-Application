const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth");

//sign up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check username length ?
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username length should be greather than 3" });
    }

    // check username already exists ?
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return res.status(400).json({ message: "username already exists" });
    }

    // check email already exists ?
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // check Password lenght
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length should be greather than 6" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "SignUp Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

//sign in
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check username
    const existUser = await User.findOne({ username: username });
    if (!existUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    await bcrypt.compare(password, existUser.password, (err, data) => {
      if (data) {
        const token = jwt.sign(
          { name: existUser.username, role: existUser.role },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        return res.status(200).json({
          id: existUser._id,
          role: existUser.role,
          token: token,
          message: "SignIn Successfully",
        });
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/get-user", authMiddleware, async (req, res) => {
  try {
    const { id } = req.headers;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const data = await User.findById(id).select("-password");
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

router.post("/address", authMiddleware, async (req, res) => {
  const { id } = req.headers;
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = await User.findByIdAndUpdate(id, { address: address });
  res.status(200).json({ message: "Address updated Successfully" });
});
module.exports = router;
