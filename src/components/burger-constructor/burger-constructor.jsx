import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructor({ data }) {
  console.log('BurgerConstsructor.data = ', data);
  const bun = data.filter(ingredient => ingredient.type === 'bun')[0];
  const mains = data.filter(ingredient => ingredient.type === 'main');
  return(
    <section className={`${styles.burger_constructor}`}>
      <article className={`mt-25 mr-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </article>
      <ul className={`${styles.ingredients_unlocked} custom-scroll`}>
        {mains.map(main => (
          <li className={`${styles.ingredient} mr-1`} key={main._id}>
            <DragIcon type="primary" />
            <ConstructorElement
            text={main.name}
            price={main.price}
            thumbnail={main.image}
            />
          </li>
        ))}
      </ul>
      <article className={`mr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </article>
      <form className={styles.total_price}>
        <h2 className='text text_type_digits-medium'>
          6820
          <span className='ml-2'><CurrencyIcon type='primary' /></span>
        </h2>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </form>
    </section>
  );
}

ConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
}

export default BurgerConstructor;
