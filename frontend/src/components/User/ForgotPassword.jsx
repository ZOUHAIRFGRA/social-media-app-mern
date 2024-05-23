import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BackdropLoader from '../Layouts/BackdropLoader';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
        setEmail("");
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message]);

    return (
        <>
            {loading && <BackdropLoader />}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="max-w-md w-full px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:bg-gray-600" />
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

export default ForgotPassword;
