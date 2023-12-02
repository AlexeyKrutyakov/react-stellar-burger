// import from modules
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
// import utils
import { getProfile } from '../../utils/store-selectors';
// import constants
import { PATHS } from '../../utils/constants';

function ProtectedRouteElement({
  component,
  onlyUnauth = false,
}: {
  component: JSX.Element;
  onlyUnauth?: boolean;
}) {
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
    return <Navigate to={PATHS.login} state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = ProtectedRouteElement;

export const OnlyUnauth = ({ component }: { component: JSX.Element }) => (
  <ProtectedRouteElement component={component} onlyUnauth={true} />
);
