import styles from './login-page.module.css';
// imports from modules
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
// import components
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import hooks
import { useForm } from '../../hooks/useForm';
// import services
import { login } from '../../services/profileSlice';
// import constants
import { PATHS, STYLES } from '../../utils/constants';
// import types
import { useAppDispatch } from 'types';

export default function LoginPage() {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(login({ ...values } as { email: string; password: string }));
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Login';
  }, []);

  return (
    <div className={styles.content}>
      <form action="login" onSubmit={submitHandler}>
        <h1 className={`${STYLES.text.medium}`}>Вход</h1>
        <EmailInput
          size="default"
          value={values.email as string}
          name="email"
          onChange={e => handleChange(e)}
          extraClass="mt-6"
        />
        <PasswordInput
          size="default"
          value={values.password as string}
          name="password"
          onChange={e => handleChange(e)}
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
        >
          Войти
        </Button>
      </form>
      <p className={`${STYLES.text.defaultInactive} mt-20`}>
        Вы&nbsp;&mdash; новый пользователь?&nbsp;
        <Link to={PATHS.register} style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Зарегистрироваться</span>
        </Link>
      </p>
      <p className={`${STYLES.text.defaultInactive} mt-4`}>
        Забыли&nbsp;пароль?&nbsp;
        <Link to={PATHS.forgotPassword} style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Восстановить&nbsp;пароль</span>
        </Link>
      </p>
    </div>
  );
}
