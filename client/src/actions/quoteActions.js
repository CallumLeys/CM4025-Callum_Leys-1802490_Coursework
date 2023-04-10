import axios from "axios";
import { SHOW_SUCCESS_MESSAGE, GET_ERRORS, GET_QUOTES } from "./types";

// Create Quote
export const createQuote = (quoteData) => (dispatch) => {
  axios
    .post("/api/quotes/create", quoteData)
    .then((res) => {
      // If the quote is successfully created, you can dispatch an action to handle the success case, e.g. showing a success message
      console.log("Quote created successfully:", res.data);
      // show a success message
      dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "Quote created successfully" });
    })
    .catch((err) => {
      // If there is an error while creating the quote, you can dispatch an action to handle the error case, e.g. showing an error message
      console.error("Failed to create quote:", err.response.data);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// View Quote
export const fetchQuotes = (email) => dispatch => {
  axios
    .get(`/api/quotes/all?email=${email}`) // Include email as query parameter
    .then(res => {
      console.log(res)
      dispatch({
        type: GET_QUOTES,
        payload: res
      });
      console.log("Successfully fetched quotes!");
    })
    .catch(err => {
      console.error("Failed to fetch quotes:", err);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};