import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Dashboard from '../dashboard/Dashboard';

export default function PrivateRoute({ component: Component, ...rest }) {
    // get the auth state to see if user isAuthenticated
    const auth = useSelector(state => state.auth);
    const isAuth = auth.isAuthenticated;
    //console.log('authUser', auth);
    
    // condition, if user is not authenticated, return to login page
    if (!isAuth) {
        console.log("Not logged in!")
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }
    
    // authorized so return component (dashboard)
    return Component;
}