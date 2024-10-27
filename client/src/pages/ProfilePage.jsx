import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import edit and delete icons
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get('/jobs/fetch');
        setJobs(res.data.jobs);
        
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  // Pagination calculations
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle delete job
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/delete/${id}`);
      setJobs(jobs.filter((job) => job._id !== id)); 
      toast.success('Deleted successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete job');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Profile Page</h1>

      {jobs.length > 0 ? (
        <>
          {currentJobs.map((job) => (
            <div
              key={job._id} // Use _id here for consistency
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.description}</p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to={`/edit-page/${job._id}`} // Use _id here for consistency
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </Link>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(job._id)} // Use _id here for consistency
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-1 mx-1 rounded-full ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No jobs available.</p>
      )}
    </div>
  );
};

export default ProfilePage;
