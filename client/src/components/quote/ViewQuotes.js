import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuote, fetchQuotes } from "../../actions/quoteActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./CreateQuote.css"

const ViewQuotes = ({}) => {
    const dispatch = useDispatch();
    const [quotes, setQuotes] = useState([]); // State to store quotes
    const email = useSelector(state => state.auth.user.email);
    const [showSuccess, setShowSuccess] = useState(false);
  
    useEffect(() => {
      // Fetch quotes from backend with email
      dispatch(fetchQuotes(email)).then(response => {
        setQuotes(response); // Update the quotes state with the response
        console.log("Response:", response); // Log the response when dispatch is successful
      }).catch(error => {
        console.log("Error:", error); // Log any error that occurred during dispatch
      });
    }, [dispatch, email]);

    const handleDelete = quoteId => {
      dispatch(deleteQuote(quoteId, email)).then(() => {
        // Fetch updated quotes from backend
        dispatch(fetchQuotes(email)).then(response => {
          setQuotes(response); // Update the quotes state with the updated response
          setShowSuccess(true);
        }).catch(error => {
          console.log("Error:", error); // Log any error that occurred during dispatch
        });
      }).catch(error => {
        console.log("Error:", error); // Log any error that occurred during dispatch
      });
    };

    const handleView = (quoteId) => {
      console.log(`Viewing quote with ID: ${quoteId}`);
      // Navigate to edit quote screen and pass the selected quote as state
      
    };

    const handleCloseSuccess = () => {
      // Hide success message
      setShowSuccess(false);
    };

    return (
      <div>
        <h1>Your Quotes</h1>
        <div>
          {showSuccess && (
              <div className="success-message">
                <div className="success-message-content">
                  <p>Quote Deleted Successfully!</p>
                  <button onClick={handleCloseSuccess} className="btn btn-small">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        {quotes && quotes.length === 0 && (
          <p style={{ color: "red", textAlign: "center" }}>No quotes found</p>
        )}
        {quotes && (
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
            {quotes.map(quote => (
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
                <div style={{ flex: "1" }}>
                  <div>Quote: {quote.quoteName}</div>
                  <div>Total: £{quote.quoteCost}</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => handleView(quote._id)}
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
        )}
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
