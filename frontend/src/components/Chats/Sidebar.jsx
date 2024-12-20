import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, getAllChats } from '../../actions/chatAction';
import ChatListItem from './ChatListItem';

const Sidebar = ({ openModal, socket }) => {

    const dispatch = useDispatch();
    const params = useParams();

    const { user } = useSelector((state) => state.user)
    const { error, chats } = useSelector((state) => state.allChats)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllChats());
    }, [dispatch, error, params.chatId]);

    return (
        <>
        <div className="hidden sm:flex flex-col h-full w-2/6 border-r dark:bg-gray-800">
    
            <div className="flex items-center justify-between border-b p-4">
                <span className="mx-auto font-medium cursor-pointer text-white">{user.username}</span>
                <svg onClick={openModal} className="cursor-pointer" aria-label="New Message" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
            </div>
    
            <div className="flex flex-col overflow-y-auto overflow-x-hidden">
                <span className="px-4 py-2 font-medium text-white">Messages</span>
                {chats?.map((c) => (
                    <ChatListItem {...c} key={c._id} />
                ))}
            </div>
        </div>
    </>
    
    )
}

export default Sidebar