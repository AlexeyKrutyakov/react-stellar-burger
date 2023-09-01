import styles from "./app.module.css";
import React, { useReducer } from "react";
import { getIngredients, submitOrder } from "../../utils/api";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientsContext } from "../../services/ingredientsContext";
import { ModalContext } from "../../services/modalContext";

function App() {
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(
    {
      ingredients: [],
      isLoaded: false,
    }
  );

  const initialIngredients = {
    ingredients: []
  };

  const InitialModal = {
    type: '',
    isActive: false,
    ingredient: {},
    ingredientsIdList: [],
    orderNumber: 0,
  }

  const ingredientsReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return { ingredients: [...state.ingredients, action.ingredient]};
      case 'details':
        return { ingredient: action.ingredient }
      default:
        return new Error(`Error: unknown action type '${action.type}'`);
    }
  }

  const modalReducer = (state, modal) => {
    switch(modal.type) {
      case 'order':
        return {
          ...state,
          type: 'order__details',
          isActive: true,
          ingredientsIdList: modal.ingredientsIdList,
          orderNumber: modal.orderNumber,
        };
      case 'ingredient':
        return {
          ...state,
          type: 'ingredient__details',
          isActive: true,
          ingredient: modal.ingredient,
        }
      case 'closed':
        return {
          ...state,
          isActive: false,
        }
      default:
        return new Error(`Error: unknown modal type '${modal.type}'`);
    }
  }

  const [ingredientsState, dispatchIngredients] = useReducer(ingredientsReducer, initialIngredients, undefined);

  const [modalState, dispatchModal] = useReducer(modalReducer, InitialModal, undefined);

  const handleCloseModal = () => {
    dispatchModal(
      {
        type: 'closed',
        isActive: false,
      }
    );
  }

  const handleOpenModal = (modalType, item) => {
    switch (modalType) {
      case 'submit':
        submitOrder(
          {
            "ingredients": item,
          })
          .then((json) => {
            dispatchModal(
              {
                type: 'order',
                orderNumber: json.order.number,
              }
            );
          })
          .catch(err => console.log('Error in handleOpenModal: ', err));
        break;
      case 'ingredient':
        dispatchModal(
          {
            type: 'ingredient',
            ingredient: item,
          }
        );
        break;
      default: 
        break;
    }
  }

  const handleAddIngredient = (elementName, ingredient) => {
    dispatchIngredients(
      {
        type: 'add',
        ingredient: ingredient
      }
    );
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
            <BurgerConstructor onModalOpen={handleOpenModal} />
          </IngredientsContext.Provider>
        }
      </main>
      <ModalContext.Provider value={modalState}>
        {
          modalState.isActive &&
          <Modal onCloseModal={handleCloseModal}>
            {modalState.type === 'order__details' && <OrderDetails />}
            {modalState.type === 'ingredient__details' && <IngredientDetails ingredient={modalState.ingredient} />}
          </Modal>
        }
      </ModalContext.Provider>
    </div>
  );
}

export default App;
