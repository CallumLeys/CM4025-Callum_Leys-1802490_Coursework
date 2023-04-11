import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createQuote } from "../../actions/quoteActions";
import "./CreateQuote.css"

const ViewQuote = ({}) => {
    const viewQuote = useSelector(state => state.quotes.quote[0]);
    const [quote, setQuote] = useState(viewQuote); // Set the initial state with the quote subtask value
    // ---------------------------------------- Human Resources Functions ----------------------------------------
    // Function to handle HR Description change
    const handleHRDescriptionChange = (e, hrIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
        const humanResources = [...prevState.humanResources];
        humanResources[hrIndex].hrJobDescription = value;
        return { ...prevState, humanResources };
        });
    };
    
    // Function to handle HR Hours change
    const handleHRHoursChange = (e, hrIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
        const humanResources = [...prevState.humanResources];
        humanResources[hrIndex].hrHours = parseInt(value, 10);
        return { ...prevState, humanResources };
        });
    };
    
    // Function to handle HR Rate change
    const handleHRRateChange = (e, hrIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
        const humanResources = [...prevState.humanResources];
        humanResources[hrIndex].hrRate = value;
        return { ...prevState, humanResources };
        });
    };

    const handleRemoveHR = (hrIndex) => {
        // Create a copy of the subtask object to avoid modifying the original state directly
        const updatedQuote = { ...quote };
      
        // Remove the human resource item at the specified index from the humanResources array
        updatedQuote.humanResources.splice(hrIndex, 1);
      
        // Call the state update function to update the subtask state with the modified array
        setQuote(updatedQuote);
    };

    // ---------------------------------------- Render ----------------------------------------
    return (
        <div>
          <h1>View Quote: {quote.quoteName}</h1>
            {quote.subtasks.map((subtask, index) => (
            <div key={index}>
                <h2>Subtask {index + 1}: {subtask.subtaskName}</h2>
                <h3>Human Resources</h3>
                <ul>
                {subtask.humanResources.map((humanResource, hrIndex) => (
                    <React.Fragment key={`hr-${hrIndex}`}>
                    <li style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        <div style={{ flex: "1", marginRight: "8px" }}>
                        HR Description:
                        <input
                            type="text"
                            value={humanResource.hrJobDescription}
                            onChange={(e) => handleHRDescriptionChange(e, hrIndex)}
                        />
                        </div>
                        <div style={{ flex: "1", marginRight: "8px" }}>
                        HR Hours:
                        <input
                            type="number"
                            value={humanResource.hrHours}
                            onChange={(e) => handleHRHoursChange(e, hrIndex)}
                        />
                        </div>
                        <div style={{ flex: "1" }}>
                        HR Rate:
                        <select
                            value={humanResource.hrRate}
                            onChange={(e) => handleHRRateChange(e, hrIndex)}
                        >
                            <option value="Junior">Junior</option>
                            <option value="Standard">Standard</option>
                            <option value="Senior">Senior</option>
                        </select>
                        </div>
                        <button onClick={() => handleRemoveHR(hrIndex)} className="btn btn-small red">Remove Human Resource</button>
                    </li>
                    </React.Fragment>
                ))}
                </ul>
                <h3>Physical Resources</h3>
                <ul>
                {subtask.physicalResources.map((physicalResource, prIndex) => (
                    <React.Fragment key={`pr-${prIndex}`}>
                    <li style={{ marginTop: '8px' }}>PR Description: {physicalResource.prDescription}</li>
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