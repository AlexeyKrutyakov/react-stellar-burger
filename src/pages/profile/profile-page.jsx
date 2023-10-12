import styles from './profile-page.module.css';
// imports from modules
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
// import services
import { logout } from '../../services/profileSlice';
// import constants
import { PATHS } from '../../utils/constants';

export default function ProfilePage() {
  const refreshToken = localStorage.getItem('refreshToken');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(logout(refreshToken));
    navigate(PATHS.login);
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Profile';
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          <li className={styles.menu_item}>
            <NavLink
              to={PATHS.profile.index}
              end
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <div className={isActive ? styles.link_active : styles.link}>
                  <p className="text text_type_main-medium">Профиль</p>
                </div>
              )}
            </NavLink>
          </li>
          <li className={styles.menu_item}>
            <NavLink
              to={PATHS.profile.ordersHistory}
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <div className={isActive ? styles.link_active : styles.link}>
                  <p className="text text_type_main-medium">
                    История&nbsp;заказов
                  </p>
                </div>
              )}
            </NavLink>
          </li>
          <li className={styles.menu_item}>
            <NavLink to={PATHS.home} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <div className={isActive ? styles.link_active : styles.link}>
                  <p
                    className="text text_type_main-medium"
                    onClick={logoutHandler}
                  >
                    Выход
                  </p>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
        <span
          className={`text text_type_main-default text_color_inactive mt-20`}
          style={{ opacity: 0.4 }}
        >
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </span>
      </div>
      <Outlet />
    </div>
  );
}
