import { ADD_ANSWER, REMOVE_ANSWER } from "./type";

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
