import styles from "./app.module.css";
import React from "react";
import { getIngredients } from "../../utils/api";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ingredientsPropType } from "../../utils/prop-types";

function App() {
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(
    {
      ingredients: [],
      loading: true,
    }
  );

  React.useEffect(() => {
    setData({...data, loading: true});
    getIngredients()
      .then(res => {
        setData({ ...data, ingredients: [...res.data], loading: false });
        })
      .catch(err => {
        setError(err.message);
        console.log(error);
        }
      )
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.content}`}>
        <BurgerIngredients data={ data.ingredients } />
        {/* <BurgerConstructor data={ data.ingredients } /> */}
      </main>
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
