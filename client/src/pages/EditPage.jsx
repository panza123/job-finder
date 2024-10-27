import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axiosInstance';

const EditPage = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState(''); 
  const [timeType, setTimeType] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [qualifications, setQualifications] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axiosInstance.get(`jobs/jobs/${id}`);
        setTitle(res.data.job.title);
        setName(res.data.job.name);
        setDescription(res.data.job.description);
        setEmail(res.data.job.email);
        setNumber(res.data.job.number);
        setPrice(res.data.job.price);
        setTimeType(res.data.job.timeType);
        setLocation(res.data.job.location);
        setQualifications(res.data.job.qualifications || []); // Set qualifications as an array
      } catch (error) {
        toast.error("Error fetching job details");
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleQualificationsChange = (e) => {
    const input = e.target.value;
    setQualifications(input.split('\n')); // Split by line breaks for array format
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      name,
      description,
      email,
      number,
      price,
      timeType,
      location,
      qualifications // Qualifications array is included in the JSON data
    };

    try {
      const res = await axiosInstance.put(`/jobs/edit-job/${id}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success("Job edited successfully");
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mt-10">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Edit Job Details</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                placeholder="Job title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Job Price</label>
              <input
                type="number"
                placeholder="Job price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                required
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={number}
                required
                onChange={(e) => setNumber(e.target.value)}
                className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>
            <div>
              <h2 className="block mb-2 text-sm font-medium text-gray-700">Job Type</h2>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="timeType"
                    value="full-time"
                    checked={timeType === 'full-time'}
                    onChange={(e) => setTimeType(e.target.value)}
                    disabled={loading}
                  /> Full-time
                </label>
                <label>
                  <input
                    type="radio"
                    name="timeType"
                    value="part-time"
                    checked={timeType === 'part-time'}
                    onChange={(e) => setTimeType(e.target.value)}
                    disabled={loading}
                  /> Part-time
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job description"
              className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Qualifications</label>
            <textarea
              value={qualifications.join('\n')}
              required
              onChange={handleQualificationsChange}
              placeholder="Qualifications required for the job"
              className="w-full p-3 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all w-full"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPage;
