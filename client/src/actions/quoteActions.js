import axios from "axios";
import { SHOW_SUCCESS_MESSAGE, GET_ERRORS, GET_QUOTES, GET_QUOTE } from "./types";

// Create Quote
export const createQuote = (quoteData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/quotes/create", quoteData)
      .then((res) => {
        // quote is successfully created
        console.log("Quote created successfully:");
        // show a success message
        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "Quote created successfully" });
        resolve(res.data);
      })
      .catch((err) => {
        // error while creating the quote
        console.error("Failed to create quote:", err.response.data);
        dispatch({ type: GET_ERRORS, payload: err.response.data });
        reject(err.response.data);
      });
  });
};

// Edit Quote
export const editQuote = (quoteData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/quotes/edit`, { quote: quoteData })
      .then((res) => {
        // quote is successfully edited
        console.log("Quote edited successfully:", res.data);
        // show a success message
        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "Quote edited successfully" });
        resolve(res.data);
      })
      .catch((err) => {
        // error while editing the quote
        console.error("Failed to edit quote:", err.response.data);
        dispatch({ type: GET_ERRORS, payload: err.response.data });
        reject(err.response.data);
      });
  });
};

// View Quotes
export const fetchQuotes = (email) => dispatch => {
  return new Promise((resolve, reject) => {
  axios
    .get(`/api/quotes/all?email=${email}`)
    .then(res => {
      // quotes are fetched
      dispatch({
        type: GET_QUOTES,
        payload: res
      });
      resolve(res.data);
      // show success message
      console.log("Successfully fetched quotes!");
    })
    .catch(err => {
      // error viewing quote
      console.error("Failed to fetch quotes:", err);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
      reject(err.response.data);
    });
  });
};

// Delete Quote
export const deleteQuote = (quoteId, email) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quote?");
    if (confirmDelete) {
      axios
        .delete(`/api/quotes/delete/${quoteId}`)
        .then((res) => {
          // quote successfully deleted
          console.log(`Quote with ID: ${quoteId} deleted successfully`);
          // show a success message
          dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "Quote created successfully" });
          // Fetch updated quotes after successful deletion
          dispatch(fetchQuotes(email));
          resolve(res.data);
        })
        .catch((err) => {
          // error while deleting the quote
          console.error(`Failed to delete quote with ID: ${quoteId}`, err.response.data);
          dispatch({ type: GET_ERRORS, payload: err.response.data });
          reject(err.response.data); // Reject with error object
        });
    } else {
      // User cancelled delete action
      console.log(`Cancelled deletion of quote with ID: ${quoteId}`);
    }
  });
};

// View Quote
export const viewQuote = (quoteId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/quotes/view?quoteId=${quoteId}`)
      .then(res => {
        dispatch({
          type: GET_QUOTE,
          payload: res.data
        });
        resolve(res.data);
        console.log("Successfully found quote!");
      })
      .catch(err => {
        console.error("Failed to view quote:", err);
        dispatch({ type: GET_ERRORS, payload: err.response.data });
        reject(err.response.data);
      });
  });
}