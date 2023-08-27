import styles from "./app.module.css";
import React from "react";
import { getIngredients } from "../../utils/api";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const [error, setError] = React.useState(null);
  const [modal, setModal] = React.useState(
    {
      type: '',
      isActive: false,
      ingredient: {},
    }
  );

  const [data, setData] = React.useState(
    {
      ingredients: [],
      isLoaded: false,
    }
  );

  const handleCloseModal = () => {
    setModal(
      {
        ...modal,
        isActive: false,
      }
    );
  }

  const handleOpenModal = (modalType, item = {}) => {
    switch (modalType) {
      case 'submit':
        setModal(
          {
            ...modal,
            type: 'order__details',
            isActive: true,
          }
        );
        break;
      case 'ingredient':
        setModal(
          {
            ...modal,
            type: 'ingredient__details',
            isActive: true,
            ingredient: item,
          }
        );
        break;
      default: 
        break;
    }
  }

  const handleAddIngredient = (elementName, ingredient) => {
    console.log(`${elementName}`, ingredient);
  } 

  React.useEffect(() => {
    setData({...data, loading: true});
    getIngredients()
      .then(res => {
        setData({ ...data, ingredients: [...res.data], isLoaded: true});
        })
      .catch(err => {
        setError(err.message);
        console.log('Error: ', error);
        })
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.content}`}>
        {/* {data.isLoaded && <BurgerIngredients data={ data.ingredients } onModalOpen={handleOpenModal} />} */}
        {data.isLoaded && <BurgerIngredients data={ data.ingredients } onModalOpen={handleAddIngredient} />}
        {data.isLoaded && <BurgerConstructor data={ data.ingredients } onModalOpen={handleOpenModal} />}
      </main>
      {modal.isActive &&
        <Modal onCloseModal={handleCloseModal}>
          {modal.type === 'order__details' && <OrderDetails />}
          {modal.type === 'ingredient__details' && <IngredientDetails ingredient={modal.ingredient} />}
        </Modal>
      }
    </div>
  );
}

export default App;
