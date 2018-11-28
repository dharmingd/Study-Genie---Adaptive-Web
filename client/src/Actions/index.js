import axios from 'axios';
import {FETCH_USER, POST_USER_DETAILS, POST_NOTE, FETCH_USERS, POST_GROUP, GET_GROUP, GET_POST_PUBLIC} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const postUserDetails = (data) => async dispatch => {
  console.log(data);
  const res = await axios.post('/api/user/details', data);
  dispatch({type: POST_USER_DETAILS, payload:res.data});
}

export const postNote = (data) => async dispatch =>{
  const res = await axios.post('/api/note', data);
  dispatch({type: POST_NOTE, payload: res.data});
}

export const fetchUsers = () => async dispatch =>{
    const res = await axios.get('/api/users');
    dispatch({type: FETCH_USERS, payload: res.data});
}

export const postGroup= (data) => async dispatch => {
  const res = await axios.post('/api/group', data);
  console.log(res.data.group);
  dispatch({type: POST_GROUP, payload: res.data.group});
}

export const getGroup = () => async dispatch =>{
  const res = await axios.get('/api/group');
  dispatch({type: GET_GROUP, payload: res.data.groups})
}

export const getNotePublic = () => async dispatch =>{
  const res = await axios.get('/api/note/public');
  dispatch({type: GET_POST_PUBLIC, payload: res.data})
}