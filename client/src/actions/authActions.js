import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../utilities/setAuthToken';

// Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
} 

// Login user
export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwt', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

//Set current user
export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwt');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will also set isAuthenticated to false
    dispatch(setCurrentUser({})); 
}