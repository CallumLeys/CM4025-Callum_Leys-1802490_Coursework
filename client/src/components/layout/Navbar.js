import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Navbar = ({ auth, logoutUser }) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const renderAuthButtons = () => {
    if (auth.isAuthenticated) {
      return (
        <ul className="right">
          <li>
            <span className="black-text">{`Welcome, ${auth.user.name}`}</span>
          </li>
          <li>
            <button
              onClick={onLogoutClick}
              className="btn waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="right">
          <li>
            <Link to="/login" className="black-text">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="black-text">
              Register
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="navbar-fixed">
      <nav className="z-depth-0">
        <div className="nav-wrapper white">
          <Link
            to="/"
            style={{
              fontFamily: "monospace",
            }}
            className="col s5 brand-logo center black-text"
          >
            <i className="material-icons">code</i>
            CleysQuotes
          </Link>
          {renderAuthButtons()}
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
