import styles from './forgot-password.module.css';
import React from 'react';

import { Link } from 'react-router-dom';
import { requestResetToken } from '../../services/profileSlice';
import { showSpinner, closeModal } from '../../services/modalSlice';

import { useDispatch } from 'react-redux';
import { MODAL } from '../../utils/constants';

import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";


export default function ForgotPasswordPage() {
  
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  
  function handleRequestMail() {
    dispatch(showSpinner());
    dispatch(requestResetToken());
    dispatch(closeModal({ type: MODAL.type.loadingSpinner}));
  }
  
  return(
    <div className={styles.content}>
      <form action="login">
        <h1 className='text text_type_main-medium'>Восстановление&nbsp;пароля</h1>
        <EmailInput size='default' placeholder='Укажите&nbsp;e-mail' onChange={e => setValue(e.target.value)} value={value} extraClass='mt-6' />
        <Button htmlType='button' type='primary' value={value} size='medium' extraClass='mt-6' onClick={handleRequestMail}>Восстановить</Button>
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