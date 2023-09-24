import styles from './forgot-password.module.css';

import { Link } from 'react-router-dom';

import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

export default function ForgotPasswordPage() {
  return(
    <div className={styles.content}>
      <form action="login">
        <h1 className='text text_type_main-medium'>Восстановление&nbsp;пароля</h1>
        <EmailInput size='default' placeholder='Укажите&nbsp;e-mail' value='' extraClass='mt-6' />
        <Button htmlType='button' type='primary' size='medium' extraClass='mt-6'>Восстановить</Button>
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