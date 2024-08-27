import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Corrected import
import { composeWithDevTools } from "redux-devtools-extension";

import { postsReducer } from "./reducers/postReducers";
import { authReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  user: userReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
