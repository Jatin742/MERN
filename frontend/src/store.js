import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Named import
import { composeWithDevTools } from "redux-devtools-extension";
import {  userReducer } from "./Reducers/userReducer";
import { adminUserReducer, allAdminUsersReducer, newUserReducer, userDetailsReducer } from "./Reducers/adminReducer";

const reducer = combineReducers({
  user: userReducer,
  userDetails: userDetailsReducer,
  newUser: newUserReducer,
  allAdminUsers: allAdminUsersReducer,
  adminUser: adminUserReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
