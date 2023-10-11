import styles from './register-page.module.css';
// imports from modules
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import components
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
// import services
import { register } from '../../services/profileSlice';


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
  });

  return(
    <div className={styles.content}>
      <form action="register">
        <h1 className='text text_type_main-medium'>Регистрация</h1>
        <Input type='text' value={name} placeholder='Имя' onChange={e => setName(e.target.value)} extraClass='mt-6'/>
        <EmailInput size='default' value={email} onChange={e => setEmail(e.target.value)} extraClass='mt-6' />
        <PasswordInput size='default' value={password} onChange={e => setPassword(e.target.value)} extraClass='mt-6' />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          extraClass='mt-6'
          onClick={submitHandler}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?&nbsp;
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <span className={styles.link}>Войти</span>
        </Link>
      </p>
    </div>
  );
}