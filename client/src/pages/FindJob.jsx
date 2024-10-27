import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axiosInstance';
import Loading from '../lib/Loading';
import { Link } from 'react-router-dom';

const FindJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/jobs/jobs')
      .then((res) => {
        console.log(res.data.jobs);
        setJobs(res.data.jobs);
        setLoading(false);
        toast.success('Data fetched successfully');
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Failed to fetch data');
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Jobs</h1>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {jobs.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/job/detail/${item._id}`}>
            
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-gray-600">{item.name}</p>
                  <p className="text-gray-600">{item.email}</p>
                  <p className="text-gray-600">{item.number}</p>
                  <p className="text-gray-600">{item.price ? `$${item.price}` : 'Salary not specified'}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default FindJob;
