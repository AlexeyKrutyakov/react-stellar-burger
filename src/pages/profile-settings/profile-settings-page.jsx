import styles from './profile-settings-page.module.css';
// imports from modules
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import components
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import services
import { editUser } from '../../services/profileSlice';

export default function ProfileSettingsPage() {
  const user = useSelector((state) => state.profile.user);
  const defaultName = user.name;
  const defaultEmail = user.email;
  const defaultPassword = '';

  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [formIsChanged, setFormIsChanged] = useState(false);

  const dispatch = useDispatch();

  function clickCancelHandler() {
    setName(defaultName);
    setEmail(defaultEmail);
    setPassword(defaultPassword);
    setFormIsChanged(false);
  }

  function submitHandler(event) {
    event.preventDefault();
    setFormIsChanged(false);
    dispatch(editUser({ name, email, password }));
    setPassword('');
    event.target.blur();
  }

  function inputNameHandler(event) {
    setFormIsChanged(true);
    setName(event.target.value);
  }

  const inputEmailHandler = (event) => {
    setFormIsChanged(true);
    setEmail(event.target.value);
  };

  function inputPasswordHandler(event) {
    setPassword(event.target.value);
    setFormIsChanged(true);
  }

  return (
    <form className={styles.form} action="profile" onSubmit={submitHandler}>
      <Input
        type="text"
        placeholder="Имя"
        value={name}
        icon="EditIcon"
        onChange={inputNameHandler}
      />
      <EmailInput
        placeholder="Логин"
        value={email}
        isIcon={true}
        extraClass="mt-6"
        onChange={inputEmailHandler}
      />
      <PasswordInput
        value={password}
        icon="EditIcon"
        extraClass="mt-6"
        onChange={inputPasswordHandler}
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
