import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  EMAIL_VERIFICATION_USER_REQUEST,
  EMAIL_VERIFICATION_USER_SUCCESS,
  EMAIL_VERIFICATION_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
//register

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data", //cuz of the pic and avatar
      },
    };
    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    return { success: true, message: "Registration successful" };
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
      success: false,
    });
    return { success: false, message: error.response.data.message };
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get("/api/v1/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    return { success: true, message: "loading user successful" };
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
      success: false,
    });
    return { success: false, message: error.response.data.message };
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Assuming there's an API endpoint '/api/v1/user' for updating user details
    const { data } = await axios.put("/api/v1/me/update", userData, config);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Assuming there's an API endpoint '/api/v1/user' for updating user details
    const { data } = await axios.put("/api/v1/me/update", userData, config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const emailVerification = (token) => async (dispatch) => {
  try {
    dispatch({
      type: EMAIL_VERIFICATION_USER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/email/verify", token, config);
    dispatch({ type: EMAIL_VERIFICATION_USER_SUCCESS, payload: data.user });
    return { success: true, message: "Token has been Sent to your Email" };
  } catch (error) {
    dispatch({
      type: EMAIL_VERIFICATION_USER_FAIL,
      payload: error.response.data.message,
      success: false,
    });
    return { success: false, message: error.response.data.message };
  }
};

// export const getUser = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get("/api/v1/users");
//     data.forEach((user) => {
//       dispatch({
//         type: GET_USER_SUCCESS,
//         payload: { userId: user._id, name: user.name },
//       });
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_USER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

//clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
