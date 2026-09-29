import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type:String,
        required:true,
        trim:ture,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required:true,
    },
    coverimage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, {timestamps:true})

  //.pre() is hook    and save is event on which pre hook then callback
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.passowrd = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPassowrdCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)