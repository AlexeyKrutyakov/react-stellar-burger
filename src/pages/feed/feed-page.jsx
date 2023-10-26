import { useDispatch, useSelector } from 'react-redux';
import styles from './feed-page.module.css';
import { getFeed } from '../../utils/store-selectors';
import { API_URLS, STYLES, WS_ACTIONS } from '../../utils/constants';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStats from '../../components/orders-stats/orders-stats';
import { useEffect } from 'react';

export default function FeedPage() {
  const dispatch = useDispatch();
  const feed = useSelector(getFeed);

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
