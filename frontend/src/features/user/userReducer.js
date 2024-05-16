// src/features/user/userReducer.js
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
  } from './userTypes';
  
  const initialState = {
    loading: false,
    user: { role: 'guest' },
    error: ''
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
      case LOGOUT_REQUEST:
        return {
          ...state,
          loading: true,
          error: ''
        };
      case LOGIN_SUCCESS:
        return {
          loading: false,
          user: action.payload, // assuming payload is an object {username: "name", role: "role"}
          error: ''
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: ''
        };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
      case LOGOUT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case LOGOUT_SUCCESS:
        return {
          ...initialState
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  