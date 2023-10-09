import styles from './profile-page.module.css';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/profileSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { editUser } from '../../services/profileSlice';

export default function ProfilePage() {
  const user = useSelector(state => state.profile.user);
  const defaultName = user.name;
  const defaultEmail = user.email;
  const defaultPassword = 'aKrutyakov@$05';

  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [formIsChanged, setFormIsChanged] = useState(false);


  const refreshToken = localStorage.getItem('refreshToken');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function clickCancelHandler() {
    setName(defaultName);
    setEmail(defaultEmail);
    setPassword(defaultPassword);
    setFormIsChanged(false);
  }

  function clickSaveHandler() {
    setFormIsChanged(false);
    dispatch(editUser({ name, email, password }));
  }

  function inputNameHandler(event) {
    setFormIsChanged(true);
    setName(event.target.value);
  };
  
  const inputEmailHandler = (event) => {
    setFormIsChanged(true);
    setEmail(event.target.value);
  };
  
  function inputPasswordHandler(event) {
    setPassword(event.target.value);
    setFormIsChanged(true);
  };

  function logoutHandler() {
    dispatch(logout(refreshToken));
    navigate('/login');
  };

  useEffect(() => {
    document.title = 'Stellar Burgers: Profile';
  }, []);

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
            <p className={`${styles.link_inactive} text text_type_main-medium text_color_inactive`} onClick={logoutHandler}>Выход</p>
          </li>
        </ul>
        <span className={`text text_type_main-default text_color_inactive mt-20`} style={{ opacity: 0.4}}>
          В этом разделе вы можете<br/>изменить свои персональные данные
        </span>
      </div>
      <form className={styles.form} action="profile">
        <Input
          type='text'
          placeholder='Имя'
          value={name}
          icon='EditIcon'
          onChange={inputNameHandler}
        />
        <EmailInput
          placeholder='Логин'
          value={email}
          isIcon={true}extraClass='mt-6'
          onChange={inputEmailHandler}
        />
        <PasswordInput
          value={password}
          icon='EditIcon'
          extraClass='mt-6'
          onChange={inputPasswordHandler}
        />
        <div className={`${styles.buttons} mt-6`}>
          { formIsChanged &&
            <Button
              htmlType='button'
              type='secondary'
              onClick={clickCancelHandler}
            >
              Отмена
            </Button>
          }
          { formIsChanged &&
            <Button
              htmlType='button'
              onClick={clickSaveHandler}
            >
              Сохранить
            </Button>
          }
        </div>
      </form>
    </div>
  );
}
