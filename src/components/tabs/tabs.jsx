import React from 'react';

import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import scroll from '../../utils/scroll';


function Tabs() {
  const [current, setCurrent] = React.useState('buns');
  
  function setCategory(value) {
    setCurrent(value);
    scroll(value);
  }
  
  return (
    <nav className={`${styles.tabs} mt-5`} style={{ display: 'flex' }}>
      <Tab
        value='buns'
        active={current === 'buns'}
        onClick={setCategory}
      >
        Булки
      </Tab>
      <Tab
        value='sauces'
        active={current === 'sauces'}
        onClick={setCategory}
      >
        Соусы
      </Tab>
      <Tab
        value='mains'
        active={current === 'mains'}
        onClick={setCategory}
      >
        Начинки
      </Tab>
    </nav>
  );
}

export default Tabs;
