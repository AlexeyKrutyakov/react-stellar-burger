import React from 'react';

import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import scroll from '../../utils/scroll';

function MenuIngridients() {
  const [current, setCurrent] = React.useState('Булки');
  return (
    <nav className={`${styles.tabs} mt-5`} style={{ display: 'flex' }}>
      <Tab
        value="Булки"
        active={current === 'Булки'}
        onClick={
          () => {
            setCurrent('Булки');
            scroll('buns');
          }
        }
      >
        Булки
      </Tab>
      <Tab
        value="Соусы"
        active={current === 'Соусы'}
        onClick={
          () => {
            setCurrent('Соусы');
            scroll('sauces');
          }
        }
      >
        Соусы
      </Tab>
      <Tab
        value="Начинки"
        active={current === 'Начинки'}
        onClick={
          () => {
            setCurrent('Начинки');
            scroll('mains');
          }
        }
      >
        Начинки
      </Tab>
    </nav>
  );
}

export default MenuIngridients;
