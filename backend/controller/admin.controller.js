import { User } from "../models/user.models";
import { ApiError } from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  let isPassCorrect = bcrypt.compare(password, user.password);
  if (!isPassCorrect) throw new ApiError(400, "Invalid password");

  if (!user.isAdmin) throw new ApiError(403, "Admin access denied");

  let accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_ACCESS_TOKEN_EXPIRY
  );

  console.log(accessToken);

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .json(
      new ApiResponse(200, { user, accessToken }, "User logged in successfully")
    );
});
