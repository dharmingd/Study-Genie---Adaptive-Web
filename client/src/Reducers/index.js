import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import usersReducers from "./usersReducer";
import groupReducers from "./groupReducers";
import notesReducer from './notesReducer';
import updateFilter from './updateFilter';
import sortReducer from './sortReducer';
import notesReducer from "./notesReducer";
import publicGroupReducers from "./publicGroupReducers";

export default combineReducers({
  auth: AuthReducer,
  users: usersReducers,
  groups: groupReducers,
  notes:notesReducer,
  filter: updateFilter,
  sort: sortReducer,
  publicGroups: publicGroupReducers
});
