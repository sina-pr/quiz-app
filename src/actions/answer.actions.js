import { ADD_ANSWER, REMOVE_ANSWER, REMOVE_ALL_ANSWERS } from "./type";

export const addAnswer = (questionId, selectedOption) => {
  return {
    type: ADD_ANSWER,
    payload: { questionId, selectedOption },
  };
};
export const removeAnswer = () => {
  return {
    type: REMOVE_ANSWER,
  };
};
export const removeAllAnswers = () => {
  return {
    type: REMOVE_ALL_ANSWERS,
  };
};
