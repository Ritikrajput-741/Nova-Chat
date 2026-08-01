import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/user_Model.js";

/* USER REGISTER API */

export const userRegister = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    // Check Requirement
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields required! ⛔",
      });
    }

    // Match password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password or Confirm Password is different! ⛔",
      });
    }

    // check existing user
    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "Username Already exist, Try new-one! ⛔",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // get images
    const maleAvatar = `https://avatarapi.runflare.run/public/boy?fullname=${username}`;
    const femaleAvatar = `https://avatarapi.runflare.run/public/girl?fullname=${username}`;

    // create user
    const newUser = await User.create({
      fullname,
      username,
      password: hashPassword,
      profilePhoto: gender === "male" ? maleAvatar : femaleAvatar,
      gender,
    });

    // response success...
    return res.status(201).json({
      success: true,
      message: "User Create Successfully ✅",
      newUser: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePhoto: newUser.profilePhoto,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error ⛔",
    });
  }
};

/* USER LOGIN API */

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check fields
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields required! ⛔",
      });
    }

    // find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // User data for create token
    const userData = {
      userId: user._id,
    };

    // create jwt token
    const token = jwt.sign(userData, process.env.JSON_SECRET_KEY, {
      expiresIn: "2d",
    });

    // token save into cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    //return response success ...
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.fullname}🫡`,
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePhoto: user.profilePhoto,
        gender: user.gender,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error ⛔",
    });
  }
};

/* USER LOGOUT API */

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out Successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error ⛔",
    });
  }
};

/* GET OTHER USER */
export const allOtherUser = async (req, res) => {
  try {
    const loggedInUser = req.userId;

    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password",
    );
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error ⛔",
    });
  }
};
