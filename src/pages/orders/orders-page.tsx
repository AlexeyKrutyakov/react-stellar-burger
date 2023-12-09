import styles from './orders-page.module.css';
// imports from modules
import { useEffect } from 'react';
// import components
import OrdersList from '../../components/orders-list/orders-list';
// import constants
import { API_URLS, STYLES, TOKENS, WS_ACTIONS } from '../../utils/constants';
// import types
import { useAppDispatch } from 'types';

export default function OrdersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = 'Stellar Burgers: Orders';
    dispatch({
      type: WS_ACTIONS.ordersWsInit,
      payload: `${API_URLS.wss.personalOrders}?token=${localStorage
        .getItem(TOKENS.names.access)
        ?.split('Bearer ')[1]}`,
    });
    return () => {
      dispatch({
        type: WS_ACTIONS.ordersWsStop,
      });
    };
  }, []);

  return (
    <div className={`${styles.orders_list} ${STYLES.text.defaultInactive}`}>
      <OrdersList hasStatus={true} />
    </div>
  );
}
