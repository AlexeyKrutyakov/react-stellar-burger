import styles from './feed-page.module.css';
// imports from modules
import { useEffect } from 'react';
// import components
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStats from '../../components/orders-stats/orders-stats';
// import constants
import { API_URLS, STYLES, WS_ACTIONS } from '../../utils/constants';
// import utils
import { getFeed } from '../../utils/store-selectors';
// import types
import { useAppDispatch, useAppSelector } from 'types';

export default function FeedPage() {
  const dispatch = useAppDispatch();
  const feed = useAppSelector(getFeed);

  useEffect(() => {
    dispatch({
      type: WS_ACTIONS.feedWsInit,
      payload: API_URLS.wss.allOrders,
    });
    return () => {
      dispatch({
        type: WS_ACTIONS.feedWsStop,
      });
    };
  }, []);

  if (feed.orders.length > 0) {
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
