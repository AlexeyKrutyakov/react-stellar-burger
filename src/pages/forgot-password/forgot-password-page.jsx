import styles from './forgot-password.module.css';
// imports from modules
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import components
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import hooks
import { useForm } from '../../hooks/useForm';
// import constants
import { PATHS, STYLES, TOKENS } from '../../utils/constants';
// import utils
import { requestResetToken } from '../../utils/api';

export default function ForgotPasswordPage() {
  const defaultEmail = '';
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm({
    email: defaultEmail,
  });

  function submitHandler(event) {
    // function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    requestResetToken({ ...values }).then(() => {
      localStorage.setItem(TOKENS.resetTokenSent, true);
      setValues({
        ...values,
        email: defaultEmail,
      });
      navigate(PATHS.resetPassword);
    });
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Forgot password';
  }, []);

  return (
    <div className={styles.content}>
      <title>Stellar Burgers: Forgot password</title>
      <form action="forgot-password" onSubmit={submitHandler}>
        <h1 className={`${STYLES.text.medium}`}>Восстановление&nbsp;пароля</h1>
        <EmailInput
          size="default"
          placeholder="Укажите&nbsp;e-mail"
          // onChange={(e) => setEmail(e.target.value)}
          onChange={e => handleChange(e)}
          value={values.email}
          name="email"
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
        >
          Восстановить
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
