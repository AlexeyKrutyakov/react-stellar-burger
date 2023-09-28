import styles from './reset-password.module.css';

import { Link } from 'react-router-dom';


import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/profileSlice';
import { closeModal, showSpinner } from '../../services/modalSlice';

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');

  const dispatch = useDispatch();

  function handleButtonClick(event) {
    event.preventDefault();

    dispatch(showSpinner());
    dispatch(resetPassword({ password, code }));
    setPassword('');
    setCode('');
    dispatch(closeModal());
  }

  return(
    <div className={styles.content}>
      <form action="login">
        <h1 className='text text_type_main-medium'>Восстановление&nbsp;пароля</h1>
        <PasswordInput size='default' placeholder='Введите новый пароль' value={password} onChange={e => setPassword(e.target.value)} extraClass='mt-6' />
        <Input sizes='default' placeholder='Введите код из письма' value={code} onChange={e => {setCode(e.target.value); console.log('token in state', code)}} extraClass='mt-6' />
        <Button htmlType='button' type='primary' size='medium' onClick={handleButtonClick} extraClass='mt-6'>Сохранить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Войти</span>
        </Link>
      </p>
    </div>
  );
}