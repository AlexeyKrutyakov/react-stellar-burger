import styles from "./app.module.css";
// imports from modules
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import pages
import HomePage from "../../pages/home/home-page";
import LoginPage from "../../pages/login/login-page";
import ProfilePage from "../../pages/profile/profile-page";
import RegisterPage from "../../pages/register/register-page";
// import components
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import OrderDetails from "../order-details/order-details";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import IngredientDetails from "../ingredient-details/ingredient-details";
// import services
import { closeModal } from "../../services/modalSlice";
import { loadIngredients } from "../../services/ingredientsSlice";
// import utils
import { MODAL } from "../../utils/constants";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password/reset-password-page";
import IngredientPage from "../../pages/ingredient/ingredient-page";
import NotFound404 from "../../pages/not-found/not-found";
import { OnlyAuth, OnlyUnauth } from "../protected-route/protected-route-element";
import { checkUserAuth } from "../../services/profileSlice";


function App() {

  const dispatch = useDispatch();
  
  const currentModal = useSelector(state => state.modal);

  const handleCloseModal = () => {
   dispatch(closeModal());
  }

  useEffect(() => {
    dispatch(loadIngredients());
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
        <Routes>
          <Route path='/login' element={<OnlyUnauth component={<LoginPage />} />} />
          <Route path='/' element={<OnlyAuth component={<HomePage />} />} />
          <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path='/register' element={<OnlyUnauth component={<RegisterPage />} />} />
          <Route path='/reset-password' element={<OnlyAuth component={<ResetPasswordPage />} />} />
          <Route path='/forgot-password' element={<OnlyAuth component={<ForgotPasswordPage />} />} />
          <Route path='/ingredients/:id' element={<OnlyAuth component={<IngredientPage />} />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      {currentModal.isActive &&
          <Modal onCloseModal={handleCloseModal}>
            {currentModal.type === MODAL.type.order && <OrderDetails />}
            {currentModal.type === MODAL.type.ingredientsDetails && <IngredientDetails />}
          </Modal>
        }
      {currentModal.type === MODAL.type.loadingSpinner && currentModal.isActive && <LoadingSpinner />}
    </div>
  );
}

export default App;
