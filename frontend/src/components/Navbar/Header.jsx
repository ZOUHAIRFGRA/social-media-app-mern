import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBar/SearchBox";
import ProfileDetails from "./ProfileDetails";
import NewPost from "./NewPost";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MessageIcon from "@mui/icons-material/Message";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  const [profileToggle, setProfileToggle] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Set dark mode by default

  const location = useLocation();
  const [onHome, setOnHome] = useState(false);
  const [onChat, setOnChat] = useState(false);

  useEffect(() => {
    setOnHome(location.pathname === "/");
    setOnChat(location.pathname.split("/").includes("direct"));
  }, [location]);

  return (
    <nav
      className={`fixed top-0 w-full border-b ${
        darkMode ? "bg-gray-900 text-white" : "bg-white"
      } z-10`}
    >
      {/* Navbar container */}
      <div className="flex flex-row justify-between items-center py-2 px-3.5 sm:w-full sm:py-2 sm:px-4 md:w-full md:py-2 md:px-6 xl:w-4/6 xl:py-3 xl:px-8 mx-auto">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold">
          {"Social App"}
        </Link>

        <SearchBox />

        {/* Icons container */}
        <div className="flex items-center space-x-6 sm:mr-5">
          <Link to="/" className="text-white">
            {onHome ? <HomeIcon /> : <HomeOutlinedIcon />}
          </Link>
          <Link to="/direct/inbox" className="text-white">
            {onChat ? <MessageIcon /> : <MessageOutlinedIcon />}
          </Link>
          <div
            onClick={() => setNewPost(true)}
            className="cursor-pointer text-white"
          >
            <AddBoxOutlinedIcon />
          </div>

          <div
            onClick={() => setProfileToggle(!profileToggle)}
            className={`${
              (profileToggle && "border-black border") ||
              (!onHome && !onChat && "border-black border")
            } rounded-full cursor-pointer h-7 w-7 p-[0.5px]`}
          >
            <img
              draggable="false"
              loading="lazy"
              className="w-full h-full rounded-full object-cover"
              src={user.avatar.url}
              alt=""
            />
          </div>
        </div>

        {profileToggle && (
          <ProfileDetails setProfileToggle={setProfileToggle} />
        )}
        <NewPost newPost={newPost} setNewPost={setNewPost} />
      </div>
    </nav>
  );
};

export default Header;
