import styles from './not-found.module.css';
import { useEffect } from "react";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router';

export default function NotFound404() {

  useEffect(() => {
    document.title = 'Stellar Burgers: Not found 404';
  });

  const navigate = useNavigate();

  function clickHandler() {
    navigate('/');
  };

  return (
    <section className={styles.container}>
		  <div className={styles.wrapper}>
			  <article className={styles.content}>
				  <h1 className={`${styles.request_code} text text_type_digits-large`}>404</h1>
				  <p className={`${styles.request_text} text text_type_main-large`}>Страница&nbsp;не&nbsp;найдена</p>
			  </article>
			  <Button htmlType='button' type='primary' size='medium' extraClass='mt-6' onClick={clickHandler}>На главную</Button>
		  </div>
	  </section>
  );
}
