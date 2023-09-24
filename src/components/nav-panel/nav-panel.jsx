import styles from './nav-panel.module.css';
// import components
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function NavPanel () {
  return (
    <nav className={`${styles.panel} mt-4 mb-4`}>
      <ul className={styles.list}>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <a className={styles.link} href="/constructor">
            <BurgerIcon type='primary' />
            <p className="text text_type_main-default">Конструктор</p>
          </a>
        </li>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <a className={styles.link} href="/orders">
            <ListIcon type='secondary' />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </a>
        </li>
      </ul>
        <div className={styles.wrapper_logo}>
          <a href='/'>
           <Logo />
          </a>
        </div>
      <ul className={styles.list}>
        <li className={`${styles.list__element} mt-4 mr-5 mb-4 ml-5`}>
          <a className={styles.link} href="/personal">
            <ProfileIcon type='secondary' />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavPanel;
