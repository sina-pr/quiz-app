import axios from "axios";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REMOVE_SIGNUP_STATUS,
} from "./type";

const authAPI = "https://sheltered-island-41076.herokuapp.com/users/";

export const login = (email, password) => (dispath) => {
  return axios
    .post(authAPI + "login", {
      email: email,
      password: password,
    })
    .then((res) => {
      dispath({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });
    })
    .catch(() => {
      dispath({
        type: LOGIN_FAILED,
      });
    });
};
export const register = (email, phoneNumber, password) => (dispatch) => {
  return axios
    .post(authAPI + "register", {
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    })
    .then(() => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
    })
    .catch(() => {
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};
export const removeSignUpStatus = () => {
  return { type: REMOVE_SIGNUP_STATUS };
};
export const logout = () => {
  return { type: LOGOUT };
};
