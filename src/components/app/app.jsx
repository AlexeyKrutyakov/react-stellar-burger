import styles from "./app.module.css";
import React, { useReducer } from "react";
import { getIngredients, submitOrder } from "../../utils/api";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
// import Context
import { IngredientsContext } from "../../services/ingredientsContext";
import { ConstructorIngredientsContext } from "../../services/constructorIngredientsContext";
import { ModalContext } from "../../services/modalContext";
import LoadingSpinner from "../loading-spinner/loading-spinner";

function App() {
  const initialIngredients = {
    ingredients: [],
    isLoaded: false,
  }

  const initialConstructorIngredients = {
    ingredients: []
  };

  const initialModal = {
    type: '',
    isActive: false,
    ingredient: {},
    ingredientsIdList: [],
    orderNumber: 0,
    loadingSpinner: false,
  }

  const ingredientsReducer = (state, action) => {
    switch (action.type) {
      case 'load':
        return {
          ...state,
          isLoaded: false,
        };
      case 'save':
        return {
          ingredients: action.ingredients,
          isLoaded: true,
        };
      default:
        return new Error(`Error: unknown action type '${action.type}'`);
    }
  }

  const constructorIngredientsReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return { ingredients: [...state.ingredients, action.ingredient]};
      case 'details':
        return { ingredient: action.ingredient };
      default:
        return new Error(`Error: unknown action type '${action.type}'`);
    }
  }

  const modalReducer = (state, modal) => {
    switch (modal.type) {
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
      case 'start-loading':
        return {
          ...state,
          loadingSpinner: true,
        }
      case 'stop-loading':
        return {
          ...state,
          loadingSpinner: false,
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

  const [constructorIngredientsState, dispatchConstructorIngredients] =
    useReducer(constructorIngredientsReducer, initialConstructorIngredients, undefined);
  
  const [modalState, dispatchModal] = useReducer(modalReducer, initialModal, undefined);

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
    dispatchConstructorIngredients(
      {
        type: 'add',
        ingredient: ingredient
      }
    );
  } 

  React.useEffect(() => {
    dispatchModal(
      {
        type: 'start-loading',
      }
    );

    dispatchIngredients(
      {
        type: 'load',
      }
    );
    getIngredients()
      .then(json => {
        dispatchIngredients(
          {
            type: 'save',
            ingredients: [...json.data],
          }
        );
        dispatchModal(
          {
            type: 'stop-loading',
          }
        );
        })
      .catch(err => {
        console.log('Error: ', err);
        });
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.content}`}>
        <IngredientsContext.Provider value={ingredientsState}>
          {/* {ingredientsState.isLoaded && <BurgerIngredients onModalOpen={handleOpenModal} />} */}
          {ingredientsState.isLoaded && <BurgerIngredients onModalOpen={handleAddIngredient} />}
          {ingredientsState.isLoaded
            &&
            <ConstructorIngredientsContext.Provider value={constructorIngredientsState}>
              <BurgerConstructor onModalOpen={handleOpenModal} />
            </ConstructorIngredientsContext.Provider>
          }
        </IngredientsContext.Provider>
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
      {modalState.loadingSpinner && <LoadingSpinner />}
    </div>
  );
}

export default App;
