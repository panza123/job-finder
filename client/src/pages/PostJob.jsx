import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [timeType, setTimeType] = useState('full-time'); 
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [qualifications, setQualifications] = useState(''); // qualifications as a string initially
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    // Split qualifications into an array by new line
    const qualificationsArray = qualifications.split('\n').map(q => q.trim()).filter(q => q !== '');

    const data = {
      title,
      name,
      price,
      description,
      timeType,
      location,
      email,
      number,
      qualifications: qualificationsArray // Send as an array
    };

    // Log the form data
    console.log("Form Data:", data);

    try {
      const res = await axiosInstance.post('jobs/job', data);
      console.log(res);
      toast.success("Job posted successfully");
      navigate('/'); // Redirect on success
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error occurred while submitting the form");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full ">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Post Job in Minutes</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                placeholder="Job title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
            {/* Company Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                placeholder="Company name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
            {/* Time Type (Radio Buttons) */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Time Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="full-time"
                    checked={timeType === 'full-time'}
                    onChange={(e) => setTimeType(e.target.value)}
                    className="mr-2"
                  />
                  Full-time
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="part-time"
                    checked={timeType === 'part-time'}
                    onChange={(e) => setTimeType(e.target.value)}
                    className="mr-2"
                  />
                  Part-time
                </label>
              </div>
            </div>
            {/* Salary */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Salary</label>
              <input
                type="text"
                placeholder="Salary"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
            {/* Location */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                required
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={number}
                required
                onChange={(e) => setNumber(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>
          {/* Job Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job description"
              className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          {/* Qualifications */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Qualifications</label>
            <textarea
              value={qualifications}
              required
              onChange={(e) => setQualifications(e.target.value)}
              placeholder="Qualifications required (one per line)"
              className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded bg-blue-600 text-white font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition duration-200'}`}
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
