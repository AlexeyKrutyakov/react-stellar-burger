import styles from './reset-password.module.css';
// imports from modules
import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import components
import {
  Button,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import constants
import { TOKENS } from '../../utils/constants';
// import utils
import { requestResetPassword } from '../../utils/api';

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    requestResetPassword({ password, token })
      .then((res) => {
        setPassword('');
        setToken('');
        navigate('/');
        localStorage.removeItem(TOKENS.resetTokenSent);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Reset password';
  });

  if (!localStorage.getItem(TOKENS.resetTokenSent)) {
    return <Navigate to="/" state={{ from: '/' }} />;
  }

  return (
    <div className={styles.content}>
      <form action="login" onSubmit={submitHandler}>
        <h1 className="text text_type_main-medium">
          Восстановление&nbsp;пароля
        </h1>
        <PasswordInput
          size="default"
          placeholder="Введите новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          extraClass="mt-6"
        />
        <Input
          sizes="default"
          placeholder="Введите код из письма"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&nbsp;
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Войти</span>
        </Link>
      </p>
    </div>
  );
}
