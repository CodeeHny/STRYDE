import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const registerUser = asyncHandler(async (req, res) => {
  let { username, email, password, phone, address } = req.body;
  if (
    [username, email, password, phone].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Every field is required");
  }
});
