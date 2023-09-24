import styles from "./app.module.css";
// imports from modules
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
//import pages
import MainPage from "../../pages/main-page";
import LoginPage from "../../pages/login/login-page";
import ProfilePage from "../../pages/profile-page";
import RegisterPage from "../../pages/register-page";
// import components
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import OrderDetails from "../order-details/order-details";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import IngredientDetails from "../ingredient-details/ingredient-details";
// import services
import { showSpinner, closeModal } from "../../services/modalSlice";
import { loadIngredients } from "../../services/ingredientsSlice";
// import utils
import { MODAL } from "../../utils/constants";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page";
import IngredientPage from "../../pages/ingredient/ingredient-page";


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
    <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <Router>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/reset-password' element={<ResetPasswordPage />} />
              <Route path='/forgot-password' element={<ForgotPasswordPage />} />
              <Route path='/ingredients/:id' element={<IngredientPage />} />
            </Routes>
          </Router>
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
