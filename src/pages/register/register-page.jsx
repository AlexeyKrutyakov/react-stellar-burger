import styles from './register-page.module.css';

import { Link } from 'react-router-dom';

import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from 'react';

export default function RegisterPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return(
    <div className={styles.content}>
      <form action="login">
        <h1 className='text text_type_main-medium'>Регистрация</h1>
        <Input type='text' value={name} placeholder='Имя' onChange={e => setName(e.target.value)} extraClass='mt-6'/>
        <EmailInput size='default' value={email} onChange={e => setEmail(e.target.value)} extraClass='mt-6' />
        <PasswordInput size='default' value={password} onChange={e => setPassword(e.target.value)} extraClass='mt-6' />
        <Button htmlType='button' type='primary' size='medium' extraClass='mt-6'>Зарегистрироваться</Button>
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