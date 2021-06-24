import axios from "axios";
import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILED } from "./type";

const questionAPI = "http://localhost:5000/questions/";

export const getAllQuestions = () => (dispatch) => {
  return axios
    .get(questionAPI + "all")
    .then((res) => {
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_QUESTIONS_FAILED,
      });
    });
};
