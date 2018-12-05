import { UPDATE_FILTER } from '../Actions/types';
import _ from 'lodash';

export default function(state = [], action) {
    //console.log(action);
    switch (action.type) {
        case UPDATE_FILTER:
            return action.payload;
        default:
            return state;
    }
}
