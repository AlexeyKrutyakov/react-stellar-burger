import styles from './nav-panel.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function NavPanel () {
  return (
    <nav className={`${styles.panel} mt-4 mb-4`}>
      <ul className={styles.list}>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <a className={styles.link} href="#">
            <BurgerIcon type='primary' />
            <p className="text text_type_main-default">Конструктор</p>
          </a>
        </li>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <a className={styles.link} href="#">
            <ListIcon type='secondary' />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </a>
        </li>
      </ul>
      <div className={styles.wrapper_logo}>
        <Logo />
      </div>
      <ul className={styles.list}>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <a className={styles.link} href="#">
            <ProfileIcon type='secondary' />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavPanel;