import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createQuote } from "../../actions/quoteActions";
import "./CreateQuote.css"

const CreateQuote = ({}) => {

<<<<<<< HEAD
  const auth = useSelector((state) => state.auth);
  const [quoteName, setQuoteName] = useState(""); // State for overall quote name
=======
  const auth = useSelector((state) => state.auth); // state for user auth
  const [quoteName, setQuoteName] = useState(""); // State for overall quote name
  const [showSuccess, setShowSuccess] = useState(false); // State to manage visibility of success message
  const dispatch = useDispatch();
  
  useEffect(() => {
    setSubtasks([]);
  }, []);

>>>>>>> backup-master
  const [subtasks, setSubtasks] = useState([{
            subtaskName: "", 
            humanResources: [
                {hrJobDescription: "", hrHours: 0, hrRate: []}
            ], 
            physicalResources: [
                {prDescription: "", prResourceType: [], prCost: "", prHours: ""}
            ]
  }]); // State for subtasks

<<<<<<< HEAD
  useEffect(() => {
    setSubtasks([]);
  }, []);

  const [showSuccess, setShowSuccess] = useState(false); // State to manage visibility of success message
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

=======
  // handle change in quote name
>>>>>>> backup-master
  const handleQuoteNameChange = (e) => {
    setQuoteName(e.target.value);
  };

// ------------------------------------------------------ SUBTASK ACTIONS ------------------------------------------------------
<<<<<<< HEAD
// Function to handle changes in subtask name
const handleSubtaskChange = (e, index) => {
=======
  // handling change of subtask name
  const handleSubtaskChange = (e, index) => {
>>>>>>> backup-master
    const { value } = e.target;
    setSubtasks(prevSubtasks => {
      const updatedSubtasks = [...prevSubtasks];
      updatedSubtasks[index].subtaskName = value;
      return updatedSubtasks;
    });
  };

<<<<<<< HEAD
=======
  // handle adding a subtask
>>>>>>> backup-master
  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { subtaskName: "", humanResources: [], physicalResources: [] }]);
  };

<<<<<<< HEAD
=======
  // handle removing a subtask
>>>>>>> backup-master
  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
<<<<<<< HEAD
};

// ------------------------------------------------------ HUMAN RESOURCE ACTIONS ------------------------------------------------------
const handleAddHumanResource = (subtaskIndex) => {
  const updatedSubtasks = [...subtasks];
  updatedSubtasks[subtaskIndex].humanResources.push({hrJobDescription: "", hrHours: 0, hrRate: []});
  setSubtasks(updatedSubtasks);
};

const handleRemoveHumanResource = (subtaskIndex, hrIndex) => {
  const updatedSubtasks = [...subtasks];
  updatedSubtasks[subtaskIndex].humanResources.splice(hrIndex, 1);
  setSubtasks(updatedSubtasks);
};


// Handle change in human resource jobDescription
const handleSubtaskHumanResourceJobDescriptionChange = (e, index, hrIndex) => {
=======
  };

// ------------------------------------------------------ HUMAN RESOURCE ACTIONS ------------------------------------------------------
  // handle adding a HR to the subtask  
  const handleAddHumanResource = (subtaskIndex) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].humanResources.push({hrJobDescription: "", hrHours: 0, hrRate: []});
    setSubtasks(updatedSubtasks);
  };
  // handle removing a HR to the subtask  
  const handleRemoveHumanResource = (subtaskIndex, hrIndex) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].humanResources.splice(hrIndex, 1);
    setSubtasks(updatedSubtasks);
  };


  // handle change in human resource jobDescription
  const handleSubtaskHumanResourceJobDescriptionChange = (e, index, hrIndex) => {
>>>>>>> backup-master
    const { value } = e.target;
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].humanResources[hrIndex].hrJobDescription = value;
    setSubtasks(updatedSubtasks);
  };

<<<<<<< HEAD
// Handle change in human resource hours
const handleSubtaskHumanResourceHoursChange = (e, index, hrIndex) => {
=======
  // handle change in human resource hours
  const handleSubtaskHumanResourceHoursChange = (e, index, hrIndex) => {
>>>>>>> backup-master
    const { value } = e.target;
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].humanResources[hrIndex].hrHours = value;
    setSubtasks(updatedSubtasks);
  };
  
<<<<<<< HEAD
  // Handle change in human resource rate
=======
  // handle change in human resource rate
>>>>>>> backup-master
  const handleSubtaskHumanResourceRateChange = (e, index, hrIndex) => {
    const { value } = e.target;
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].humanResources[hrIndex].hrRate = value;
    setSubtasks(updatedSubtasks);
  };  


// ------------------------------------------------------ PHYSICAL RESOURCE ACTIONS ------------------------------------------------------
<<<<<<< HEAD
  // Function to handle adding a physical resource to a subtask
const handleAddPhysicalResource = (subtaskIndex) => {
=======
  // handle adding a physical resource to a subtask
  const handleAddPhysicalResource = (subtaskIndex) => {
>>>>>>> backup-master
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].physicalResources.push({prResourceType: [], prDescription: "", prCost: "", prHours: ""});
    setSubtasks(updatedSubtasks);
  };
  
<<<<<<< HEAD
  // Function to handle removing a physical resource from a subtask
=======
  // handle removing a physical resource from a subtask
>>>>>>> backup-master
  const handleRemovePhysicalResource = (subtaskIndex, prIndex) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].physicalResources.splice(prIndex, 1);
    setSubtasks(updatedSubtasks);
  };

<<<<<<< HEAD
  // Function to handle changes in Resource Type
  const handleSubtaskResourceTypeChange = (e, index, prIndex) => {
      const { value } = e.target;
      const updatedSubtasks = [...subtasks];
      if (value === 'one-off') {
        updatedSubtasks[index].physicalResources[prIndex].prDescription = '';
        updatedSubtasks[index].physicalResources[prIndex].prCost = 0;
        updatedSubtasks[index].physicalResources[prIndex].prHours = 0;
      }
=======
  // handle changes in Resource Type
  const handleSubtaskResourceTypeChange = (e, index, prIndex) => {
    const { value } = e.target;
    const updatedSubtasks = [...subtasks];
>>>>>>> backup-master
    updatedSubtasks[index].physicalResources[prIndex].prResourceType = value;
    setSubtasks(updatedSubtasks);
  };
  
<<<<<<< HEAD
  // Function to handle changes in Description
=======
  // handle changes in Description
>>>>>>> backup-master
  const handleSubtaskDescriptionChange = (e, index, prIndex) => {
    const { value } = e.target;
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].physicalResources[prIndex].prDescription = value;
    setSubtasks(updatedSubtasks);
  };
  
<<<<<<< HEAD
  // Function to handle changes in Cost
=======
  // handle changes in Cost
>>>>>>> backup-master
  const handleSubtaskCostChange = (e, index, prIndex) => {
    const { value } = e.target;
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].physicalResources[prIndex].prCost = value;
    setSubtasks(updatedSubtasks);
  };
  
<<<<<<< HEAD
  // Function to handle changes in Hours
=======
  // handle changes in Hours
>>>>>>> backup-master
  const handleSubtaskHoursChange = (e, index, prIndex) => {
    const { value } = e.target;
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].physicalResources[prIndex].prHours = value;
    setSubtasks(updatedSubtasks);
  };
  

  
  // ------------------------------------------------------ OTHER ACTIONS ------------------------------------------------------
  const onSubmit = async (e) => {
      e.preventDefault();
      const quoteData = {
          quoteName: quoteName,
          email: auth.user.email,
          subtasks: subtasks
        };
        console.log("Quote Data", quoteData)
<<<<<<< HEAD
        dispatch(createQuote(quoteData));
=======
        dispatch(createQuote(quoteData)).then(() => {
          // Clear all inputs
          setQuoteName("");
          setSubtasks([{ subtaskName: "", humanResources: [], physicalResources: [] }]);
          setShowSuccess(true); // Show success message
        })
        .catch((err) => {
          console.log(err);
        });;
>>>>>>> backup-master
  };

  const handleCloseSuccess = () => {
    // Hide success message
    setShowSuccess(false);
  };
  // ------------------------------------------------------ RENDER ------------------------------------------------------
  return (
<div>
<<<<<<< HEAD
  <h1 style={{ fontSize: '24px', textAlign: 'center', background: '#e0e0e0', padding: '10px' }}>
     Create Quote
  </h1>
=======
  <h1>Create Quote</h1>
>>>>>>> backup-master
  <div className="quote-name" style={{marginRight: '20%', marginLeft: '20%'}}>
    <label htmlFor="quoteName" style={{color: 'black'}}>Quote Name:</label>
    <input
      onChange={handleQuoteNameChange}
      value={quoteName}
      type="text"
      id="quoteName"
      name="quoteName"
    />
  </div>
  <div className="row" style={{marginRight: '20%', marginLeft: '20%'}}>
    {/*  // ------------------------------------------------------ SUBTASK RENDER ------------------------------------------------------ */}
    {subtasks.map((subtask, index) => (
      <div key={index}>
        <div>
          <label htmlFor={`subtask-${index}`} 
            style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "rgba(128, 128, 128, 0.3)",
                    color: "black",
                    padding: "10px"
            }}>
                Subtask {index + 1}
            </label>
          <input
            onChange={(e) => handleSubtaskChange(e, index)}
            value={subtask.subtaskName}
            type="text"
            id={`subtask-${index}`}
            name={`subtask-${index}`}
          />
          <button onClick={() => handleAddHumanResource(index)} className="btn btn-small">
            Add Human Resource
          </button>
          <button onClick={() => handleAddPhysicalResource(index)} className="btn btn-small">
            Add Physical Resource
          </button>
          <label htmlFor={`subtask-${index}`} 
            style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "rgba(128, 128, 128, 0.3)",
                    color: "black",
                    padding: "10px"
            }}>Human Resources</label>
          {/*  // ------------------------------------------------------ HUMAN RESOURCE RENDER ------------------------------------------------------ */}
          {subtask.humanResources.map((hr, hrIndex) => (
            <div key={hrIndex} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                <label htmlFor={`jobDescription-${index}-${hrIndex}`}>
                    Job Description:
                </label>
                <input
                    onChange={(e) => handleSubtaskHumanResourceJobDescriptionChange(e, index, hrIndex)}
                    value={hr.hrJobDescription}
                    type="text"
                    id={`jobDescription-${index}-${hrIndex}`}
                    name={`jobDescription-${index}-${hrIndex}`}
                />
                </div>
                <div style={{ flex: 1, marginRight: '10px' }}>
                <label htmlFor={`hours-${index}-${hrIndex}`}>
                    Hours:
                </label>
                <input
                    onChange={(e) => handleSubtaskHumanResourceHoursChange(e, index, hrIndex)}
                    value={hr.hrHours}
                    type="number"
                    id={`hours-${index}-${hrIndex}`}
                    name={`hours-${index}-${hrIndex}`}
                />
                </div>
                <div style={{ flex: 1, marginRight: '10px' }}>
                <label htmlFor={`rate-${index}-${hrIndex}`}>
                    Rate:
                </label>
                <select
                    onChange={(e) => handleSubtaskHumanResourceRateChange(e, index, hrIndex)}
                    value={hr.hrRate || ""}
                    id={`rate-${index}-${hrIndex}`}
                    name={`rate-${index}-${hrIndex}`}
                >
                    <option value="" disabled>
                    Select Rate
                    </option>
                    <option value="Junior">Junior</option>
                    <option value="Standard">Standard</option>
                    <option value="Senior">Senior</option>
                </select>
                </div>
                <button
                onClick={() => handleRemoveHumanResource(index, hrIndex)}
                className="btn btn-small red"
                >
                Remove Human Resource
                </button>
            </div>
            ))}
            <label htmlFor={`subtask-${index}`} 
            style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "rgba(128, 128, 128, 0.3)",
                    color: "black",
                    padding: "10px"
            }}>Physical Resources</label>
          {/*  // ------------------------------------------------------ PHYSICAL RESOURCE RENDER ------------------------------------------------------ */}
          {subtask.physicalResources.map((pr, prIndex) => (
            <div key={prIndex} style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <label htmlFor={`resourceType-${index}-${prIndex}`}>Resource Type:</label>
                    <select
                    onChange={(e) => handleSubtaskResourceTypeChange(e, index, prIndex)}
                    value={pr.prResourceType || ""}
                    id={`resourceType-${index}-${prIndex}`}
                    name={`resourceType-${index}-${prIndex}`}
                    >
                    <option value="" disabled>
                    Select Resource Type
                    </option>
                    <option value="One-off">One-off</option>
                    <option value="Hourly">Hourly</option>
                    </select>

                    <label htmlFor={`description-${index}-${prIndex}`}>Description:</label>
                    <input
                    onChange={(e) => handleSubtaskDescriptionChange(e, index, prIndex)}
                    value={pr.prDescription}
                    type="text"
                    id={`description-${index}-${prIndex}`}
                    name={`description-${index}-${prIndex}`}
                    />
                </div>

                <div>
                <label htmlFor={`cost-${index}-${prIndex}`}>Cost:</label>
                <input
                onChange={(e) => handleSubtaskCostChange(e, index, prIndex)}
                value={pr.prCost}
                type="number"
                id={`cost-${index}-${prIndex}`}
                name={`cost-${index}-${prIndex}`}
                />

                {pr.prResourceType === "Hourly" && (
                <div>
                    <label htmlFor={`hours-${index}-${prIndex}`}>Hours:</label>
                    <input
                    onChange={(e) => handleSubtaskHoursChange(e, index, prIndex)}
                    value={pr.prHours}
                    type="number"
                    id={`hours-${index}-${prIndex}`}
                    name={`hours-${index}-${prIndex}`}
                    />
                </div>
                )}
                </div>

                <button
                onClick={() => handleRemovePhysicalResource(index, prIndex)}
                className="btn btn-small red"
                style={{marginLeft: "auto"}}
                >
                Remove Physical Resource
                </button>
            </div>
            ))}
            </div>
                <button onClick={() => handleRemoveSubtask(index)} className="btn btn-small red" style={{ marginTop: '10px' }}>
                    Remove Subtask
<<<<<<< HEAD
                    </button>
=======
                </button>
>>>>>>> backup-master
            </div>
    ))}
    {/*  // ------------------------------------------------------ END OF SUBTASK ------------------------------------------------------ */}

    <button onClick={handleAddSubtask} className="btn btn-small" style={{ marginTop: '10px' }}>
      Add Subtask
    </button>
  </div>
  <div className="input-field col s12" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
    <button onClick={onSubmit}
     className="btn"
     style={{ marginTop: '10px'}}>
      Submit
    </button>
    
  </div>
  {showSuccess && (
<<<<<<< HEAD
    <div className="success-msg">
      <p>Quote created successfully!</p>
      <button onClick={handleCloseSuccess} className="btn btn-small">
        Close
      </button>
    </div>
  )}
</div>
=======
      <div className="success-message">
        <div className="success-message-content">
          <p>Quote Created Successfully!</p>
          <button onClick={handleCloseSuccess} className="btn btn-small">
            Close
          </button>
        </div>
      </div>
    )
  };
  <div style={{backgroundColor: "rgba(128, 128, 128, 0.3)", marginRight: '20%', marginLeft: '20%', textAlign: "center"}}>
    <p><b>Prices calculated as:</b></p>
    <p><b>Total Cost = </b>sum of all subtasks (subtask1 + subtask2 + ... + subtaskN)</p>
    <p><b>Single Subtask Cost = </b>all human resources + all physical resources</p>
    <p><b>Human Resources Cost = </b>sum of all human resource costs (hours * rate)</p>
    <p><b>Physical Resources Cost = </b>sum of all physical resource costs (EITHER <u>cost</u> if <b>Once-off</b> OR <u>cost * hours</u> if <b>Hourly</b>)</p>
    <p><b>A 'Fudge Factor' is considered into the final price for security reasons</b></p>
  </div>
  </div>
>>>>>>> backup-master
);};

export default CreateQuote;
