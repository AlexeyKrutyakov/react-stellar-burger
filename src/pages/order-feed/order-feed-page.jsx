import { useSelector } from 'react-redux';
import styles from './order-feed-page.module.css';
import { getIngredients } from '../../utils/store-selectors';
import { STYLES } from '../../utils/constants';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStats from '../../components/orders-details/orders-stats';

export default function OrderFeedPage() {
  // const burgerData = useSelector(getBurger);
  const burgerData = useSelector(getIngredients).loaded;
  // const bun = burgerData.bun;
  const bun = burgerData[0];
  // const mains = burgerData.mains;
  const mains = burgerData.slice(2, 7);
  let ingredients = [];
  let visibleIngredients = null;
  if (bun) {
    ingredients = [bun, ...mains];
    visibleIngredients = ingredients.slice(0, 7);
  }

  if (visibleIngredients) {
    return (
      <div className={styles.content}>
        <h1 className={`${styles.title} ${STYLES.text.large}`}>
          Лента заказов
        </h1>
        <OrdersList />
        <OrdersStats />
      </div>
    );
  }

  return <></>;
}
