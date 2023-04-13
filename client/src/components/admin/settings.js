import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRateMap } from "../../actions/authActions";
import rateMap from "../../utils/rateMap.json";

const Settings = () => {
    // state variable to store edited wages
    const [editedRateMap, setEditedRateMap] = useState(rateMap);
    const dispatch = useDispatch();

    // event handler for input changes
    const handleInputChange = (event, job) => {
        const { name, value } = event.target;
        setEditedRateMap(prevRateMap => ({
            ...prevRateMap,
            [job]: parseInt(value)
        }));
    };

    // function to handle form submit
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // update rateMap JSON file with edited wages
        dispatch(updateRateMap(editedRateMap));
        console.log("Updated rateMap:", editedRateMap);
    };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleFormSubmit} style={{marginRight: '20%', marginLeft: '20%'}}>
                {Object.keys(editedRateMap).map(job => (
                    <div key={job}>
                        <label>
                            {job}:{" "}
                            <input
                                type="number"
                                name={job}
                                value={editedRateMap[job]}
                                onChange={(event) => handleInputChange(event, job)}
                            />
                        </label>
                    </div>
                ))}
                <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <Link
                    to="/dashboard"
                    style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    display: "block",
                    marginRight: "10px",
                    }}
                    className="btn btn-large btn-flat waves-effect white black-text"
                >
                    Back
                </Link>
                <button type="submit" className="btn">
                    Save
                </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
