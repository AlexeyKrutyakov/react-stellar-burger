import styles from './main-page.module.css';
import { DndProvider } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from "react-dnd-html5-backend";

import { openModal } from "../../services/modalSlice";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useEffect } from 'react';

export default function MainPage() {

  const dispatch = useDispatch();
  const ingredientsLoadingStatus = useSelector(state => state.ingredients.status);

  const handleOpenModal = (type) => {
    dispatch(openModal(type));
  }

  useEffect(() => {
    document.title = 'Stellar Burgers: Main';
  });
  
  return(
    <DndProvider backend={HTML5Backend}>
      <main className={`${styles.content}`}>
        {ingredientsLoadingStatus === 'loaded' && <BurgerIngredients onModalOpen={handleOpenModal} />}
        {ingredientsLoadingStatus === 'loaded' && <BurgerConstructor />}
      </main>
    </DndProvider>
  );
}