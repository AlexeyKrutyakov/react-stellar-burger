// import from modules
import { Navigate, useLocation } from 'react-router';
// import utils
import { getProfile } from '../../utils/store-selectors';
// import constants
import { PATHS } from '../../utils/constants';
// import types
import { useAppSelector } from 'types';

function ProtectedRouteElement({
  component,
  onlyUnauth = false,
}: {
  component: JSX.Element;
  onlyUnauth?: boolean;
}) {
  const isAuthChecked = useAppSelector(getProfile).isAuthChecked;
  const user = useAppSelector(getProfile).user;
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
