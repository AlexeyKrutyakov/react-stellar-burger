import { useContext } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../services/ingredientsContext';

function BurgerConstructor({ onModalOpen }) {
  const ingredients = useContext(IngredientsContext).ingredients;
  const bun = ingredients.filter(ingredient => ingredient.type === 'bun')[0];
  const mains = ingredients.filter(ingredient => ingredient.type === 'main' || ingredient.type === 'sauce');
  const totalPrice = bun.price * 2 + mains.reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0);
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
         {mains && mains.map(main => (
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
           {totalPrice}
           <span className='ml-2'><CurrencyIcon type='primary' /></span>
         </h2>
         <Button htmlType="button" type="primary" size="large" onClick={() => onModalOpen('submit')}>
           Оформить заказ
         </Button>
       </form>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired
}

export default BurgerConstructor;
