import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axiosInstance.get(`jobs/jobs/${id}`);
        setJob(res.data.job); 
      } catch (err) {
        toast.error('Failed to fetch job details');
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    toast.success('Job application submitted!');
    setTimeout(() => {
      navigate('/'); // Redirect to the home page after applying
    }, 1500); // Delay to show the toast before redirecting
  };

  if (!job) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="w-full h-full mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col space-y-3">
          <p className="text-lg font-semibold text-gray-600">Location: <span className="text-gray-800">{job.location}</span></p>
          <p className="text-lg font-semibold text-gray-600">Company Name: <span className="text-gray-800">{job.name}</span></p>
          <p className="text-lg font-semibold text-gray-600">Price: <span className="text-gray-800">${job.price}</span></p>
          <p className="text-lg font-semibold text-gray-600">Contact Email: <span className="text-gray-800">{job.email}</span></p>
          <p className="text-lg font-semibold text-gray-600">Phone Number: <span className="text-gray-800">{job.number}</span></p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>
      
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Qualifications</h2>
        <ul className="list-disc list-inside text-xl text-gray-800">
          {job.qualifications.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between space-x-4">
        <button
          onClick={() => navigate('/find-job')}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Back
        </button>
        <button
          onClick={handleApply}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Apply for this job
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
