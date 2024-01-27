import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";


export const signup =  asyncHandler(async(req, res,next) => {
  const { username, email, password } = req.body;
  

  [username, email, password].some((field) => {
    if (field?.trim() === "") {
    throw new ApiError(400,"All fields are required!!!")
    }
  });

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400,"user already exists")
  }
const hashedPassword = bcryptjs.hashSync(password, 10);
const newUser = await User.create({
  username,
  email,
  password: hashedPassword,
});
 await newUser.save();
    if(!newUser){
        throw new ApiError(400,"something went wrong")
    }
    return res.status(201).json(
        new ApiResponse(201,"user created successfully")
    ) 
});

