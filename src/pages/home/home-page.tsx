import styles from './home-page.module.css';
// imports from modules
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import components
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
// import services
// import utils
import { getIngredients } from '../../utils/store-selectors';
// import types
import { useAppSelector } from 'types';

export default function HomePage() {
  const ingredientsLoadingStatus = useAppSelector(getIngredients).status;

  useEffect(() => {
    document.title = 'Stellar Burgers: Home';
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={`${styles.content}`}>
        {ingredientsLoadingStatus === 'loaded' && <BurgerIngredients />}
        {ingredientsLoadingStatus === 'loaded' && <BurgerConstructor />}
      </section>
    </DndProvider>
  );
}
