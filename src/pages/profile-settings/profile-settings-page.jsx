import styles from './profile-settings-page.module.css';
// imports from modules
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import components
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import hooks
import { useForm } from '../../hooks/useForm';
// import services
import { editUser } from '../../services/profileSlice';
// import utils
import { getProfile } from '../../utils/store-selectors';
import { User, RootState } from 'types';

export default function ProfileSettingsPage() {
  const user = useSelector(getProfile).user;

  const defaultName = user ? user.name : '';
  const defaultEmail = user.email;
  const defaultPassword = '';

  const [formIsChanged, setFormIsChanged] = useState(false);
  const { values, handleChange, setValues } = useForm({
    name: defaultName,
    email: defaultEmail,
    password: defaultPassword,
  });

  const dispatch = useDispatch();

  function clickCancelHandler() {
    setValues({
      ...values,
      name: defaultName,
      email: defaultEmail,
      password: defaultPassword,
    });
    setFormIsChanged(false);
  }
  function submitHandler(event) {
    event.preventDefault();

    setFormIsChanged(false);
    dispatch(editUser({ ...values }));
    setValues({
      ...values,
      password: defaultPassword,
    });
    event.currentTarget.blur();
  }

  return (
    <form className={styles.form} action="profile" onSubmit={submitHandler}>
      <Input
        type="text"
        placeholder="Имя"
        value={values.name}
        name="name"
        icon="EditIcon"
        onChange={e => {
          handleChange(e);
          setFormIsChanged(true);
        }}
      />
      <EmailInput
        placeholder="Логин"
        value={values.email}
        name="email"
        isIcon={true}
        extraClass="mt-6"
        onChange={e => handleChange(e)}
      />
      <PasswordInput
        value={values.password}
        name="password"
        icon="EditIcon"
        extraClass="mt-6"
        onChange={e => handleChange(e)}
      />
      <div className={`${styles.buttons} mt-6`}>
        {formIsChanged && (
          <Button
            htmlType="button"
            type="secondary"
            onClick={clickCancelHandler}
          >
            Отмена
          </Button>
        )}
        {formIsChanged && <Button htmlType="submit">Сохранить</Button>}
      </div>
    </form>
  );
}
