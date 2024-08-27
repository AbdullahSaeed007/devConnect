import axios from "axios";
import {
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  ALL_POST_FAIL,
  CLEAR_ERRORS,
} from "../constants/postConstants";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_POST_REQUEST }); //dispatch all post request, which set loading to true and post empty array in the state
    const { data } = await axios.get("/api/v1/post/get"); //after that we requet from backend to give us the data that stores in the variable data
    dispatch({
      type: ALL_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
