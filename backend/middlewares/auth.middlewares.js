import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async (req, res, next) => {

    let token = req.cookies?.accessToken;
    if(!token) throw new ApiError(401, 'Unauthorized access');

    let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await User.findById(decodedToken.userId).select(' -password ');
    if(!user) throw new ApiError(401, "Incalid access token");

    req.user = user;

    next();
});

export const checkIsAdmin = asyncHandler(  (req, res, next ) => {
    
    let isAdmin = req.user.isAdmin;
    if (!isAdmin) throw new ApiError(401, 'Admin access denied');

    next()
}) 
 