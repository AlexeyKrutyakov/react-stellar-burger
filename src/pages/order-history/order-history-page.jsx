import styles from './order-history-page.module.css';
// import from modules
import { useEffect } from 'react';
import { STYLES } from '../../utils/constants';
import OrdersList from '../../components/orders-list/orders-list';

export default function OrderHistoryPage() {
  useEffect(() => {
    document.title = 'Stellar Burgers: Orders';
  }, []);

  return (
    <div className={`${styles.orders_list} ${STYLES.text.defaultInactive}`}>
      <OrdersList hasStatus={true} />
    </div>
  );
}
