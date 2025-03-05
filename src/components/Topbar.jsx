import React from 'react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import axios from 'axios';
import { removeUser } from '@/redux/user/user.slice';
import { RouteIndex } from '@/helpers/RouteName';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import avatar from "@/assets/user.png"
const Topbar = () => {
  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // console.log(user);
  const handleLogout = async()=>{
    try {
      const responses = await axios.get(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
      );
      console.log(responses);

      if (!responses.statusText === "OK") {
        showToast("error", responses.data.message);
        return;
      }
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", responses.data.message);
    } catch (err) {
      console.log(err);
      showToast("error", err.message);
    }
  }
    return (
      <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
        <div>
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
            <span className="text-violet-600">G</span>Blog
          </h2>
        </div>

        <div className="w-44 md:w-[500px]">
          <SearchBox />
        </div>

        <div>
          {!user.isLoggedIn ? (
            <Button asChild className="bg-violet-600 rounded-full">
              <Link to="/sign-in">
                <FaSignInAlt />
                Sign In
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    className="cursor-pointer"
                    src={user?.user?.avatar || avatar}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{user?.user?.name}</p>
                  <p className="text-xs">{user?.user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/profile">
                    <CgProfile /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="">
                    <FaPlus /> Create Blog
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                  
                >
                  <MdLogout color="red" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    );
};

export default Topbar;