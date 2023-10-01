import styles from './profile-page.module.css';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
// import { getNewTokens, getUserInfo } from '../../services/profileSlice';
import { getCookie } from '../../utils/cookies';
import { COOKIES } from '../../utils/constants';
import { logout } from '../../services/profileSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const refreshTokenName = COOKIES.tokens.names.refresh;
  const refreshToken = getCookie(refreshTokenName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function inputHandler() {};

  function logoutHandler() {
    dispatch(logout(refreshToken));
    navigate('/login');
  };

  function userInfoClickHandler() {
    // const accessToken = getCookie(accessTokenName);
    console.log(refreshToken);

  //   if (!accessToken) {
  //     console.log('getting new tokens');
  //     dispatch(getNewTokens(refreshToken));
  //   }
  //   console.log('getting user info');
  //   dispatch(getUserInfo(addScheme('Bearer',accessToken)));
  }

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
            {/* <Link to='/login'> */}
              <p className={`${styles.link_inactive} text text_type_main-medium text_color_inactive`} onClick={logoutHandler}>Выход</p>
            {/* </Link> */}
          </li>
        </ul>
        <span className={`text text_type_main-default text_color_inactive mt-20`} style={{ opacity: 0.4}}>
          В этом разделе вы можете<br/>изменить свои персональные данные
        </span>
      </div>
      <form action="profile">
        <Input type='text' placeholder='Имя' value='Марк' icon='EditIcon' color='#8585AD' onChange={inputHandler} />
        <EmailInput placeholder='Логин' value='mail@stellar.burgers' isIcon={true} extraClass='mt-6'/>
        <PasswordInput value='hfjl&90*ljh' icon='EditIcon' extraClass='mt-6'/>
      </form>
      <button onClick={userInfoClickHandler}>UserInfo</button>
    </div>
  );
}
