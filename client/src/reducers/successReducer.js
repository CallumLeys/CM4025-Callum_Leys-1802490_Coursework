// successReducer.js
import { SHOW_SUCCESS_MESSAGE } from "../actions/types";

const initialState = {
  successMessage: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };
    default:
      return state;
  }
}