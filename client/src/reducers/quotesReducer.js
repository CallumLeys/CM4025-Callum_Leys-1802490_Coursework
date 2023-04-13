import { GET_QUOTES, GET_QUOTE } from "../actions/types";

const initialState = {
  quotes: [],
  quote: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTES:
      return {
        ...state,
        quotes: action.payload
      };
    case GET_QUOTE:
      return {
        ...state,
        quote: action.payload
      };
    default:
      return state;
  }
};