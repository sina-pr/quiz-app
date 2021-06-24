import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { AnswerReducer } from "./answer.reducer";
import { QuestionReducer } from "./question.reducer";

export const rootReducer = combineReducers({
  Auth: authReducer,
  Answers: AnswerReducer,
  Questions: QuestionReducer,
});
