const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../middleware/generateToken");

//asyncHandler going to handle all of error in our application

//for registration of user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //query of mongoDB wich check if the user already exist in database
  const userExists = await User.findOne({ email });

  //if user exist
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //we are sending token to auth frontend our backend, with JWT Token
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

//for login of user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //controls user that exist with email
  const user = await User.findOne({ email });

  //if password is true returns id, name, email,pic..
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    //if user does not found gives error
  } else {
    res.status(400);
    throw new Error("Invalid email or Password!");
  }
});

module.exports = { registerUser, authUser };
