import styles from './forgot-password.module.css';
// imports from modules
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import components
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
// import constants
import { TOKENS } from '../../utils/constants';
// import utils
import { requestResetToken } from '../../utils/api';


export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = React.useState('');

  function submitHandler(event) {
    event.preventDefault();
    requestResetToken({ email })
      .then(() => {
        localStorage.setItem(TOKENS.resetTokenSent, true);
        setEmail('');
        navigate('/reset-password');
      });
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Forgot password';
  });
  
  return(
    <div className={styles.content}>
      <title>Stellar Burgers: Forgot password</title>
      <form action="forgot-password">
        <h1 className='text text_type_main-medium'>Восстановление&nbsp;пароля</h1>
        <EmailInput size='default' placeholder='Укажите&nbsp;e-mail' onChange={e => setEmail(e.target.value)} value={email} extraClass='mt-6' />
        <Button htmlType='submit' type='primary' size='medium' extraClass='mt-6' onClick={submitHandler}>Восстановить</Button>
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