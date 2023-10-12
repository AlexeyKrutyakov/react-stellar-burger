import styles from './login-page.module.css';
// imports from modules
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import components
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import services
import { login } from '../../services/profileSlice';
// import constants
import { PATHS, STYLES } from '../../utils/constants';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  function submitHandler(event) {
    event.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Login';
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.content}>
      <form action="login" onSubmit={submitHandler}>
        <h1 className={`${STYLES.text.medium}`}>Вход</h1>
        <EmailInput
          size="default"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          extraClass="mt-6"
        />
        <PasswordInput
          size="default"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
