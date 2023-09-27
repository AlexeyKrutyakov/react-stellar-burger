import styles from './login-page.module.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

export default function LoginPage() {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  return(
    <div className={styles.content}>
      <form action="login">
        <h1 className='text text_type_main-medium'>Вход</h1>
        <EmailInput size='default' value={emailValue} onChange={e => setEmailValue(e.target.value)} extraClass='mt-6' />
        <PasswordInput size='default' value={passwordValue} onChange={e => setPasswordValue(e.target.value)} extraClass='mt-6' />
        <Button htmlType='button' type='primary' size='medium' extraClass='mt-6'>Войти</Button>
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