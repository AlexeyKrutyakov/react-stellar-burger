import styles from './profile-settings-page.module.css';
// imports from modules
import React, { useState } from 'react';
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
// import types
import { useAppDispatch, useAppSelector } from 'types';

export default function ProfileSettingsPage() {
  const user = useAppSelector(getProfile).user;
  const defaultName = user ? user.name : '';
  const defaultEmail = user ? user.email : '';
  const defaultPassword = '';

  const [formIsChanged, setFormIsChanged] = useState(false);
  const { values, handleChange, setValues } = useForm({
    name: defaultName,
    email: defaultEmail,
    password: defaultPassword,
  });

  const dispatch = useAppDispatch();

  function clickCancelHandler() {
    setValues({
      ...values,
      name: defaultName,
      email: defaultEmail,
      password: defaultPassword,
    });
    setFormIsChanged(false);
  }
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormIsChanged(false);
    dispatch(
      editUser({ ...values } as {
        name: string;
        email: string;
        password: string;
      }),
    );
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
        value={values.name as string}
        name="name"
        icon="EditIcon"
        onChange={e => {
          handleChange(e);
          setFormIsChanged(true);
        }}
      />
      <EmailInput
        placeholder="Логин"
        value={values.email as string}
        name="email"
        isIcon={true}
        extraClass="mt-6"
        onChange={e => handleChange(e)}
      />
      <PasswordInput
        value={values.password as string}
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
