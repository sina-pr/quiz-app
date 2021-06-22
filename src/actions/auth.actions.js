import axios from "axios";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "./type";

const authAPI = "https://sheltered-island-41076.herokuapp.com/users/";

export const login = (userName, password) => (dispath) => {
  return axios
    .post(authAPI + "login", {
      userName: userName,
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
export const register = (userName, phoneNumber, password) => (dispatch) => {
  return axios
    .post(authAPI + "register", {
      userName: userName,
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
export const logout = () => {
  return { type: LOGOUT };
};
