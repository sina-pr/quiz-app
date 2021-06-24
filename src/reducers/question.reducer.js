import { GET_QUESTIONS_SUCCESS } from "../actions/type";

const initialState = {
  loading: true,
  all: [],
};

export const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS_SUCCESS:
      return {
        loading: false,
        all: action.payload,
      };

    default:
      return state;
  }
};
