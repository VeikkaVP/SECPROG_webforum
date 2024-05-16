import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/user/userActions';
import 'react-toastify/dist/ReactToastify.css';

const LogoutContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUser())
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                // Handle any errors during the logout process
                console.error("Logout error:", error);
            });
    }, [dispatch, navigate]);

    // Render a message or a loader while the logout process is being handled
    return (
        <div>
            <p>Logging out.</p>
        </div>
    );
};

export default LogoutContainer;
