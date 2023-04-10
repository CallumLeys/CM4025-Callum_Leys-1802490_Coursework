import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

const Dashboard = ({ auth, logoutUser }) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const { user } = auth;
  console.log(auth);
  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Dashboard</b>
              </h4>
              <h5 className="center-align flow-text grey-text text-darken-1">
                You are logged into{" "}
                <span style={{ fontFamily: "monospace" }}>CleysQuotes</span>
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col s12 center-align">
              <Link
                to="/create-quote"
                className="btn waves-effect waves-light hoverable blue accent-3"
                style={{
                  width: "200px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "2rem",
                  marginRight: "1rem",
                }}
              >
                Create Quote
              </Link>
              <Link
                to="/view-quotes"
                className="btn waves-effect waves-light hoverable blue accent-3"
                style={{
                  width: "200px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "2rem",
                }}
              >
                View Quotes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
