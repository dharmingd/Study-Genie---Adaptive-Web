import axios from "axios";
import {
  FETCH_USER,
  POST_USER_DETAILS,
  POST_NOTE,
  FETCH_USERS,
  POST_GROUP,
  GET_GROUP,
    FETCH_NOTES,
  SHARE_POST,
  POST_LIKE,
  REMOVE_LIKE,
  POST_FAVORITE,
  REMOVE_FAVORITE,
  UPDATE_NOTE,
  UPDATE_FILTER,
  UPDATE_SORT,
    GET_GROUPS,
    GET_ONE_GROUP,
    JOIN_GROUP,
    LEAVE_GROUP,
    DELETE_GROUP,
    DELETE_NOTE
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const postUserDetails = data => async dispatch => {
  console.log(data);
  const res = await axios.post("/api/user/details", data);
  dispatch({ type: POST_USER_DETAILS, payload: res.data });
};

export const postNote = data => async dispatch => {
  const res = await axios.post("/api/note", data);
  dispatch({ type: POST_NOTE, payload: res.data });
};

export const fetchUsers = () => async dispatch => {
  const res = await axios.get("/api/users");
  dispatch({ type: FETCH_USERS, payload: res.data });
};

export const postGroup = data => async dispatch => {
  const res = await axios.post("/api/group", data);
  console.log(res.data.group);
  dispatch({ type: POST_GROUP, payload: res.data.group });
};

export const getGroup = () => async dispatch => {
  const res = await axios.get("/api/group");
  dispatch({ type: GET_GROUP, payload: res.data.groups });
};

export const getNotePublic = () => async dispatch => {
  const res = await axios.get("/api/note/public");
  console.log(res.data);
  dispatch({ type: FETCH_NOTES, payload: res.data });
};

export const getNoteOwn = () => async dispatch => {
    const res = await axios.get("/api/note/own");
    dispatch({ type: FETCH_NOTES, payload: res.data });
};

export const getSavedPost = () => async dispatch => {
    const res = await axios.get("/api/note/saved");
    dispatch({ type: FETCH_NOTES, payload: res.data });
};

export const getCheatSheets = () => async dispatch => {
    const res = await axios.get("/api/note/cheatsheets");
    dispatch({ type: FETCH_NOTES, payload: res.data });
};

export const shareNote = data => async dispatch => {
  const res = await axios.put("/api/post/update/group", data);
  dispatch({ type: SHARE_POST, payload: res.data });
};

export const postLike = data => async dispatch => {
  const res = await axios.post("/api/like", data);
  dispatch({ type: POST_LIKE, payload: res.data._note });
};

export const removeLike = data => async dispatch => {
  //console.log(data);
  const res = await axios.put("/api/like", data);
  dispatch({ type: REMOVE_LIKE, payload: data._note });
};

export const postFavorite = data => async dispatch => {
  const res = await axios.post("/api/favorite", data);
  dispatch({ type: POST_FAVORITE, payload: res.data._note });
};

export const removeFavorite = data => async dispatch => {
  //console.log(data);
  const res = await axios.put("/api/favorite", data);
  dispatch({ type: REMOVE_FAVORITE, payload: data._note });
};

export const updateNote = data => async dispatch => {
  //console.log(data);
  const res = await axios.put("/api/post", data);
  console.log(res.data);
  dispatch({ type: UPDATE_NOTE, payload: res.data });
};


export const updateFilter = data => {
  return { type: UPDATE_FILTER, payload: data};
}

export const updateSort = data => {
  return { type: UPDATE_SORT, payload: data};
}

export const getPublicGroups = () => async dispatch => {
    //console.log(data);
    const res = await axios.get("/api/group/public");
    console.log(res.data);
    dispatch({ type: GET_GROUPS, payload: res.data });
};

export const getMyGroups = () => async dispatch => {
    const res = await axios.get("/api/group/my");
    dispatch({ type: GET_GROUPS, payload: res.data });
};

export const getOneGroup = (data) => async dispatch =>{
    const res = await axios.post("/api/group/one", data);
    dispatch({type: GET_ONE_GROUP, payload: res.data});
}

export const getGroupNotes = (data) => {
    return {type: FETCH_NOTES, payload: data}
}

export const joinGroupAction = (data)=> async dispatch =>{
    const res = await axios.post("/api/group/join", data);
    dispatch({type: JOIN_GROUP, payload: data});
}

export const leaveGroupAction = (data)=> async dispatch =>{
    const res = await axios.post("/api/group/leave", data);
    dispatch({type: LEAVE_GROUP, payload: data});
}

export const deleteNoteAction = (data, history)=> async dispatch =>{
    const res = await axios.put("/api/note/delete", data);
    dispatch({type: DELETE_NOTE, payload: res.data});
    history.push('/user/mynotes');
}

export const deleteGroupAction = (data, history)=> async dispatch =>{
    const res = await axios.put("/api/group/delete", data);
    dispatch({type: DELETE_GROUP, payload: data});
    history.push('/user/my/groups');
}
