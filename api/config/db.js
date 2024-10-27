import mongoose from "mongoose";


export const connectDB = async ()=>{
   try{

    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
   }catch(err){
      console.error(`Error connecting to MongoDB: ${err.message}`)
      process.exit(1) // Exit process with failure
   }
}