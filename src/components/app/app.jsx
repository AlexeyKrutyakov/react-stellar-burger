import styles from "./app.module.css";
// imports from modules
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
// import components
import Modal from "../modal/modal";
import MainPage from "../../pages/main-page";
import AppHeader from "../app-header/app-header";
import OrderDetails from "../order-details/order-details";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import IngredientDetails from "../ingredient-details/ingredient-details";
// import services
import { showSpinner, closeModal } from "../../services/modalSlice";
import { loadIngredients } from "../../services/ingredientsSlice";
// import utils
import { MODAL } from "../../utils/constants";


function App() {

  const dispatch = useDispatch();
  
  const currentModal = useSelector(state => state.modal);

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
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Routes>
            <Route path='/' element={<MainPage />} />
          </Routes>
          {currentModal.isActive &&
              <Modal onCloseModal={handleCloseModal}>
                {currentModal.type === MODAL.type.order && <OrderDetails />}
                {currentModal.type === MODAL.type.ingredientsDetails && <IngredientDetails />}
              </Modal>
            }
          {currentModal.type === MODAL.type.loadingSpinner && currentModal.isActive && <LoadingSpinner />}
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
