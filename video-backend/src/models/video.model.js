import mongoose from "mongoose";
import mongooseAggregatePagniate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
    videoFile: {
        type:String,  //cloudinary url
        required: true
    },
    thumbnail: {
        type:String,    //cloudinary url
        required: true
    },
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    duration: {
        type: Number,   // from cloudinary 
        required: true
    },
    views: {
        type:Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    

    
}, {timestamps: true})

// here .plugin() is hook
videoSchema.plugin(mongooseAggregatePagniate)

export const Video = mongoose.model("Video", videoSchema)