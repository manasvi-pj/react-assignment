// ** React Imports
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // ** Vars
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      // ** Redirect back if already logged in and trying to access "/login"
      if (location.pathname === '/login') {
        navigate(-1);
      }
    }
  }, [isAuthenticated, navigate, location, user?.role]);

  return !isAuthenticated ? children : null;
};

export default PublicRoute;
