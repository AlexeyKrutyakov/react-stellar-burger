import styles from './order-status.module.css';
// imports from modules
// import images
import imageDone from '../../images/graphics.png';
// import utils
import { getOrder } from '../../utils/store-selectors';
import { STYLES } from '../../utils/constants';
// import types
import { useAppSelector } from 'types';

export default function OrderStatus() {
  const orderNumber = useAppSelector(getOrder).number;

  return (
    <>
      <p className={`${styles.text_glow} ${STYLES.digits.large} mt-30`}>
        {orderNumber}
      </p>
      <h1 className={`${STYLES.text.medium} mt-8`}>идентификатор заказа</h1>
      <img className={`${styles.done} mt-15`} src={imageDone} alt="done" />
      <p className={`${STYLES.text.default} mt-15`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${STYLES.text.defaultInactive} mt-2 mb-30`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}
