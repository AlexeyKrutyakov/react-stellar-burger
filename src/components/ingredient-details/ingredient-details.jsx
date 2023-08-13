import styles from './ingredient-details.module.css';
import { data } from '../../utils/data';
console.log(data);
const image = data[2].image_large;
const name = data[2].name;
const calories = data[2].calories;
const proteins = data[2].proteins;
const fat = data[2].fat;
const carbohydrates = data[2].carbohydrates;

export default function IngredientDetails() {
  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-8`}>
        Детали ингредиента
      </h1>
      <img src={image} alt={name} />
      <h1 className="text text_type_main-medium mt-4">{name}</h1>
      <div className={`${styles.nutritional_values} mt-8 mb-15`}>
        <article className={styles.value}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <span className='text text_type_digits-default text_color_inactive'>{calories}</span>
        </article>
        <article className={styles.value}>
        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
        <span className='text text_type_digits-default text_color_inactive'>{proteins}</span>
        </article>
        <article className={styles.value}>
        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
        <span className='text text_type_digits-default text_color_inactive'>{fat}</span>
        </article>
        <article className={styles.value}>
        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
        <span className='text text_type_digits-default text_color_inactive'>{carbohydrates}</span>
        </article>
      </div>
    </>
  );
}