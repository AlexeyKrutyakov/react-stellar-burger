import styles from './not-found.module.css';
// imports from modules
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
// import components
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import constants
import { PATHS, STYLES } from '../../utils/constants';

export default function NotFound404() {
  useEffect(() => {
    document.title = 'Stellar Burgers: Not found 404';
  }, []);

  const navigate = useNavigate();

  function clickHandler() {
    navigate(PATHS.home);
  }

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <article className={styles.content}>
          <h1 className={`${styles.request_code} ${STYLES.digits.large}`}>
            404
          </h1>
          <p className={`${styles.request_text} ${STYLES.text.large}`}>
            Страница&nbsp;не&nbsp;найдена
          </p>
        </article>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mt-6"
          onClick={clickHandler}
        >
          На главную
        </Button>
      </div>
    </section>
  );
}
