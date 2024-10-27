import React, { useEffect, useState } from 'react';
import { FaSearch, FaCar, FaMoneyBill } from 'react-icons/fa';
import { GiHealthNormal, GiFamilyHouse } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import Loading from '../lib/Loading';
import { axiosInstance } from '../lib/axiosInstance';
import { Link } from 'react-router-dom';

import toast from 'react-hot-toast';
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/jobs/jobs')
      .then((res) => {
        if (res.data && res.data.jobs) {
          setJobs(res.data.jobs);
          toast.success('Data fetched successfully');
        } else {
          toast.error('No jobs data found');
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Failed to fetch data');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='w-full h-full'>
      <div className='relative w-full h-[500px] z-[-1]'>
        <img 
          src='https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
          alt="Office setting with a modern design" 
          className="w-full h-full object-cover" 
        />
        <div className='absolute top-0 right-0 w-full h-full bg-black/40 flex flex-col items-center justify-center p-4'>
          <p className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center'>Build Your Future</p>
          <p className='mt-2 text-lg sm:text-xl md:text-2xl text-gray-300 text-center'>We offer job vacancies right now!</p>
        </div>
      </div>

      <div className='w-full h-auto bg-blue-200'>
        <div className='w-full p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center'>
          <div aria-label="HealthCare" className='flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105 hover:bg-blue-300 rounded-lg'>
            <GiHealthNormal size={40} className="text-blue-800" />
            <p className='mt-2 text-blue-800 font-semibold'>HealthCare</p>
          </div>

          <div aria-label="AutoMobile" className='flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105 hover:bg-blue-300 rounded-lg'>
            <FaCar size={40} className="text-blue-800" />
            <p className='mt-2 text-blue-800 font-semibold'>AutoMobile</p>
          </div>

          <div aria-label="FoodService" className='flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105 hover:bg-blue-300 rounded-lg'>
            <IoFastFood size={40} className="text-blue-800" />
            <p className='mt-2 text-blue-800 font-semibold'>FoodService</p>
          </div>

          <div aria-label="Logistics" className='flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105 hover:bg-blue-300 rounded-lg'>
            <BiWorld size={40} className="text-blue-800" />
            <p className='mt-2 text-blue-800 font-semibold'>Logistics</p>
          </div>

          <div aria-label="Finance" className='flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105 hover:bg-blue-300 rounded-lg'>
            <FaMoneyBill size={40} className="text-blue-800" />
            <p className='mt-2 text-blue-800 font-semibold'>Finance</p>
          </div>

          <div aria-label="Construction" className='flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105 hover:bg-blue-300 rounded-lg'>
            <GiFamilyHouse size={40} className="text-blue-800" />
            <p className='mt-2 text-blue-800 font-semibold'>Construction</p>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <h3 className='text-center text-2xl font-bold'>Job List</h3>
      </div>

      <div className='max-w-5xl mx-auto p-6'>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Link
              key={job._id}
              to={`job/detail/${job._id}`}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center p-4 bg-white shadow-lg rounded-lg mb-4 transition-transform duration-300 hover:scale-105 hover:bg-blue-50'
            >
              <div className='flex items-center space-x-4'>
                <div className=''>
                  <p className='text-xl font-semibold text-gray-800'>{job.title}</p>
                  <p className='text-gray-500'>{job.company}</p>
                </div>
              </div>
              <div className='mt-4 md:mt-0'>
                <p className='text-gray-500'>Email: {job.email}</p>
              </div>
              <div className='mt-4 lg:mt-0'>
                <p className='text-gray-500'>Phone: {job.number}</p>
              </div>
              <div className='mt-4 lg:mt-0 text-right'>
                <p className='text-blue-600 font-semibold'>View Details</p>
              </div>
            </Link>
          ))
        ) : (
          <div className='flex justify-center items-center h-64'>
            <p className='text-gray-500 text-lg'>Loading jobs...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
