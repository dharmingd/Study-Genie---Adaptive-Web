import {POST_GROUP, GET_GROUP} from  '../Actions/types';
import _ from "lodash";

export default function(state = null, action) {
    //console.log(action);
    switch (action.type) {
        case POST_GROUP:
            return [action.payload, ...state] || false;
        case GET_GROUP:
            return action.payload || false;
        default:
            return state;
    }
}