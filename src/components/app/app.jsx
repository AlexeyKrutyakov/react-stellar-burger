import styles from "./app.module.css";
import React, { useReducer } from "react";
import { getIngredients } from "../../utils/api";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientsContext } from "../../services/ingredientsContext";

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

  const initialIngredients = {
    ingredients:
    [
      {
        "_id":"60666c42cc7b410027a1a9b1",
        "name":"Краторная булка N-200i",
        "type":"bun",
        "proteins":80,
        "fat":24,
        "carbohydrates":53,
        "calories":420,
        "price":1255,
        "image":"https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v":0
      }
    ]
  };

  const ingredientsReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return { ingredients: [...state.ingredients, action.ingredient]};
      default:
        return new Error(`Error: unknown action type '${action.type}'`);
    }
  }

  const [ingredientsState, dispatchIngredients] = useReducer(ingredientsReducer, initialIngredients, undefined);

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
    dispatchIngredients(
      {
        type: 'add',
        ingredient: ingredient
      }
    );
    console.log('ingredients: ', ingredientsState.ingredients);
    console.log('typeof ingredients: ', typeof ingredientsState.ingredients);
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
        {data.isLoaded
          &&
          <IngredientsContext.Provider value={ingredientsState}>
            <BurgerConstructor ingredients={ingredientsState.ingredients} onModalOpen={handleOpenModal} />
          </IngredientsContext.Provider>
        }
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
