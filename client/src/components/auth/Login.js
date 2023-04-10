import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Link, useNavigate } from "react-router-dom";

const Login = ({history}) => {

  const [state, setState] = useState({
        email: "",
        password: ""
  });

  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [auth.isAuthenticated, history]);
  
  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  
  const onSubmit = e => {
    e.preventDefault();
    
    const userData = {
        email: state.email,
        password: state.password
    };
        
    // Dispatch the loginUser action
    dispatch(loginUser(userData))
      .then(() => {
        // Code to run after loginUser action completes
        if(auth.isAuthenticated){
          navigate("/dashboard");
        }
      })
      .catch(err => {
        // Handle any errors that occurred during the loginUser action dispatch
        console.error(err);
      });
  };

  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={state.email}
                error={errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors.email}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={state.password}
                error={errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
