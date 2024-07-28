import cloudinary from 'cloudinary';
import fs from 'fs';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECREAT
});

const uploadToCloudinary = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        // Store the Cloudinary URL in the request object
        req.cloudinaryUrl = result.secure_url;

        // Unlink (delete) the file from the server
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error("Error unlinking file:", err);
            }
            else{
                //console.log("Deletd successfully");
            }
        });

        next();


    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({ msg: "Error uploading file to Cloudinary" });
    }
};

export { uploadToCloudinary };
