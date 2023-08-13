import styles from './app-header.module.css';
import NavPanel from '../nav-panel/nav-panel.jsx';

function AppHeader({ data }) {
  return (
    <header className={`${styles.header} mt-10 mr-10 ml-10`}>
      <NavPanel />
    </header>
  );
}

export default AppHeader;