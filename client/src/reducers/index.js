import { combineReducers } from "redux";
import authReducer from "./authReducer";
import quotesReducer from "./quotesReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  quotes: quotesReducer
});