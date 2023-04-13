<<<<<<< HEAD
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuotes } from "../../actions/quoteActions";
import { Link } from "react-router-dom";

const ViewQuotes = ({ email }) => {
    const dispatch = useDispatch();
    const quotes = useSelector(state => state.quotes);
  
    useEffect(() => {
      // Fetch quotes from backend with email
      dispatch(fetchQuotes(email));
    }, [dispatch, email]);

  return (
    <div>
      <h1>Quotes {console.log(quotes)}</h1>
      <ul>
        {quotes?.map(quote => (
          <li key={quote._id}>{quote.quoteName}</li>
        ))}
      </ul>
      <Link
        to="/dashboard"
        style={{
          width: "140px",
          borderRadius: "3px",
          letterSpacing: "1.5px"
        }}
        className="btn btn-large btn-flat waves-effect white black-text"
      >
        Back
      </Link>
    </div>
  );
};

export default ViewQuotes;
=======
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuote, fetchQuotes, viewQuote } from "../../actions/quoteActions";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./CreateQuote.css"

const ViewQuotes = ({}) => {
    const dispatch = useDispatch();
    const [quotes, setQuotes] = useState([]); // State to store quotes
    const [quote, setQuote] = useState([]); // State to store quotes
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedQuotes, setSelectedQuotes] = useState([]);
    const email = useSelector(state => state.auth.user.email);
    const navigate = useNavigate();
    let combinedTotal = 0;
  
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
      // Dispatch the loginUser action
      dispatch(viewQuote(quoteId)).then(() => {
        // navigate to view-quote page
        navigate("/view-quote");
      })
      .catch(err => {
        // Handle any errors that occurred during the loginUser action dispatch
        console.error(err);
      });
    };

    const handleCheckboxChange = (event, quoteId) => {
      if (event.target.checked) {
        // If checkbox is checked, add quoteId to selectedQuotes
        setSelectedQuotes([...selectedQuotes, quoteId]);
        console.log("Added ", quoteId)
      } else {
        // If checkbox is unchecked, remove quoteId from selectedQuotes
        setSelectedQuotes(selectedQuotes.filter((id) => id !== quoteId));
        console.log("Removed ", quoteId)
      }
      console.log(selectedQuotes)
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
            {quotes.map((quote) => (
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
                  <label>
                    <input 
                      type="checkbox"
                      class="filled-in"
                      checked={selectedQuotes.includes(quote._id)}
                      onChange={(event) => handleCheckboxChange(event, quote._id)}
                    />
                    <span>Add to combined quotes</span>
                  </label>
                  <div>Quote: {quote.quoteName}</div>
                  <div>Total: £{quote.quoteCost.toFixed(2)}</div>
                  <div>
                    {quote.subtasks.map((subtask) => (
                      <div key={subtask._id} style={{fontSize: '15px'}}>
                        {subtask.subtaskName}: £{subtask.subtaskTotal.toFixed(2)}
                      </div>
                    ))}
                  </div>
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
        {selectedQuotes.length > 0 && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h4>Combined Quotes:</h4>
            <ul style={{ padding: "0", listStyle: "none" }}>
              {selectedQuotes.map((quoteId) => {
                // Find the quote in the quotes array by matching quoteId with _id
                const quote = quotes.find((quote) => quote._id === quoteId);
                combinedTotal += quote.quoteCost;
                // Render the relevant quote if found
                if (quote) {
                  return (
                    <li key={quote._id}>
                      <u>{quote.quoteName} - £{quote.quoteCost.toFixed(2)}</u>
                      <br />
                      Subtasks:
                      <ul>
                        {quote.subtasks.map((subtask) => (
                          <li key={subtask.subtaskId}>
                            {subtask.subtaskName} - £{subtask.subtaskTotal.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return null; // Render nothing if quote not found
              })}
            </ul>
            Quote Total: £{combinedTotal.toFixed(2)}
          </div>
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
>>>>>>> backup-master
