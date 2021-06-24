import { ADD_ANSWER, REMOVE_ANSWER, REMOVE_ALL_ANSWERS } from "../actions/type";

const initialState = [];

export const AnswerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANSWER:
      const { questionId, selectedOption } = action.payload;

      return [
        ...state,
        {
          questionId: questionId,
          selectedOptions: selectedOption,
        },
      ];

    case REMOVE_ANSWER:
      return state.filter((_, i) => i !== state.length - 1);
    case REMOVE_ALL_ANSWERS: {
      return [];
    }
    default:
      return state;
  }
};
