import styles from './login-page.module.css';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { login } from '../../services/profileSlice';


export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  function handleLoginClick() {
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Login';
  // eslint-disable-next-line
  },[]);
  
  return(
    <div className={styles.content}>
      <form action="login">
        <h1 className='text text_type_main-medium'>Вход</h1>
        <EmailInput size='default' defaultValue={'sk1alexey@yandex.ru'} onChange={e => setEmail(e.target.value)} extraClass='mt-6' />
        <PasswordInput size='default' defaultValue={'aKrutyakov@$05'} onChange={e => setPassword(e.target.value)} extraClass='mt-6' />
        <Button htmlType='button' type='primary' size='medium' extraClass='mt-6' onClick={handleLoginClick}>Войти</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы&nbsp;&mdash; новый пользователь?&nbsp;
        <Link to='/register' style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Зарегистрироваться</span>
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли&nbsp;пароль?&nbsp;
        <Link to='/forgot-password' style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Восстановить&nbsp;пароль</span>
        </Link>
      </p>
    </div>
  );
}