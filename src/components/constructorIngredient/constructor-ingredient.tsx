import styles from './constructor-ingredient.module.css';
// imports from modules
import { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { Identifier, XYCoord } from 'dnd-core';
// import components
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import services
import { deleteMain, sortMains } from '../../services/burgerSlice';
// import constants
import { COLORS } from '../../utils/constants';
// import { ingredientPropType } from '../../utils/prop-types';
import { AppDispatch, BurgerIngredient, Ingredient } from 'types';
import { getBurger } from 'utils/store-selectors';

export const ConstructorIngredient: FC<BurgerIngredient> = ({
  data,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const ingredients: Ingredient[] = useSelector(getBurger).mains;

  const [{ handlerId }, drop] = useDrop<
    BurgerIngredient,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'burgerIngredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: BurgerIngredient, monitor) {
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

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const borderColor = COLORS.transparent;

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
          text={`${data.name}`}
          price={data.price}
          thumbnail={data.image}
          handleClose={() => dispatch(deleteMain({ index }))}
        />
      </li>
    </div>
  );
};
