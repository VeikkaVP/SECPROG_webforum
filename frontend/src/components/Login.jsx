import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/user/userActions'; // Import your login action creator
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dispatch login action with username and password
            await dispatch(loginUser({ username, password }));
            // Clear the form fields after successful submission
            setUsername('');
            setPassword('');
            navigate('/')
        } catch (error) {
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        // Validate username input to allow only letters and numbers
        if (/^[a-zA-Z0-9]*$/.test(value) || value === '') {
            setUsername(value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
