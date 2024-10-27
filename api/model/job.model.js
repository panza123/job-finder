
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    timeType: {
        type: String,
        required: true,
        enum: ['full-time', 'part-time']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equal to 0']
    },
   
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // Email regex validation
    },
    number: {
        type: String,
        required: true,
       
    },
    name:{
        type: String,
        required: true
    },
    qualifications:{
        type: [String],
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

export default Job;
