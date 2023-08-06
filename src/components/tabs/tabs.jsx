import React from 'react';

import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function MenuIngridients() {
  const [current, setCurrent] = React.useState('Булки');
  return (
    <nav className={`${styles.tabs} mt-5`} style={{ display: 'flex' }}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>Булки</Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>Соусы</Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>Начинки</Tab>
    </nav>
  );
}

export default MenuIngridients;
