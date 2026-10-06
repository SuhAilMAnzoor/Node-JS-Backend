// recommended this code, with asyncHandler wrapper to handle errors
//  in async functions no need to use try catch block in every controller function

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../services/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

generateAccessAndRefreshTokens = async (userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken =  user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Failed to generate access and refresh tokens")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend using postman, for now
    // validation must be added in backend as well in frontend - (no any field is empty, email is provided right or wrong)
    // check if user already exists in: by username and email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullName, email, username, password} = req.body
    // console.log("request body: ",req.body);
    
    // like beginner backend developer code approach, to validate each field is not empty,
    // using if else statement you can check each field is empty or not, if empty throw error
    if (!fullName || fullName.trim() === "") {
        throw new ApiError("Full name is required", 400)
    }
       
    // or better and advance approch to check all fields, if any field is empty throw error, using array and some method
    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400,"All fields are required")
    }
     // you can write validation as you want, like using regex to validate email, password strength, username length, etc. and throw error if not valid
     // validations can be written in a separate file and imported here, to keep the code clean and readable, and also can be reused in other controllers as well

    // check if user already exists in: by username OR email
    const existedUser = 
    await User.findOne({$or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists")
    }

//     const userByUsername = await User.findOne({ username });
//     if (userByUsername) {
//     throw new ApiError(409, "Username already taken");
// }
//     const userByEmail = await User.findOne({ email });
//     if (userByEmail) {
//     throw new ApiError(409, "Email already registered");
// }     
    // this check we in advace
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    //check in classic way
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    // console.log("req files:", req.files);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    //console.log("coverImage: ", coverImage);
    if (!avatar) {
        throw new ApiError(500, "Failed to upload avatar image");
    }

    const user = await User.create({
        fullName,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", // coverImage is optional, if not provided, set it to empty string
        username: username.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user")
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            createdUser,
            "User registered successfully"
        )
    )
})

const loginUser = asyncHandler( async (req, res) => {
    // read data from => req.body
    // check if user exists in db by email or username
    // password check
    // access and refresh token
    // send them in secure cookie
    // send repsonse

    const { email, username,  password } = req.body;

    if (!email || !username) {
        throw new ApiError(400, "Email or username is required");
    }


    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid user password!");
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,

    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
               accessToken, refreshToken 
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler( async (req, res) => {
     
})


export { registerUser, loginUser, logoutUser }