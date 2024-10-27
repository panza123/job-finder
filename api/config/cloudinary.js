import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()
cloudinary.config({
cloud_name:process.env.CLOUDINAY_NAME,
api_key:process.env.COUDINAY_API_KEY,
api_secret:process.env.COUDINAY_API_SECRET

})

export default cloudinary