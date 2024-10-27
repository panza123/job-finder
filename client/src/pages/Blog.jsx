import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../lib/Loading';

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await axios.get('https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=59a1033bb71ae9522fc56d40af3ed426');
        setBlog(res.data.articles);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched or on error
      }
    };

    fetchBlogData(); // Call the async function
  }, []);

  if (isLoading) {
    return <Loading/>; // Show loading state while fetching
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* Grid layout */}
        {blog.map((item,index) => (
          <div key={index}  className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            {item.image && ( // Check if the image URL is available
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
