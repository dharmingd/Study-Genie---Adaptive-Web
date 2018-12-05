import {
  GET_GROUPS,
  GET_ONE_GROUP,
  JOIN_GROUP,
  LEAVE_GROUP,
  DELETE_GROUP
} from "../Actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  //console.log(action);
  switch (action.type) {
    case GET_GROUPS:
      return _.mapKeys(action.payload, "_id");
    case GET_ONE_GROUP:
      return { ...state, [action.payload._id]: action.payload };
    case JOIN_GROUP:
      console.log(state[action.payload._id]);
      return {
        ...state,
        [action.payload._id]: {
          ...state[action.payload._id],
          _user: [...state[action.payload._id]._user, action.payload.user]
        }
      };
    case LEAVE_GROUP:
      const newGroup = _.map(state[action.payload._id]._user, user => {
        if (user._id !== action.payload.user._id) return user;
      });
      return {
        ...state,
        [action.payload._id]: {
          ...state[action.payload._id],
          _user: _.without(newGroup, undefined)
        }
      };
    case DELETE_GROUP:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
