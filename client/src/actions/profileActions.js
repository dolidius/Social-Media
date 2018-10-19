import { GET_PROFILE } from './types';
import axios from 'axios';

// Get profile by id
export const getProfile = id => dispatch => {
    axios.get(`/api/profile/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

// Update profile of current logged inuser
export const updateProfile = (profileData, history, id) => dispatch => {
    axios.post('/api/profile/edit', profileData)
        .then(res => {
            history.push(`/profile/${id}`);
        })
        .catch(err => console.log(err));
}