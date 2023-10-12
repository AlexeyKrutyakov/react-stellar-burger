import styles from './home-page.module.css';
// imports from modules
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
// import components
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
// import services
import { openModal } from '../../services/modalSlice';
// import utils
import { getIngredients } from '../../utils/store-selectors';

export default function HomePage() {
  const dispatch = useDispatch();
  const ingredientsLoadingStatus = useSelector(getIngredients).status;

  const handleOpenModal = (type) => {
    dispatch(openModal(type));
  };

  useEffect(() => {
    document.title = 'Stellar Burgers: Home';
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`${styles.content}`}>
        {ingredientsLoadingStatus === 'loaded' && (
          <BurgerIngredients onModalOpen={handleOpenModal} />
        )}
        {ingredientsLoadingStatus === 'loaded' && <BurgerConstructor />}
      </main>
    </DndProvider>
  );
}
