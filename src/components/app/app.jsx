import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.content}`}>
        <BurgerIngridients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
