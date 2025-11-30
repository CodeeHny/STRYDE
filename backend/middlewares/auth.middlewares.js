import { User } from "../models/user.models";
import { ApiError } from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async (req, res, next) => {

    let token = req.cookies?.accessToken;
    if(!token) throw new ApiError(401, 'Unauthorized access');

    let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = User.findById(decodedToken.userId).select(' -password ');
    if(!user) throw new ApiError(401, "Incalid access token");

    req.user = user;

    next();
});
