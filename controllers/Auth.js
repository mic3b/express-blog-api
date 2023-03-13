import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register:
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login:
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "Sorry, User Does Not Exist" });

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch)
      return res.status(400).json({ message: "Sorry, Invalid Credentials" });

    const tkn = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).cookie("jwt", tkn, { httpOnly: true }).json({ tkn, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
