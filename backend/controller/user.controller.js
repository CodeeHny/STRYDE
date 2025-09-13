import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'

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

export {
  registerUser
}
//  input (frontend )
// check inputs , if user already registers
// ceate user
// 