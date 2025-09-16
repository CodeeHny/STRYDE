import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const registerUser = asyncHandler(async (req, res) => {

  let { username, email, password, phone, address } = req.body;
  if ([username, email, password, phone].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Every field is required");
  }

  // To check if phone only contain digits 
  if (!/^\d+$/.test(phone)) {
    throw new ApiError(400, "Phone number must contain only digits");
  }
  let existedUser = await User.findOne({
    $or: [
      { email },
      { phone },
    ]
  });

  if (existedUser) throw new ApiError(400, "Email or Phone already in used");

  let hashPassword = await bcrypt.hash(password, 10);

  let user = await User.create({
    username,
    email,
    password: hashPassword,
    phone,
    address
  })

  let createdUser = await User.findById(user._id).select("-password ");

  if (!createdUser) throw new ApiError(400, "something went wrong while registering user");

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {

  let { emailOrPhone, password } = req.body;

  if ([emailOrPhone, password].some((field) => field?.trim() === '')) throw new ApiError(400, "All fields are required ");

  let query = {};
  
  if (emailOrPhone.includes('@')) {
    query.email = emailOrPhone;
  } else if (/^\d+$/.test(emailOrPhone)) {
    query.phone = emailOrPhone;
  } else {
    throw new ApiError(400, "Please provide valid email or phone number")
  }
  
  let user = await User.findOne(query);
  console.log(query, user)
  if (!user) throw new ApiError(404, "User not found");

  let isPasswordCorrect = bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new ApiError(400, "Password is incorrect");

  let accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_ACCESS_TOKEN_EXPIRY,
  )

  console.log(accessToken);

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .json(
      new ApiResponse(200, { user, accessToken }, "User logged in successfully")
    );

})
export {
  registerUser,
  loginUser,
}
//  input (frontend )
// check inputs , if user already registers
// ceate user
// 