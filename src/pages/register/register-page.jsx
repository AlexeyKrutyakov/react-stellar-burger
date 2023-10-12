import styles from './register-page.module.css';
// imports from modules
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import components
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import services
import { register } from '../../services/profileSlice';
// imports constants
import { PATHS, STYLES } from '../../utils/constants';

export default function RegisterPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  function submitHandler(event) {
    event.preventDefault();
    dispatch(register({ email, password, name }));
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Register';
  }, []);

  return (
    <div className={styles.content}>
      <form action="register" onSubmit={submitHandler}>
        <h1 className={`${STYLES.text.medium}`}>Регистрация</h1>
        <Input
          type="text"
          value={name}
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          extraClass="mt-6"
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={`${STYLES.text.defaultInactive} mt-20`}>
        Уже зарегистрированы?&nbsp;
        <Link to={PATHS.login} style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Войти</span>
        </Link>
      </p>
    </div>
  );
}
