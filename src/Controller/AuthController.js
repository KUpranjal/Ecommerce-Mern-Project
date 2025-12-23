const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/User");






const signup = async (req, res) => {
  try {
    const { firstName, lastName, userName, password, mobileNumber, profilePicture , role } = req.body;

    if (!firstName || !lastName || !userName || !password || !mobileNumber || !role) {
      throw new Error("All fields are required");
    }

    if (firstName.length < 3 || firstName.length > 10) {
      throw new Error("First name must be 3–10 characters");
    }

    if (lastName.length < 3 || lastName.length > 15) {
      throw new Error("Last name must be 3–15 characters");
    }

    if (userName.length < 5 || userName.length > 15) {
      throw new Error("Username must be 5–15 characters");
    }

    if (password.length < 8 || password.length > 15) {
      throw new Error("Password must be 8–15 characters");
    }

    if (!validator.isMobilePhone(mobileNumber, "en-IN")) {
      throw new Error("Enter a valid 10-digit mobile number");
    }

    const foundUser = await User.findOne({ userName });
    if (foundUser) {
      throw new Error("Username already exists");
    }
  let userRole = ["buyer", "seller"].includes(role) ? role : "buyer";

    const isPasswordStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });

    if (!isPasswordStrong) {
      throw new Error("Password is not strong enough");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      mobileNumber,
      profilePicture,
      role: userRole
    });

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





const signin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      throw new Error("Username and password are required");
    }

    const foundUser = await User.findOne({ userName });
    if (!foundUser) {
      throw new Error("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET
    );

    const { firstName, lastName, userName: un, profilePicture, role ,cart} = foundUser;

    res.cookie("loginToken", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
    }).status(200).json({
      msg: "Login successful",
      data: { firstName, lastName, userName: un, profilePicture, role,cart }
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};






const signout = async (req, res) => {
  res
    .cookie("loginToken", null, { maxAge: 0 })
    .status(200)
    .json({ success: true, msg: "You are logout Now" });
};

module.exports = {
  signup,
  signin,
  signout
};
