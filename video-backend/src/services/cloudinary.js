import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

  // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath) return null
            // upload the file on cloudinary
           const response =await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            // file has been uploaded sucessfully
           // console.log("file is uploaded on cloudinary",response.url);
            fs.unlinkSync(localFilePath) // removed locally saved temporary file as file upload operation is successful
            // console.log("full response of cloundinary is this: ",response, "END here");
            return response;
        } catch (error){
            fs.unlinkSync(localFilePath) // removed locally saved temporary file as 
            return null;    // file upload operation got failed
        }
    }

    export {uploadOnCloudinary}