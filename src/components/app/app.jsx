import styles from "./app.module.css";
// imports from modules
import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
// import utils
import { MODAL } from "../../utils/constants";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password/reset-password-page";
import NotFound404 from "../../pages/not-found/not-found";
import { OnlyAuth, OnlyUnauth } from "../protected-route/protected-route-element";
import { checkUserAuth } from "../../services/profileSlice";
import { loadIngredients } from "../../services/ingredientsSlice";
import IngredientPage from "../../pages/ingredient/ingredient-page";


function App() {

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  
  const currentModal = useSelector(state => state.modal);
  const ingredients = useSelector(state => state.ingredients);
  const currentOrder = useSelector(state => state.order);

  const handleCloseModal = () => {
    navigate(-1);
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
      {ingredients.loaded && (
        <Routes location={background || location}>
          <Route path='/' element={<OnlyAuth component={<HomePage />} />} />
          <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path='/login' element={<OnlyUnauth component={<LoginPage />} />} />
          <Route path='/register' element={<OnlyUnauth component={<RegisterPage />} />} />
          <Route path='/reset-password' element={<OnlyUnauth component={<ResetPasswordPage />} />} />
          <Route path='/forgot-password' element={<OnlyUnauth component={<ForgotPasswordPage />} />} />
          <Route path='/ingredients/:ingredientId' element={<OnlyAuth component={<IngredientPage />} />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}
      {background && ingredients.loaded && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal onCloseModal={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
            />
          <Route
            path='/order-details'
            element={ currentModal.isActive && currentModal.type === MODAL.type.order && currentOrder.status === 'loaded' &&
              <Modal onCloseModal={handleCloseModal}>
                <OrderDetails />
              </Modal>
            }
          >
          </Route>
        </Routes>
      )}
      { (currentOrder.status === 'loading' || !ingredients.loaded) &&
        <Modal onCloseModal={()=>{}} spinner={true}>
          <LoadingSpinner />
        </Modal>
      }
    </div>
  );
}

export default App;
