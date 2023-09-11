import styles from "./app.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getIngredients } from "../../utils/api";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { modal } from "../../utils/constants";

import { loadIngredients, saveError, saveIngredients } from "../../services/ingredientsSlice";
import { openModal, showSpinner, closeModal } from "../../services/modalSlice";
import { addIngredient } from "../../services/burgerSlice";

function App() {
  const dispatch = useDispatch();
  
  const ingredientsIsLoaded = useSelector(state => state.ingredients.isLoaded);
  const currentModal = useSelector(state => state.modal);

  const handleOpenModal = (type) => {
    dispatch(openModal(type));
  }

  const handleCloseModal = (type) => {
   dispatch(closeModal(type));
  }

  const handleAddIngredient = (ingredient) => {
    dispatch(addIngredient(ingredient));
  } 

  useEffect(() => {
    dispatch(showSpinner());
    dispatch(loadIngredients());
    
    getIngredients()
    .then(res => {
      dispatch(saveIngredients([...res.data]));
      dispatch(closeModal({ type: modal.type.loadingSpinner}));
    })
    .catch(err => dispatch(saveError({
      hasError: true,
      message: err
    })));
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.content}`}>
        {/* {console.log('store', store.getState().ingredients)} */}
        {ingredientsIsLoaded && <BurgerIngredients onModalOpen={handleOpenModal} />}
        {/* {ingredientsIsLoaded && <BurgerIngredients onModalOpen={handleAddIngredient} />} */}
        {ingredientsIsLoaded && <BurgerConstructor onModalOpen={handleOpenModal} />}
      </main>
      {currentModal.isActive &&
          <Modal onCloseModal={handleCloseModal}>
            {currentModal.type === modal.type.order && <OrderDetails />}
            {currentModal.type === modal.type.ingredientsDetails && <IngredientDetails />}
          </Modal>
        }
      {currentModal.type === modal.type.loadingSpinner && currentModal.isActive && <LoadingSpinner />}
    </div>
  );
}

export default App;
