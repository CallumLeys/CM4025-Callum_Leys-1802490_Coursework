import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { createBrowserHistory } from "history";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateQuote from "./components/quote/CreateQuote";
import ViewQuotes from "./components/quote/ViewQuotes";
import ViewQuote from "./components/quote/ViewQuote";
import Settings from "./components/admin/Settings";

import "./App.css";

const history = createBrowserHistory();

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register history={history}/>} />
              <Route path="/login" element={<Login history={history}/>} />
              <Route 
                path='/dashboard'
                element={
                  <PrivateRoute component={<Dashboard />}></PrivateRoute>
                }/> 
              <Route 
                path="/create-quote"
                element={
                  <PrivateRoute component={<CreateQuote />}/>
                }
              />
              <Route 
                path="/view-quotes"
                element={
                  <PrivateRoute component={<ViewQuotes />}/>
                }
              />
              <Route 
                path="/view-quote"
                element={
                  <PrivateRoute component={<ViewQuote />}/>
                }
              />
              <Route 
                path="/settings"
                element={
                  <PrivateRoute component={<Settings />} isAdminRoute={true} />
                }
              />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;