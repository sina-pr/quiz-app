import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REMOVE_SIGNUP_STATUS,
} from "./../actions/type";
import jwtDecode from "jwt-decode";

const token = localStorage.getItem("TOKEN");

const initialState = token
  ? { loggedIn: true, user: jwtDecode(token) }
  : { loggedIn: false, user: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("TOKEN", action.payload);
      return {
        loggedIn: true,
        user: jwtDecode(action.payload),
      };
    case LOGIN_FAILED:
      return {
        ...state,
        status: "Login failed",
      };
    case REGISTER_SUCCESS:
      return {
        loggedIn: false,
        user: {},
        status: "Register success",
      };
    case REGISTER_FAILED:
      return {
        loggedIn: false,
        user: {},
        status: "Register failed",
      };

    case LOGOUT:
      localStorage.removeItem("TOKEN");
      return {
        loggedIn: false,
        user: {},
      };
    case REMOVE_SIGNUP_STATUS:
      return {
        ...state,
        status: "",
      };
    default:
      return state;
  }
};

export default authReducer;
