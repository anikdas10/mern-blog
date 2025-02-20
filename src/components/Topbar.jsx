import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import SearchBox from './SearchBox';
const Topbar = () => {
    return (
      <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
        <div>
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
            <span className="text-violet-600">G</span>Blog
          </h2>
        </div>

        <div className='w-44 md:w-[500px]'>
            <SearchBox/>
        </div>

        <div>
          <Button asChild className="bg-violet-600 rounded-full">
            <Link to="/sign-in">
              <FaSignInAlt />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    );
};

export default Topbar;