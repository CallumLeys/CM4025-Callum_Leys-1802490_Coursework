import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createQuote } from "../../actions/quoteActions";
import "./CreateQuote.css"

const ViewQuote = ({}) => {
    const quote = useSelector(state => state.quotes.quote[0]);

    return (
        <div>
          <h1>View Quote: {quote.quoteName}</h1>
            {quote.subtasks.map((subtask, index) => (
            <div key={index}>
                <h2>Subtask {index + 1}: {subtask.subtaskName}</h2>
                <ul>
                {subtask.humanResources.map((humanResource, hrIndex) => (
                    <React.Fragment key={`hr-${hrIndex}`}>
                    <li>HR Description: {humanResource.hrJobDescription}</li>
                    <li>HR Hours: {humanResource.hrHours}</li>
                    <li>HR Rate: {humanResource.hrRate}</li>
                    </React.Fragment>
                ))}
                </ul>
                <ul>
                {subtask.physicalResources.map((physicalResource, prIndex) => (
                    <React.Fragment key={`pr-${prIndex}`}>
                    <li>PR Description: {physicalResource.prDescription}</li>
                    <li>PR Resource Type: {physicalResource.prResourceType}</li>
                    <li>PR Cost: {physicalResource.prCost}</li>
                    {physicalResource.prResourceType === "Hourly" && (
                        <li>PR Hours: {physicalResource.prHours}</li>
                    )}
                    </React.Fragment>
                ))}
                </ul>
            </div>
            ))}
          <Link
            to="/view-quotes"
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

export default ViewQuote;