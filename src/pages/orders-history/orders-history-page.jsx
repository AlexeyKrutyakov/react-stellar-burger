// import from modules
import { useEffect } from 'react';

export default function OrdersHistoryPage() {

  useEffect(() => {
    document.title = 'Stellar Burgers: Orders';
  }, []);

  return(
    <span className='text text_type_main-default text_color_inacive'>Здесь будут Ваши заказы</span>
  );
}
