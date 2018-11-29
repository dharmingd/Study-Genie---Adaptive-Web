import { FETCH_USERS } from '../Actions/types';

export default function(state = null, action) {
    //console.log(action);
    switch (action.type) {
        case FETCH_USERS:
            return action.payload || false;
        default:
            return state;
    }
}
