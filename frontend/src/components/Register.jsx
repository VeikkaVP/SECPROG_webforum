import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userActions'; // Import your register action creator
import { toast } from 'react-toastify'; // Import react-toastify for displaying toast messages
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // If passwords don't match, display toast message and return
            toast.error("Passwords don't match!");
            return;
        }
        if (username.length < 4) {
            // If username is less than 4 characters, display toast message and return
            toast.error("Username must be at least 4 characters long!");
            return;
        }
        if (password.length < 6 || !/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
            // If password doesn't meet requirements, display toast message and return
            toast.error("Password must be at least 6 characters long and include one uppercase letter and one number!");
            return;
        }
        try {
            // Dispatch register action with username, password, and password confirmation
            await dispatch(registerUser({ username, password }));
            // Clear the form fields after successful submission
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            // Redirect to the login page after successful registration
        } catch (error) {
            // Handle error if needed
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        // Validate username input to allow only letters and numbers
        if (/^[a-zA-Z0-9]*$/.test(value) || value === '') {
            setUsername(value);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
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
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
