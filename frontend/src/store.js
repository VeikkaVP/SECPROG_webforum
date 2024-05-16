// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './features/posts/postReducer'; // Adjust path as necessary
import userReducer from './features/user/userReducer'; // Adjust path as necessary

export const store = configureStore({
    reducer: {
        posts: postReducer,
        user: userReducer
    }
});
