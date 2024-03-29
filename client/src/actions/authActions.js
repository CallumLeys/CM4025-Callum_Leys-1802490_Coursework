import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";



// Register User
export const registerUser = (userData, history) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/users/register", userData)
      .then(res => {
        // Successful registration
        history.push("/login");
        resolve(res.data); // resolve with the response data
      })
      .catch(err => {
        // Failed registration
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        reject(err.response.data); // reject with the error response data
      });
  });
};


// Login - get user token
export const loginUser = (userData) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(true);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        const payload = {
          id: decoded.id,
          name: decoded.name,
          email: userData.email,
          userRole: decoded.userRole,
          iat: decoded.iat,
          exp: decoded.exp
        };
        // Set current user
        dispatch(setCurrentUser(payload));
        resolve(); // Resolve the Promise
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        reject(err); // Reject the Promise with the error
      });
  });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

};

// Update rateMap
export const updateRateMap = (editedRateMap) => async (dispatch) => {
  try {
    // Make a HTTP request to backend API to update rateMap
    const response = await axios.post("/api/users/updateRateMap", editedRateMap);
    if (response.data.success) {
      console.log("RateMap updated successfully");
    } else {
      console.error("Failed to update RateMap");
    }
  } catch (error) {
    console.error("Failed to update RateMap", error);
  }
};