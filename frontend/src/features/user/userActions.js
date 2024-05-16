// src/features/user/userActions.js
import axios from '../../axiosConfig.js';
import { toast } from 'react-toastify';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from './userTypes';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => {
    toast.error(error)
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
};

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const logoutSuccess = () => {
  toast.success("Logout successful");
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutFailure = (error) => {
  toast.error(error);
  return {
    type: LOGOUT_FAILURE,
    payload: error
  };
};

export const registerRequest = () => ({
  type: REGISTER_REQUEST
});

export const registerSuccess = () => {
  toast.success("Registration successful");
  return {
    type: REGISTER_SUCCESS
  };
};

export const registerFailure = (error) => {
  toast.error(error);
  return {
    type: REGISTER_FAILURE,
    payload: error
  };
};

// Handles user login
export const loginUser = (credentials) => {
  return dispatch => {
    dispatch(loginRequest());
    axios.post('http://localhost:5001/login', credentials)
      .then(response => {
        const userData = {
            username: credentials.username,
            role: 'user'
        };
        toast.success(response.data.message);
        dispatch(loginSuccess(userData));
      })
      .catch(error => {
        const errorMessage = error.response.status + ' ' + error.response.data.message;
        dispatch(loginFailure(errorMessage));
      });
  };
};

// Handles user logout
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    return axios.post('http://localhost:5001/logout')
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(error => {
        const errorMessage = error.response.status + ' ' + error.response.data.message;
        dispatch(logoutFailure(errorMessage));
      });
  };
};

// Handles new user registration
export const registerUser = (userData) => {
  return dispatch => {
    dispatch(registerRequest());
    axios.post('http://localhost:5001/register', userData)
      .then(() => {
        console.log("Success")
        dispatch(registerSuccess());
      })
      .catch(error => {
        const errorMessage = error.response.status + ' ' + error.response.data.message;
        dispatch(registerFailure(errorMessage));
      });
  };
};
