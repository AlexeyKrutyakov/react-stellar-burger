// import from modules
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
// import utils
import { getProfile } from '../../utils/store-selectors';

function ProtectedRouteElement({ component, onlyUnauth = false }) {
  const isAuthChecked = useSelector(getProfile).isAuthChecked;
  const user = useSelector(getProfile).user;
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnauth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnauth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnauth = ({ component }) => (
  <ProtectedRouteElement component={component} onlyUnauth={true} />
);
