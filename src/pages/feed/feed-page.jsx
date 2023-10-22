import { useDispatch, useSelector } from 'react-redux';
import styles from './feed-page.module.css';
import { getIngredients } from '../../utils/store-selectors';
import { API_URLS, STYLES, WS_ACTIONS } from '../../utils/constants';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStats from '../../components/orders-details/orders-stats';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

export default function FeedPage() {
  const dispatch = useDispatch();
  const location = useLocation();
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

  useEffect(() => {
    dispatch({
      type: WS_ACTIONS.feedWsInit,
      payload: API_URLS.wss.all,
    });
  });

  if (visibleIngredients) {
    return (
      <div className={styles.content}>
        <h1 className={`${styles.title} ${STYLES.text.large}`}>
          Лента заказов
        </h1>
        <OrdersList path={location.pathname} />
        <OrdersStats />
      </div>
    );
  }

  return <></>;
}
