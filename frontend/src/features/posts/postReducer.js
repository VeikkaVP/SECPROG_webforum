// src/features/posts/postReducer.js
import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from './postTypes';

const initialState = {
  loading: false,
  posts: [],
  error: ''
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: ''
      };
    case FETCH_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload
      };
      case CREATE_POST_REQUEST:
        return {
          ...state,
          loading: true,
          error: ''  // Clear any previous errors
        };
      case CREATE_POST_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case CREATE_POST_FAILURE:
        return {
          ...state,
          loading: false,
          error: 'Failed to create post'  // Set a generic error or use one from the action if you pass it
        };
    default:
      return state;
  }
};

export default postReducer;
