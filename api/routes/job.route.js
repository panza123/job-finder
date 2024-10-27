import express from 'express';
import { createJob, deleteJob, editPage, getJobByCreator, getJobID, getJobs } from '../contoller/job.contorller.js';


const router = express.Router();



// Create job route
router.post('/job', createJob);
router.get('/jobs', getJobs);
router.get('/jobs/:id',getJobID)
router.get('/fetch', getJobByCreator);

router.delete('/delete/:id', deleteJob);
router.put('/edit-job/:id',editPage)

export default router;
