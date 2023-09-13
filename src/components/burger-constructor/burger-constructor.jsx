import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder } from '../../services/orderSlice';
import { openModal, showSpinner, closeModal } from '../../services/modalSlice';
import { modal } from '../../utils/constants';

function BurgerConstructor() {
  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.burger.ingredients);
  
  const bun = ingredients.filter(ingredient => ingredient.type === 'bun')[0];
  const mains = ingredients.filter(ingredient => ingredient.type === 'main' || ingredient.type === 'sauce');
  const uniqueMains = [...new Set(mains)];
  const bunPrice = bun ? bun.price * 2 : 0;
  const totalPrice = bunPrice + mains.reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0);
  const bunId = bun ? bun._id : null;
  const uniqueMainsIdList = uniqueMains.map((main) => main._id)
  const ingredientsIdList = bun ? [bunId, ...uniqueMainsIdList] : [...uniqueMainsIdList];

  const handleSubmitOrder = () => {
    if (ingredientsIdList.length >= 1) {
      dispatch(showSpinner())
      dispatch(fetchOrder(ingredientsIdList));
      dispatch(closeModal({ type: modal.type.loadingSpinner}));
      dispatch(openModal({ type: modal.type.order }));
    }
  }

  return(
    <section className={`${styles.burger_constructor}`}>
       {bun && <article className={`mt-25 mr-4`}>
         <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        /> 
       </article>}
       <ul className={`${styles.ingredients_unlocked} custom-scroll`}>
         {uniqueMains && uniqueMains.map(main => (
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
       {bun && <article className={`mr-4`}>
         <ConstructorElement
           type="bottom"
           isLocked={true}
           text={`${bun.name} (низ)`}
           price={bun.price}
           thumbnail={bun.image}
         />
       </article>}
       <form className={styles.total_price}>
         <h2 className='text text_type_digits-medium'>
           {totalPrice}
           <span className='ml-2'><CurrencyIcon type='primary' /></span>
         </h2>
         <Button htmlType="button" type="primary" size="large" onClick={handleSubmitOrder}>
           Оформить заказ
         </Button>
       </form>
    </section>
  );
}

export default BurgerConstructor;
