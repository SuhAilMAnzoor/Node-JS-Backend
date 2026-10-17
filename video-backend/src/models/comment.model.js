import mongoose, {Schema} from "mongoose";
import mongooseAggregatePagniate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
{
    timestamps: true
})

commentSchema.plugin(mongooseAggregatePagniate)

export const Comment = mongoose.model("comments", commentSchema)