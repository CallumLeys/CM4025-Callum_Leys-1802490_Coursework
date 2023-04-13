import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { editQuote } from "../../actions/quoteActions";
import "./CreateQuote.css"

const ViewQuote = ({}) => {
    // set variables for the current quote, the new quote and success messages
    const viewQuote = useSelector(state => state.quotes.quote[0]);
    const [quote, setQuote] = useState(viewQuote);
    const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();  

    // ---------------------------------------- Subtask-level Functions ----------------------------------------
    // handler for subtask name updates
    const handleSubtaskChange = (e, index) => {
        const { value } = e.target;
        setQuote(prevState => {
            const updatedSubtasks = [...prevState.subtasks];
            updatedSubtasks[index].subtaskName = value;
            const updatedQuote = { ...prevState, subtasks: updatedSubtasks };
            return updatedQuote;
        });
    };

    // handler for adding a subtask
    const handleAddSubtask = () => {
        setQuote(prevState => {
          return {
            ...prevState,
            subtasks: [
              ...prevState.subtasks,
              { subtaskName: "", humanResources: [], physicalResources: [] }
            ]
          };
        });
      };
      
    // handler for removing a subtask
    const handleRemoveSubtask = (index) => {
        setQuote(prevState => {
          const updatedSubtasks = [...prevState.subtasks];
          updatedSubtasks.splice(index, 1);
          return {
            ...prevState,
            subtasks: updatedSubtasks
          };
        });
    };
      
    // handler for changing the name of the quote
    const handleQuoteNameChange = (e) => {
        setQuote(prevState => {
            prevState.quoteName = e.target.value
            const updatedQuote = { ...prevState };
            return updatedQuote;
        });
    };

    // ---------------------------------------- Submit Functions ----------------------------------------
    // submit funtionality
    const onSubmit = (e) => {
        e.preventDefault();
        // set the quoteData to the newly edited quote
        const quoteData = quote;
        // bug where it adds HR and PR arrays to top-level quote. Should be within subtask (Which it already is)
        // delete duplicate values
        delete quoteData.humanResources;
        delete quoteData.physicalResources;
        // edit the quote on the backend
          dispatch(editQuote(quoteData)).then(() => {
            setShowSuccess(true); // Show success message
          })
          .catch((err) => {
            console.log(err); // Show error message
          });
    };

    // handler for closing the success message prompt
    const handleCloseSuccess = () => {
        // Hide success message
        setShowSuccess(false);
    };

    // ---------------------------------------- Human Resources Functions ----------------------------------------
    // handle HR Description change
    const handleHRDescriptionChange = (e, index, hrIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
            const subtask = [...prevState.subtasks];
            const humanResources = subtask[index].humanResources
            humanResources[hrIndex].hrJobDescription = value;
            return { ...prevState, humanResources };
        });
    };
    
    // handle HR Hours change
    const handleHRHoursChange = (e, index, hrIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
            const subtask = [...prevState.subtasks];
            const humanResources = subtask[index].humanResources
            humanResources[hrIndex].hrHours = parseInt(value, 10);
            return { ...prevState, humanResources };
        });
    };
    
    // handle HR Rate change
    const handleHRRateChange = (e, index, hrIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
            const subtask = [...prevState.subtasks];
            const humanResources = subtask[index].humanResources
            humanResources[hrIndex].hrRate = value;
            return { ...prevState, humanResources };
        });
    };

    // handle adding a human resource to a subtask
    const handleAddHR = (index) => {
        const updatedQuote = { ...quote };
        const subtask = updatedQuote.subtasks[index];
        subtask.humanResources.push({hrJobDescription: "", hrHours: 0, hrRate: []});
        setQuote(updatedQuote);
    };

    // handle removing a human resource from subtask
    const handleRemoveHR = (index, hrIndex) => {
        const updatedQuote = { ...quote };
        const subtask = updatedQuote.subtasks[index];
        if (subtask.humanResources.length > 1) {
            subtask.humanResources.splice(hrIndex, 1);
            setQuote(updatedQuote);
        } else {
            // Display a message indicating that at least one human resource must be saved
            alert("You must have at least 1 human resource.");
        }
    };

    // ---------------------------------------- Physical Resources Functions ----------------------------------------
    // handler for resource type changes
    const handlePRResourceTypeChange = (e, index, prIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
            const subtask = [...prevState.subtasks];
            const physicalResources = subtask[index].physicalResources
            physicalResources[prIndex].prResourceType = value;
            return { ...prevState, physicalResources };
        });
    };

    // handler for description changes
    const handlePRDescriptionChange = (e, index, prIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
            const subtask = [...prevState.subtasks];
            const physicalResources = subtask[index].physicalResources
            physicalResources[prIndex].prDescription = value;
            return { ...prevState, physicalResources };
        });
    };

    // handler for cost changes
    const handlePRCostChange = (e, index, prIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
            const subtask = [...prevState.subtasks];
            const physicalResources = subtask[index].physicalResources
            physicalResources[prIndex].prCost = value;
            return { ...prevState, physicalResources };
        });
    };

    // handler for hours changes
    const handlePRHoursChange = (e, index, prIndex) => {
        const { value } = e.target;
        setQuote((prevState) => {
            const subtask = [...prevState.subtasks];
            const physicalResources = subtask[index].physicalResources
            physicalResources[prIndex].prHours = value;
            return { ...prevState, physicalResources };
        });
    };

    // handler for adding a physical resource to the subtask
    const handleAddPR = (index) => {
        const updatedQuote = { ...quote };
        const subtask = updatedQuote.subtasks[index];
        subtask.physicalResources.push({prResourceType: [], prDescription: "", prCost: "", prHours: ""});
        setQuote(updatedQuote);
    };

    // handler for removing a physical resource from the subtask
    const handleRemovePR = (index, prIndex) => {
        const updatedQuote = { ...quote };
        const subtask = updatedQuote.subtasks[index];
        subtask.physicalResources.splice(prIndex, 1);
        setQuote(updatedQuote);
    };

    // ---------------------------------------- Render ----------------------------------------
    return (
        <div>
          <h1>View Quote</h1>
          <div style={{marginLeft: '20%', marginRight: '20%'}}>
            Quote Name:
            <input
                type="text"
                value={quote.quoteName}
                onChange={(e) => handleQuoteNameChange(e)}
            />
          </div>
            {/* ------------------------------ START SUBTASK RENDERING ------------------------------ */}
            {quote.subtasks.map((subtask, index) => (
            <div key={index} style={{marginLeft: '20%', marginRight: '20%'}}>
                <p style={{backgroundColor: "rgba(128, 128, 128, 0.3)"}}>Subtask Name:</p>
                <input
                    type="text"
                    value={subtask.subtaskName}
                    onChange={(e) => handleSubtaskChange(e, index)}
                />
                <button onClick={() => handleAddHR(index)} className="btn btn-small">
                    Add Human Resource
                </button>
                <button onClick={() => handleAddPR(index)} className="btn btn-small">
                    Add Physical Resource
                </button>
                <p style={{backgroundColor: "rgba(128, 128, 128, 0.3)", marginRight: '50%'}}>Human Resources</p>
                {/* ------------------------------ START HR RENDERING ------------------------------ */}
                <ul>
                {subtask.humanResources.map((humanResource, hrIndex) => (
                    <React.Fragment key={`hr-${hrIndex}`}>
                    <li style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        <div style={{ flex: "1", marginRight: "8px" }}>
                        HR Description:
                        <input
                            type="text"
                            value={humanResource.hrJobDescription}
                            onChange={(e) => handleHRDescriptionChange(e, index, hrIndex)}
                        />
                        </div>
                        <div style={{ flex: "1", marginRight: "8px" }}>
                        HR Hours:
                        <input
                            type="number"
                            value={humanResource.hrHours}
                            onChange={(e) => handleHRHoursChange(e, index, hrIndex)}
                        />
                        </div>
                        <div style={{ flex: "1" }}>
                        HR Rate:
                        <select
                            value={humanResource.hrRate.length ? humanResource.hrRate : 'Select Rate'}
                            onChange={(e) => handleHRRateChange(e, index, hrIndex)}
                        >
                            <option value="">Select Rate</option>
                            <option value="Junior">Junior</option>
                            <option value="Standard">Standard</option>
                            <option value="Senior">Senior</option>
                        </select>
                        </div>
                        <button onClick={() => handleRemoveHR(index, hrIndex)} className="btn btn-small red">Remove Human Resource</button>
                    </li>
                    </React.Fragment>
                ))}
                </ul>
                {/* ------------------------------ END HR RENDERING ------------------------------ */}
                {/* ------------------------------ START PR RENDERING ------------------------------ */}
                <p style={{backgroundColor: "rgba(128, 128, 128, 0.3)", marginRight: '50%'}}>Physical Resources</p>
                <ul>
                {subtask.physicalResources.map((physicalResource, prIndex) => (
                    <React.Fragment key={`pr-${prIndex}`}>
                    <li style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    
                    <div style={{ flex: "1" }}>
                    PR Description:
                    <input
                        type="text"
                        value={physicalResource.prDescription}
                        onChange={(e) => handlePRDescriptionChange(e, index, prIndex)}
                    />
                    </div>
                    <div style={{ flex: "1" }}>
                    Resource Type:
                    <select
                        value={physicalResource.prResourceType.length ? physicalResource.prResourceType : 'Select Resource Type'}
                        onChange={(e) => handlePRResourceTypeChange(e, index, prIndex)}
                    >
                        <option value="">Select Resource Type</option>
                        <option value="One-off">One-off</option>
                        <option value="Hourly">Hourly</option>
                    </select>
                    </div>
                    <div style={{ flex: "1" }}>
                    PR Cost:
                    <input
                        type="number"
                        value={physicalResource.prCost}
                        onChange={(e) => handlePRCostChange(e, index, prIndex)}
                    />
                    </div>
                    
                    {physicalResource.prResourceType === "Hourly" && (
                        <div style={{ flex: "1" }}>
                        <li>
                        PR Hours:
                        <input
                            type="number"
                            value={physicalResource.prHours}
                            onChange={(e) => handlePRHoursChange(e, index, prIndex)}
                        />
                        </li>
                        </div>
                    )}
                    <button onClick={() => handleRemovePR(index, prIndex)} 
                        className="btn btn-small red" style={{width:'220px', 
                        fontSize:'11.5px'}}>Remove Physical Resource
                    </button>
                    </li>
                    </React.Fragment>
                ))}
                {/* ------------------------------ END PR RENDERING ------------------------------ */}
                </ul>
                <button onClick={() => handleRemoveSubtask(index)} className="btn btn-small red" style={{ marginTop: '10px' }}>
                    Remove Subtask
                </button>
            </div>
            ))}
            {/* ------------------------------ END SUBTASK RENDERING ------------------------------ */}
            <button onClick={handleAddSubtask} className="btn btn-small" style={{ marginTop: '10px', marginLeft: '20%'}}>
            Add Subtask
            </button>
            <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/view-quotes" className="btn btn-large btn-flat waves-effect white black-text">
            Back
            </Link>
            <button onClick={onSubmit}
                className="btn"
                style={{ marginTop: '20px', marginLeft: "10px"}}>
                Save
            </button>
            {showSuccess && (
                <div className="success-message">
                    <div className="success-message-content">
                    <p>Quote Changed Successfully!</p>
                    <button onClick={handleCloseSuccess} className="btn btn-small" style={{ marginLeft: "10px"}}>
                        Close
                    </button>
                    </div>
                </div>
            )}
            </div>
        </div>
      );      
};

export default ViewQuote;