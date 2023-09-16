import styles from "./app.module.css";
// imports from modules
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
// import components
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import OrderDetails from "../order-details/order-details";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import services
import { openModal, showSpinner, closeModal } from "../../services/modalSlice";
import { loadIngredients } from "../../services/ingredientsSlice";
// import utils
import { MODAL } from "../../utils/constants";


function App() {

  const dispatch = useDispatch();
  
  const ingredientsIsLoaded = useSelector(state => state.ingredients.isLoaded);
  const currentModal = useSelector(state => state.modal);

  const handleOpenModal = (type) => {
    dispatch(openModal(type));
  }

  const handleCloseModal = (payload) => {
   dispatch(closeModal(payload));
  }

  useEffect(() => {
    dispatch(showSpinner());
    dispatch(loadIngredients());
    dispatch(closeModal({ type: MODAL.type.loadingSpinner}));
    // eslint-disable-next-line
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader />
        <main className={`${styles.content}`}>
          {ingredientsIsLoaded && <BurgerIngredients onModalOpen={handleOpenModal} />}
          {ingredientsIsLoaded && <BurgerConstructor />}
        </main>
        {currentModal.isActive &&
            <Modal onCloseModal={handleCloseModal}>
              {currentModal.type === MODAL.type.order && <OrderDetails />}
              {currentModal.type === MODAL.type.ingredientsDetails && <IngredientDetails />}
            </Modal>
          }
        {currentModal.type === MODAL.type.loadingSpinner && currentModal.isActive && <LoadingSpinner />}
      </div>
    </DndProvider>
  );
}

export default App;
