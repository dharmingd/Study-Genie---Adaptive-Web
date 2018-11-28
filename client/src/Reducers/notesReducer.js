import { GET_POST_PUBLIC } from '../Actions/types';

export default function(state = null, action) {
    //console.log(action);
    switch (action.type) {
        case GET_POST_PUBLIC:
            return action.payload || false;
        default:
            return state;
    }
}
