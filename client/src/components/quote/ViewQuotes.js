import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuote, fetchQuotes, CLEAR_SUCCESS_MESSAGE } from "../../actions/quoteActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ViewQuotes = ({}) => {
    const dispatch = useDispatch();
    const [quotes, setQuotes] = useState([]); // State to store quotes
    const [successMessage, setSuccessMessage] = useState(null); // State to store success message
    const email = useSelector(state => state.auth.user.email);
  
    useEffect(() => {
      // Fetch quotes from backend with email
      dispatch(fetchQuotes(email)).then(response => {
        setQuotes(response); // Update the quotes state with the response
        console.log("Response:", response); // Log the response when dispatch is successful
      }).catch(error => {
        console.log("Error:", error); // Log any error that occurred during dispatch
      });
    }, [dispatch, email]);

    useEffect(() => {
      // Automatically clear success message after 5 seconds
      if (successMessage) {
        const timer = setTimeout(() => {
          dispatch({ type: CLEAR_SUCCESS_MESSAGE });
        }, 5000); // 5 seconds
        return () => {
          clearTimeout(timer);
        };
      }
    }, [successMessage, dispatch]);

    const handleDelete = quoteId => {
      dispatch(deleteQuote(quoteId, email)).then(() => {
        // Update success message
        setSuccessMessage("Quote deleted successfully!");
        // Fetch updated quotes from backend
        dispatch(fetchQuotes(email)).then(response => {
          setQuotes(response); // Update the quotes state with the updated response
        }).catch(error => {
          console.log("Error:", error); // Log any error that occurred during dispatch
        });
      }).catch(error => {
        console.log("Error:", error); // Log any error that occurred during dispatch
      });
    };

    return (
      <div>
        <h1>Your Quotes</h1>
        {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "green",
            color: "white",
            padding: "20px",
            borderRadius: "5px",
            fontSize: "24px",
            zIndex: "9999"
          }}
        >
          {successMessage}
        </div>
      )}
        <ul
          style={{
            fontSize: "20px",
            margin: "0 auto",
            padding: "0",
            width: "50%",
            textAlign: "center",
            listStyle: "none",
          }}
        >
          {quotes?.map(quote => (
            <li
              key={quote._id}
              style={{
                marginBottom: "10px",
                backgroundColor: "rgba(0,0,0,0.1)",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: "1" }}>{quote.quoteName}</div>
              <div>
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={() => {
                    // Handle view functionality
                    console.log(`Viewing quote with ID: ${quote._id}`);
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(quote._id)}
                />
              </div>
            </li>
          ))}
        </ul>
        <Link
          to="/dashboard"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: "block",
            margin: "20px auto",
          }}
          className="btn btn-large btn-flat waves-effect white black-text"
        >
          Back
        </Link>
      </div>
    );
};

export default ViewQuotes;
