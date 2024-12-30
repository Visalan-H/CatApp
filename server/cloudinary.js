import cloudinary from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CNAME,  // Replace with your Cloudinary cloud name
    api_key: process.env.CKEY,       // Replace with your Cloudinary API key
    api_secret: process.env.CSECRET, // Replace with your Cloudinary API secret
});

export default cloudinary;
