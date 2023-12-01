import styles from './burger-constructor.module.css';
// imports from modules
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// import components
import ConstructorIngredient from '../constructorIngredient/constructor-ingredient';
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import services
import { openModal } from '../../services/modalSlice';
import { submitOrder } from '../../services/orderSlice';
import {
  addBun,
  addMain,
  resetConstructorData,
} from '../../services/burgerSlice';
// import constants
import {
  COLORS,
  INGREDIENTS,
  MODAL,
  PATHS,
  STYLES,
} from '../../utils/constants';
// import utils
import { getBurger, getProfile } from '../../utils/store-selectors';
// import types
import { AppDispatch, Ingredient } from 'types';

function BurgerConstructor() {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const burgerConstructorData = useSelector(getBurger);
  const profile = useSelector(getProfile);

  const bun = burgerConstructorData.bun;
  const mains = burgerConstructorData.mains;

  const bunPrice = bun ? bun.price * 2 : 0;
  const totalPrice =
    bunPrice +
    mains.reduce(
      (totalPrice: number, ingredient: Ingredient) =>
        totalPrice + ingredient.price,
      0,
    );

  const mainsIdList = mains.map((main: Ingredient) => main._id);
  let ingredientsIdList: string[];
  if (bun) ingredientsIdList = [bun._id, ...mainsIdList];

  const handleSubmitOrder = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (burgerConstructorData.bun === null) return;
    if (!profile.user) {
      navigate(PATHS.login);
      return;
    }
    if (ingredientsIdList.length >= 1) {
      (await dispatch(submitOrder(ingredientsIdList))) &&
        dispatch(resetConstructorData());
      dispatch(openModal(MODAL.type.orderStatus));
      navigate(PATHS.orderStatus, { state: { background: location } });
    }
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    drop(ingredient: Ingredient) {
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
    },
  }));

  const borderColor = canDrop ? `${COLORS.mainBlue}` : `${COLORS.transparent}`;
  const backgroundColor = isOver
    ? COLORS.transparents.mainViolet
    : COLORS.transparent;

  return (
    <section
      className={`${styles.burger_constructor}`}
      style={{ borderColor, backgroundColor }}
      ref={drop}
    >
      {bun && (
        <article className={`mt-25 mr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </article>
      )}
      <ul className={`${styles.ingredients_unlocked} custom-scroll`}>
        {mains &&
          mains.map((main: Ingredient, index: number) => (
            <ConstructorIngredient
              main={main}
              index={index}
              key={main.constructorId}
            />
          ))}
      </ul>
      {bun && (
        <article className={`mr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </article>
      )}
      <form className={styles.total_price}>
        <h2 className={STYLES.digits.medium}>
          {totalPrice}
          <span className="ml-2">
            <CurrencyIcon type="primary" />
          </span>
        </h2>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          onClick={handleSubmitOrder}
        >
          Оформить заказ
        </Button>
      </form>
    </section>
  );
}

export default BurgerConstructor;
