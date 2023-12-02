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
// import hooks
import { useForm } from '../../hooks/useForm';
// import constants
import { TOKENS, PATHS, STYLES } from '../../utils/constants';
// import utils
import { requestResetPassword } from '../../utils/api';

export default function ResetPasswordPage() {
  const defaultPassword = '';
  const defaultToken = '';
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm({
    password: defaultPassword,
    token: defaultToken,
  });

  function submitHandler(event) {
    event.preventDefault();
    requestResetPassword({ ...values })
      .then(res => {
        setValues({
          password: defaultPassword,
          token: defaultToken,
        });
        navigate(PATHS.home);
        localStorage.removeItem(TOKENS.resetTokenSent);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Reset password';
  }, []);

  if (!localStorage.getItem(TOKENS.resetTokenSent)) {
    return <Navigate to={PATHS.home} state={{ from: PATHS.home }} />;
  }

  return (
    <div className={styles.content}>
      <form action="login" onSubmit={submitHandler}>
        <h1 className={`${STYLES.text.medium}`}>Восстановление&nbsp;пароля</h1>
        <PasswordInput
          size="default"
          placeholder="Введите новый пароль"
          value={values.password}
          name="password"
          onChange={e => handleChange(e)}
          extraClass="mt-6"
        />
        <Input
          sizes="default"
          placeholder="Введите код из письма"
          value={values.token}
          name="token"
          onChange={e => handleChange(e)}
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
      <p className={`${STYLES.text.defaultInactive} mt-20`}>
        Вспомнили пароль?&nbsp;
        <Link to={PATHS.login} style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Войти</span>
        </Link>
      </p>
    </div>
  );
}
