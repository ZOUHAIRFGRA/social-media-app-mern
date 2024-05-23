import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { ClickAwayListener } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const ProfileDetails = ({ setProfileToggle }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const tabs = [
        {
            title: "Profile",
            icon: <PersonOutlineIcon />,
            redirect: `/${user.username}`
        },
        
        {
            title: "Settings",
            icon: <SettingsOutlinedIcon />,
            redirect: "/accounts/edit"
        },
        
    ];

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
        toast.success("Logout Successfully");
    };

    return (
        <ClickAwayListener onClickAway={() => setProfileToggle(false)}>
            <div className="absolute w-56 bg-gray-800 text-white rounded drop-shadow top-14 right-0 md:right-72 md:top-14 border border-gray-700">
                <div className="absolute right-5 -top-2 rotate-45 h-4 w-4 bg-gray-800 rounded-sm border-l border-t border-gray-700"></div>

                <div className="flex flex-col w-full overflow-hidden">
                    {tabs.map((el, i) => (
                        <Link to={el.redirect} className="flex items-center gap-3 p-2.5 text-sm pl-4 cursor-pointer hover:bg-gray-700" key={i}>
                            {el.icon}
                            {el.title}
                        </Link>
                    ))}
                    <button onClick={handleLogout} className="flex rounded-b border-t-2 items-center gap-3 p-2.5 text-sm pl-4 cursor-pointer hover:bg-gray-700 border-gray-700">
                        Logout
                    </button>
                </div>
            </div>
        </ClickAwayListener>
    );
};

export default ProfileDetails;
