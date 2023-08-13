import styles from "./app.module.css";
import React from "react";
import { getIngredients } from "../../utils/api";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientsPropType } from "../../utils/prop-types";

function App() {
  const [error, setError] = React.useState(null);
  const [modalType, setModalType] = React.useState('ingredient__details');
  // order__details
  // ingredient__details
  const [data, setData] = React.useState(
    {
      ingredients: [],
      isLoaded: false,
    }
  );

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
      <AppHeader data={data.ingredients} />
      <main className={`${styles.content}`}>
        {data.isLoaded &&<BurgerIngredients data={ data.ingredients } />}
        {data.isLoaded && <BurgerConstructor data={ data.ingredients } />}
      </main>
      <Modal>
        {modalType === 'order__details' && <OrderDetails />}
        {modalType === 'ingredient__details' && <IngredientDetails />}
      </Modal>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: ingredientsPropType,
}

BurgerConstructor.propTypes = {
  data: ingredientsPropType,
}

export default App;
