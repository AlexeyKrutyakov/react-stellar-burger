import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';

function BurgerConstructor() {
  const bun = data.filter(ingridient => ingridient.type === 'bun')[0];
  const sauce = data.filter(ingridient => ingridient.type === 'sauce')[0];
  const mains = data.filter(ingridient => ingridient.type === 'main');
  return(
    <section className={`${styles.burgerConstructor}`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
      />
      <ConstructorElement
        text={sauce.name}
        price={sauce.price}
        thumbnail={sauce.image}
      />
      {mains.map(main => (
        <ConstructorElement
        text={main.name}
        price={main.price}
        thumbnail={main.image}
      />
      ))}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </section>
  );
}

export default BurgerConstructor;
