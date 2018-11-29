import { POST_USER_DETAILS } from '../Actions/types';

export default function(state = null, action) {
    //console.log(action);
    switch (action.type) {
        case POST_USER_DETAILS:
            return action.payload || false;
        default:
            return state;
    }
}
