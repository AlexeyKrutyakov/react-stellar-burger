import React from 'react';

import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import scroll from '../../utils/scroll';

function MenuIngridients() {
  const [current, setCurrent] = React.useState('buns');
  return (
    <nav className={`${styles.tabs} mt-5`} style={{ display: 'flex' }}>
      <Tab
        value='buns'
        active={current === 'buns'}
        onClick={
          () => {
            setCurrent('buns');
            scroll('buns');
          }
        }
      >
        Булки
      </Tab>
      <Tab
        value='sauces'
        active={current === 'sauces'}
        onClick={
          () => {
            setCurrent('sauces');
            scroll('sauces');
          }
        }
      >
        Соусы
      </Tab>
      <Tab
        value='mains'
        active={current === 'mains'}
        onClick={
          () => {
            setCurrent('mains');
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
