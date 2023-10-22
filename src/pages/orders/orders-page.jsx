import styles from './orders-page.module.css';
// import from modules
import { useEffect } from 'react';
import { STYLES } from '../../utils/constants';
import OrdersList from '../../components/orders-list/orders-list';
import { useLocation } from 'react-router';

export default function OrdersPage() {
  const location = useLocation();
  useEffect(() => {
    document.title = 'Stellar Burgers: Orders';
  }, []);

  return (
    <div className={`${styles.orders_list} ${STYLES.text.defaultInactive}`}>
      <OrdersList path={location.pathname} hasStatus={true} />
    </div>
  );
}
