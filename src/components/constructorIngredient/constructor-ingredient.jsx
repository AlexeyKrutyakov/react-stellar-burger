import styles from './constructor-ingredient.module.css';
// imports from modules
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
// import components
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import services
import { deleteMain, sortMains } from '../../services/burgerSlice';
// import constants
import { COLORS } from '../../utils/constants';

export default function ConstructorIngredient({ main, index }) {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop({
    accept: 'burgerIngredient',
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sortMains({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'burgerIngredient',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  const borderColor = isOver ? COLORS.mainBlue : COLORS.transparent;

  drag(drop(ref));

  return (
    <div
      className={`${styles.drop_container} ${styles.drag_icon}`}
      ref={ref}
      style={{ borderColor, opacity }}
    >
      <li className={`${styles.ingredient} mr-1`}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={`${main.name}`}
          price={main.price}
          thumbnail={main.image}
          handleClose={() => dispatch(deleteMain({ index }))}
        />
      </li>
    </div>
  );
}
