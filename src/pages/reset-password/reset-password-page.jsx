import styles from './reset-password.module.css';

import { Link } from 'react-router-dom';

import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

export default function ResetPasswordPage() {
  return(
    <div className={styles.content}>
      <form action="login">
        <h1 className='text text_type_main-medium'>Восстановление&nbsp;пароля</h1>
        <PasswordInput size='default' placeholder='Введите новый пароль' value='' extraClass='mt-6' />
        <Input sizes='default' placeholder='Введите код из письма' extraClass='mt-6' />
        <Button htmlType='button' type='primary' size='medium' extraClass='mt-6'>Сохранить</Button>
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