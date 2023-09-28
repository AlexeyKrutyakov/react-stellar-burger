import styles from './login-page.module.css';

import React from 'react';
import { Link } from 'react-router-dom';


import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { login } from '../../services/profileSlice';
import { closeModal, showSpinner } from '../../services/modalSlice';
import { MODAL } from '../../utils/constants';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  function handleButtonClick(event) {
    event.preventDefault();

    dispatch(showSpinner());
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
    dispatch(closeModal({ type: MODAL.type.loadingSpinner }));
  }

  return(
    <div className={styles.content}>
      <form action="login">
        <h1 className='text text_type_main-medium'>Вход</h1>
        <EmailInput size='default' value={email} onChange={e => setEmail(e.target.value)} extraClass='mt-6' />
        <PasswordInput size='default' value={password} onChange={e => setPassword(e.target.value)} extraClass='mt-6' />
        <Button htmlType='button' type='primary' size='medium' extraClass='mt-6' onClick={handleButtonClick}>Войти</Button>
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