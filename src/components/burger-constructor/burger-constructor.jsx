import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder } from '../../services/orderSlice';
import { openModal, showSpinner, closeModal } from '../../services/modalSlice';
import { useDrop } from 'react-dnd';
import { addBun, addMain, sortMains } from '../../services/burgerSlice';
import ConstructorIngredient from '../constructorIngredient/constructor-ingredient';
import { INGREDIENTS, MODAL } from '../../utils/constants';

function BurgerConstructor() {
  const dispatch = useDispatch();

  const burgerConstructorData = useSelector(state => state.burger);
  console.log('burgerConstructorData', burgerConstructorData);
  const bun = burgerConstructorData.bun;  
  const mains = burgerConstructorData.mains;
  
  const bunPrice = bun ? bun.price * 2 : 0;
  const totalPrice = bunPrice + mains.reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0);
  
  const bunId = bun ? bun._id : null;
  const mainsIdList = mains.map((main) => main._id)
  const ingredientsIdList = bun ? [bunId, ...mainsIdList] : [...mainsIdList];

  const handleSubmitOrder = () => {
    if (ingredientsIdList.length >= 1) {
      dispatch(showSpinner())
      dispatch(fetchOrder(ingredientsIdList));
      dispatch(closeModal({ type: MODAL.type.loadingSpinner}));
      dispatch(openModal({ type: MODAL.type.order }));
    }
  }

  const [{canDrop, isOver}, drop] = useDrop(() =>({
    accept: 'ingredient',
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    drop(ingredient) {
      switch (ingredient.type) {
        case INGREDIENTS.type.bun:
          dispatch(addBun(ingredient));
          break;
        case INGREDIENTS.type.main:
          dispatch(addMain(ingredient));
          break;
        case INGREDIENTS.type.sauce:
          dispatch(addMain(ingredient));
          break;
        default:
          break;
      }
    }
  }));

  const borderColor = canDrop ? '#4C4CFF' : 'transparent';
  const backgroundColor = isOver ? 'rgba(153, 0, 153, 0.1)' : 'transparent';

  return(
    <section className={`${styles.burger_constructor}`} style={{borderColor, backgroundColor}} ref={drop}>
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
      {mains && mains.map(main => (
        <ConstructorIngredient main={main} mains={mains} key={main.constructorId} />
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
