import { useEffect, useState } from "react";
import Blog from './Blog';
import axios from 'axios';
import React from "react";

const AllBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="blogs-page-wrapper w-full">
      <div className="container-x mx-auto">
        <div className="w-full lg:flex lg:space-x-[30px]">
          <div className="lg:w-[270px]">
            {/* Add any filters or categories for blogs here */}
            <div className="w-full hidden lg:block h-[295px]">
              <img
                src={`/assets/images/ads-5.png`}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="blogs-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
              <div>
                <p className="font-400 text-[13px]">
                  <span className="text-qgray"> Showing</span> 1–12 of {blogs.length}{" "}
                  results
                </p>
              </div>
            </div>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
              {blogs.length > 0 ? blogs.map((blog: any) => (
                <Blog key={blog._id} blog={blog} />
              )) : <p>No blogs found</p>}
            </div>
            <div className="w-full h-[164px] overflow-hidden mb-[40px]">
              <img
                src={`/assets/images/ads-6.png`}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
              { }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogPage;