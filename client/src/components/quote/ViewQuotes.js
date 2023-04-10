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