import styles from './app.module.css';
// imports from modules
import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import components
import Modal from '../modal/modal';
import AppHeader from '../app-header/app-header';
import OrderStatus from '../order-status/order-status';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import {
  OnlyAuth,
  OnlyUnauth,
} from '../protected-route/protected-route-element';
// import pages
import HomePage from '../../pages/home/home-page';
import FeedPage from '../../pages/feed/feed-page';
import LoginPage from '../../pages/login/login-page';
import NotFound404 from '../../pages/not-found/not-found';
import ProfilePage from '../../pages/profile/profile-page';
import RegisterPage from '../../pages/register/register-page';
import IngredientPage from '../../pages/ingredient/ingredient-page';
import OrdersPage from '../../pages/orders/orders-page';
import ResetPasswordPage from '../../pages/reset-password/reset-password-page';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password-page';
import OrderPage from '../../pages/order/order-page';
import ProfileSettingsPage from '../../pages/profile-settings/profile-settings-page';
// import services
import { closeModal } from '../../services/modalSlice';
import { checkUserAuth } from '../../services/profileSlice';
import { loadIngredients } from '../../services/ingredientsSlice';
// import constants
import { MODAL, TOKENS, PATHS, WS_ACTIONS } from '../../utils/constants';
// import utils
import {
  getModal,
  getIngredients,
  getOrder,
} from '../../utils/store-selectors';
import { useAppDispatch, useAppSelector } from 'types';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const currentModal = useAppSelector(getModal);
  const ingredients = useAppSelector(getIngredients);
  const currentOrder = useAppSelector(getOrder);

  const handleCloseModal = () => {
    navigate(-1);
    dispatch(closeModal());
  };

  if (location.pathname !== '/feed') {
    dispatch({ type: WS_ACTIONS.feedWsStop });
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
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.feed} element={<FeedPage />} />

          <Route
            path={PATHS.profile.index}
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route path={''} element={<ProfileSettingsPage />} />
            <Route path={PATHS.profile.orders} element={<OrdersPage />} />
          </Route>
          <Route
            path={PATHS.login}
            element={<OnlyUnauth component={<LoginPage />} />}
          />
          <Route
            path={PATHS.register}
            element={<OnlyUnauth component={<RegisterPage />} />}
          />
          {localStorage.getItem(TOKENS.resetTokenSent) && (
            <Route
              path={PATHS.resetPassword}
              element={<OnlyUnauth component={<ResetPasswordPage />} />}
            />
          )}
          <Route
            path={PATHS.forgotPassword}
            element={<OnlyUnauth component={<ForgotPasswordPage />} />}
          />
          <Route
            path={PATHS.ingredient}
            element={<OnlyAuth component={<IngredientPage />} />}
          />
          <Route
            path={`${PATHS.feed}/${PATHS.orderDetails}`}
            element={<OrderPage />}
          />
          <Route
            path={`${PATHS.profile.index}/${PATHS.profile.orders}/${PATHS.orderDetails}`}
            element={<OnlyAuth component={<OrderPage />} />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      )}
      {background && ingredients.loaded && (
        <Routes>
          <Route
            path={PATHS.ingredient}
            element={
              <Modal onCloseModal={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={`${PATHS.profile.index}/${PATHS.profile.orders}/${PATHS.orderDetails}`}
            element={
              <Modal onCloseModal={handleCloseModal}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path={`${PATHS.feed}/${PATHS.orderDetails}`}
            element={
              <Modal onCloseModal={handleCloseModal}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path={PATHS.orderStatus}
            element={
              currentModal.isActive &&
              currentModal.type === MODAL.type.orderStatus &&
              currentOrder.status === 'loaded' && (
                <Modal onCloseModal={handleCloseModal}>
                  <OrderStatus />
                </Modal>
              )
            }
          ></Route>
        </Routes>
      )}
      {(currentOrder.status === 'loading' || !ingredients.loaded) && (
        <Modal onCloseModal={() => {}} forSpinner={true}>
          <LoadingSpinner />
        </Modal>
      )}
    </div>
  );
}

export default App;
