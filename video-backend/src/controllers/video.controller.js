import mongoose from "mongoose";
import { Video } from "../models/video.model.js"


const getAllVideos = async (req, res) => {
    // Todo : get all videos based on query, sort, pagination
    // Read the values from req.query
    // Convert page and limit to numbers
    // Build a searchFilter object (what videos to find)
    // Build a sort object (what order)
    // Calculate how many videos to skip
    // Ask the database using your Video model
    // Count the total videos (for pagination info)
    // Send the response

    const {page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId} = req.query

    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    console.log(pageNumber)
    console.log(limitNumber)

    const searchFilter = {}

    if(query) {
        searchFilter.title = {$regex: query, $options: "i"}
    }

    if(userId){
        searchFilter.owner = userId
    }
    
    console.log(searchFilter)

    const sortOrderType = sortType === "asc" ? 1 : -1;

    console.log(sortOrderType)

    const sortOptions = { [sortBy]: sortOrderType }

    console.log(sortOptions)

    const skip = (pageNumber - 1) * limitNumber 

    console.log(skip)

    const totalVideos = await Video.countDocuments(searchFilter)
    const totalPages = Math.ceil(totalVideos / limitNumber)

    const videos = await Video.find(searchFilter).sort(sortOptions).skip(skip).limit(limitNumber)
    console.log(videos)

    return res
    .status(200)
    .json({
        statusCode:200,
        data: {
            videos,
            totalVideos,
            totalPages,
            currentPage : pageNumber,
        },
        message: "Videos fetched successfully"
    })
}

export {getAllVideos}