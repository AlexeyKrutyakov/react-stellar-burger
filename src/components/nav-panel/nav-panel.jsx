import styles from './nav-panel.module.css';
// import components
import { NavLink } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import constants
import { PATHS, STYLES } from '../../utils/constants';

function NavPanel() {
  return (
    <nav className={`${styles.panel} mt-4 mb-4`}>
      <ul className={styles.list}>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <NavLink to={'/'} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div className={isActive ? styles.link_active : styles.link}>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`${STYLES.text.default}`}>Конструктор</p>
              </div>
            )}
          </NavLink>
        </li>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <NavLink to={PATHS.orderFeed} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div className={isActive ? styles.link_active : styles.link}>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`${STYLES.text.default}`}>Лента заказов</p>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
      <div className={styles.wrapper_logo}>
        <Logo />
      </div>
      <ul className={styles.list}>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <NavLink to={PATHS.profile.index} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div className={isActive ? styles.link_active : styles.link}>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className={`${STYLES.text.default}`}>Личный кабинет</p>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavPanel;
