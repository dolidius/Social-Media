import { GET_POSTS, GET_POST, GET_ERRORS } from './types';
import axios from 'axios';

// Get all posts
export const getPosts = () => dispatch => {
    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

// Get post by id
export const getPost = id => dispatch => {
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => console.log(err));
}

// Create post
export const createPost = postData => dispatch => {
    axios.post('/api/posts', postData)
        .then(res =>{ 
            dispatch(getPosts());
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Like post
export const likePost = (id, singlePost = false) => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res => {
            if(singlePost){
                dispatch(getPost(id));
            }else{
                dispatch(getPosts());
            }
        })
        .catch(err => console.log(err));
}

// Create comment
export const createComment = (commentData, id) => dispatch => {
    axios.post(`/api/posts/comment/${id}`, commentData)
        .then(res => dispatch(getPost(id)))
        .catch(err => console.log(err));
}

// Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch(getPost(postId)))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}