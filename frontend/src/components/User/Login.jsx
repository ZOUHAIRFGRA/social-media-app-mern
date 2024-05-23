import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Auth from './Auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import BackdropLoader from '../Layouts/BackdropLoader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${user.username}`);
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    return (
        <>
            {loading && <BackdropLoader />}
            <Auth>
                <div className="bg-gray-800 border border-gray-700 flex flex-col gap-2 p-4 pt-10 rounded-lg">
                    <h1 className="mx-auto text-3xl font-bold">Social App</h1>
                    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-3 m-3 md:m-8">
                        <TextField
                            label="Email/Username"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            size="small"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: '#bbb' },
                            }}
                            InputProps={{
                                style: { color: '#fff', borderColor: '#555' },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            size="small"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                style: { color: '#bbb' },
                            }}
                            InputProps={{
                                style: { color: '#fff', borderColor: '#555' },
                            }}
                        />
                        <button type="submit" className="bg-primary-blue font-medium py-2 rounded text-white w-full">
                            Log In
                        </button>
                        <span className="my-3 text-gray-400">OR</span>
                        <Link to="/password/forgot" className="text-sm font-medium text-blue-500">
                            Forgot password?
                        </Link>
                    </form>
                </div>

                <div className="bg-gray-800 border border-gray-700 p-5 text-center rounded-lg mt-4">
                    <span>Don't have an account? <Link to="/register" className="text-primary-blue">Sign up</Link></span>
                </div>
            </Auth>
        </>
    )
}

export default Login;
