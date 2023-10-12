// import from modules
import { useEffect } from 'react';
import { STYLES } from '../../utils/constants';

export default function OrdersHistoryPage() {
  useEffect(() => {
    document.title = 'Stellar Burgers: Orders';
  }, []);

  return (
    <span className={`${STYLES.text.defaultInactive}`}>
      Здесь будут Ваши заказы
    </span>
  );
}
