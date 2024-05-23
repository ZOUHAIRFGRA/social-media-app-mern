import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getSuggestedUsers } from "../../../actions/userAction";
import { FOLLOW_USER_RESET } from "../../../constants/userConstants";
import SkeletonUserItem from "../../Layouts/SkeletonUserItem";
import UserListItem from "./UserListItem";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: followError,
    success,
    message,
  } = useSelector((state) => state.followUser);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSuggestedUsers());
  }, [dispatch, error]);

  useEffect(() => {
    if (followError) {
      toast.error(followError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);

      dispatch({ type: FOLLOW_USER_RESET });
    }
  }, [success, followError]);

  return (
    <div className="fixed lg:right-32 xl:right-56 w-3/12 h-full hidden lg:flex flex-col m-8 mt-12 pr-8">
    <div className="ml-10 flex flex-col p-2">

        {/* Self Profile Card */}
        <div className="flex justify-between items-center">
            <div className="flex space-x-4 items-center">
                <Link to={`/${user.username}`}>
                    <img
                        draggable="false"
                        className="w-14 h-14 rounded-full object-cover"
                        src={user.avatar.url}
                        alt={user.name}
                    />
                </Link>
                <div className="flex flex-col">
                    <Link
                        to={`/${user.username}`}
                        className="text-white text-sm font-semibold"
                    >
                        {user.username}
                    </Link>
                    <span className="text-gray-400 text-sm">{user.name}</span>
                </div>
            </div>
            <span className="text-blue-500 text-xs font-semibold cursor-pointer">
                Switch
            </span>
        </div>

        {/* Suggestions */}
        <div className="flex justify-between items-center mt-5">
            <p className="font-semibold text-gray-500 text-sm">
                Suggestions For You
            </p>
        </div>

        {/* Suggested Profile Lists */}
        <div className="flex flex-col mt-3 space-y-3.5">
            {loading
                ? Array(5)
                    .fill("")
                    .map((el, i) => <SkeletonUserItem key={i} />)
                : users?.map((user) => <UserListItem {...user} key={user._id} />)}
        </div>
    </div>
</div>

  );
};

export default Sidebar;
