import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "./type";
const authAPI = "http://sheltered-island-41076.herokuapp.com/";
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
    });
};
export const register = (userName, phoneNumber, password) => (dispatch) => {
  return axios
    .post(authAPI + "register", {
      userName: userName,
      phoneNumber: phoneNumber,
      password: password,
    })
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
    });
};
export const logout = () => {
  return { type: LOGOUT };
};
