import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import Job from '../model/job.model.js';

// Create Job

export const createJob = async (req, res) => {
    try {
        const { token } = req.cookies; // Get the token from cookies
        const { title, timeType, price, location, description, email, number, name, qualifications } = req.body;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, token not provided' });
        }
        console.log('Request received to create a job:', req.body);
        
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }

        const foundedUser = await User.findById(decoded.id);
        if (!foundedUser) {
            return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
        }

        if (!title || !timeType || !price || !location || !email || !number || !description || !qualifications) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Ensure qualifications is an array
        const qualificationsArray = Array.isArray(qualifications) ? qualifications : [qualifications];

        const newJob = await Job.create({
            owner: foundedUser._id,
            title,
            timeType,
            price,
            location,
            email,
            number,
            description,
            name,
            qualifications: qualificationsArray // Save as an array
        });

        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            job: newJob
        });
        
        console.log('New job created:', newJob);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Job creation failed', error: err.message });
    }
};

// Get Job by ID
export const getJobID = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, message: 'Job retrieved successfully', job });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to get job ID', error: err.message });
    }
};

// Get All Jobs
export const getJobs = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, token not provided' });
        }

        const jobs = await Job.find({}).lean();

        const formattedJobs = jobs.map(job => ({
            ...job
          
        }));

        res.status(200).json({
            success: true,
            message: 'Jobs retrieved successfully',
            jobs: formattedJobs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to get jobs', error: err.message });
    }
};

// Get Jobs by Creator
export const getJobByCreator = async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id } = req.params;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, token not provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }

        const user = await User.findById(decoded.id).select("_id");
        const jobs = await Job.find({ owner: user._id });

        res.status(200).json({
            success: true,
            message: 'Jobs retrieved successfully',
            jobs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to get jobs by creator', error: err.message });
    }
};

// Delete Job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to delete job', error: err.message });
    }
};

// Edit Job
export const editPage = async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.params;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, token not provided' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    console.log("Decoded token data:", decoded);


    try {
        console.log("Edit request body:", req.body);  // Log request body for debugging
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
            job: updatedJob
        });
        console.log("Updated job result:", updatedJob);
        

    } catch (err) {
        console.error("Failed to edit job:", err.message);
        res.status(500).json({ success: false, message: 'Failed to edit job', error: err.message });
    }
};
