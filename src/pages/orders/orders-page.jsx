import styles from './orders-page.module.css';
// import from modules
import { useEffect } from 'react';
import {
  API_URLS,
  PATHS,
  STYLES,
  TOKENS,
  WS_ACTIONS,
} from '../../utils/constants';
import OrdersList from '../../components/orders-list/orders-list';
import { useDispatch } from 'react-redux';

export default function OrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Stellar Burgers: Orders';
    dispatch({
      type: WS_ACTIONS.ordersWsInit,
      payload: `${API_URLS.wss.personalOrders}?token=${
        localStorage.getItem(TOKENS.names.access).split('Bearer ')[1]
      }`,
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
