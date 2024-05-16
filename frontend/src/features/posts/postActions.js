// src/features/posts/postActions.js
import axios from '../../axiosConfig.js';
import { FETCH_POSTS_REQUEST, 
  FETCH_POSTS_SUCCESS, 
  FETCH_POSTS_FAILURE, 
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE } from './postTypes';
import { toast } from 'react-toastify';

export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error
});

export const createPostRequest = () => ({
  type: CREATE_POST_REQUEST
});

export const createPostSuccess = () => ({
  type: CREATE_POST_SUCCESS
});

export const createPostFailure = () => ({
  type: CREATE_POST_FAILURE
});

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    axios.get('http://localhost:5001/posts')
      .then(response => {
        // response.data is the array of posts
        dispatch(fetchPostsSuccess(response.data));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchPostsFailure(error.message));
      });
  };
};

export const createPost = (payload) => {
  return (dispatch) => {
    dispatch(createPostRequest());
    axios.post('http://localhost:5001/post', payload)
      .then(response => {
        // Handle success
        dispatch(createPostSuccess());
        toast.success(response.data.message);
      })
      .catch(error => {
        // Handle error
        dispatch(createPostFailure());
        const errorMessage = error.response ? error.response.data.message : "Failed to create post";
        toast.error(errorMessage);
      });
  };
};
