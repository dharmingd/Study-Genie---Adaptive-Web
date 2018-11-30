import { POST_NOTE,POST_LIKE } from '../Actions/types';
import _ from 'lodash';

export default function(state = null, action) {
    //console.log(action);
    switch (action.type) {
        case POST_NOTE:
            return action.payload || false;
        default:
            return state;
    }
}
