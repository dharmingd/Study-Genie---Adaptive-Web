import { UPDATE_SORT } from '../Actions/types';
import _ from 'lodash';

export default function(state = null, action) {
    //console.log(action);
    switch (action.type) {
        case UPDATE_SORT:
            return action.payload;
        default:
            return state;
    }
}
