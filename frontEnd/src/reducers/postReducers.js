import {
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  ALL_POST_FAIL,
  CLEAR_ERRORS,
} from "../constants/postConstants";
export const postsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_POST_REQUEST:
      return {
        loadings: true,
        posts: [],
      };
    case ALL_POST_SUCCESS:
      return {
        loadings: false,
        postCount: action.payload.postCount,
        posts: action.payload.posts,
      };
    case ALL_POST_FAIL:
      return {
        loadings: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
