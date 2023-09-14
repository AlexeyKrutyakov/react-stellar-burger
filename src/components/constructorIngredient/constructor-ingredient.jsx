import { useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";

import styles from './constructor-ingredient.module.css';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { sortMains } from "../../services/burgerSlice";

export default function ConstructorIngredient({ main }) {
  
  const burgerData = useSelector(state => state.burger);
  const dispatch = useDispatch();
  
  const mains = burgerData.mains;
  const dropItemIndex = mains.findIndex(ingredient => ingredient.constructorId === main.constructorId);

  const [, drag] = useDrag(() => ({
    type: 'burgerIngredient',
    item: main
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'burgerIngredient',
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
    drop: item => {
      console.log('burgerData', burgerData);
      console.log('mains', mains);
      console.log('item.constructorId', item.constructorId);
      const dragIndex = mains.findIndex(ingredient => ingredient.constructorId === item.constructorId);
      dispatch(sortMains({dragItemIndex: dragIndex, dropItemIndex: dropItemIndex }))
    }
  }));

  const borderColor = isOver ? '#4C4CFF' : 'transparent';

  return(
    <div className={`${styles.drop_container}`} ref={drop} style={{borderColor}}>
      <li className={`${styles.ingredient} mr-1`} ref={drag}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={`${main.name}`}
          price={main.price}
          thumbnail={main.image}
        />
      </li>
    </div>
  )
}
