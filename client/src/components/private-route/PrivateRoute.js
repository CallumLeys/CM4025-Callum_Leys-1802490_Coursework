import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component, isAdminRoute, ...rest }) {
    // get the auth state to see if user isAuthenticated and user role
    const auth = useSelector(state => state.auth);
    const isAuth = auth.isAuthenticated;
    const userRole = auth.user.userRole;
    
    // condition, if user is not authenticated, return to login page
    if (!isAuth) {
        console.log("Not logged in!")
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // If it's an admin route and user role is not admin, redirect to dashboard
    if (isAdminRoute && userRole !== 'admin') {
        console.log("Unauthorised!")
        // not authorized for admin route, redirect to unauthorized page
        return <Navigate to="/dashboard" />
    }

    // authorized so return component (dashboard)
    return Component;
}
