import {FETCH_NOTES, POST_LIKE, POST_NOTE, REMOVE_LIKE, POST_FAVORITE, REMOVE_FAVORITE, UPDATE_NOTE} from '../Actions/types';
import _ from "lodash";

export default function(state = null, action) {
    //console.log(action);
    switch (action.type) {
        case FETCH_NOTES:
            return _.mapKeys(action.payload, '_id');
        case POST_NOTE:
            return {[action.payload._id]:action.payload , ...state};
        case UPDATE_NOTE:
            var id = action.payload._id;
            return {...state, [id]: action.payload};
        case POST_LIKE:
            var id = action.payload;
            return {
                ...state,
                [id] : {...state[id], numberOfLikes: state[id].numberOfLikes+1, isLiked: "true"}
            };
        case REMOVE_LIKE:
            var id = action.payload;
            return {
                ...state,
                [id] : {...state[id], numberOfLikes: state[id].numberOfLikes-1, isLiked: "false"}
            };
        case POST_FAVORITE:
            var id = action.payload;
            return {
                ...state,
                [id] : {...state[id], isFavorite: "true"}
            };
        case REMOVE_FAVORITE:
            var id = action.payload;
            return {
                ...state,
                [id] : {...state[id], isFavorite: "false"}
            };
        default:
            return state;
    }
}
