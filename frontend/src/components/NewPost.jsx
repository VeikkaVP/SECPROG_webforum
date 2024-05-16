import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/posts/postActions'; 
import 'react-toastify/dist/ReactToastify.css';

const NewPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const userName = useSelector(state => state.user.user.username);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(createPost({ title, text , userName}));
            // Clear the form fields after successful submission
            setTitle('');
            setText('');
        } catch (error) {
            // Handle error if needed
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Text:</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={10} // Adjust the number of rows as needed
                    required
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default NewPostForm;
