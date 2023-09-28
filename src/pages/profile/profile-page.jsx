import styles from './profile-page.module.css';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ProfilePage() {
  return(
    <div className={styles.content}>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          <li className={styles.menu_item}>
            <Link to='/profile' className={styles.link} >
              <p className={`${styles.link_active} text text_type_main-medium`}>Профиль</p>
            </Link>
          </li>
          <li className={styles.menu_item}>
            <p className={`text text_type_main-medium text_color_inactive`}>История&nbsp;заказов</p>
          </li>
          <li className={styles.menu_item}>
            <p className={`text text_type_main-medium text_color_inactive`}>Выход</p>
          </li>
        </ul>
        <span className={`text text_type_main-default text_color_inactive mt-20`} style={{ opacity: 0.4}}>
          В этом разделе вы можете<br/>изменить свои персональные данные
        </span>
      </div>
      <form action="profile">
        <Input type='text' placeholder='Имя' value='Марк' icon='EditIcon' color='#8585AD' />
        <EmailInput placeholder='Логин' value='mail@stellar.burgers' isIcon={true} extraClass='mt-6'/>
        <PasswordInput value='hfjl&90*ljh' icon='EditIcon' extraClass='mt-6'/>
      </form>
    </div>
  );
}
