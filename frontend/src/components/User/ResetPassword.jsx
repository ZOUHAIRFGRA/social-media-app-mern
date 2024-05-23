import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import BackdropLoader from '../Layouts/BackdropLoader';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            toast.warn("Password length must be at least 8 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        dispatch(resetPassword(params.token, newPassword));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Password updated successfully");
            navigate("/login");
        }
    }, [dispatch, error, success, navigate]);

    return (
        <>
            {loading && <BackdropLoader />}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="max-w-md w-full px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium mb-2">New Password</label>
                            <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:bg-gray-600" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm New Password</label>
                            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:bg-gray-600" />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Submit</button>
                    </form>
                    <div className="mt-4 text-center">
                        <span>Remember your password? <Link to="/login" className="text-blue-400 hover:underline">Login</Link></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;
