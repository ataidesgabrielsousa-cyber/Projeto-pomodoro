import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

export function Menu() {
  const { authState, logout } = useAuth();

  return (
    <nav className={styles.menu}>
      {authState.username && (
        <span className={styles.welcome}>Olá, {authState.username}!</span>
      )}
      <a className={styles.menuLink} href='#'>
        <HouseIcon />
      </a>
      <a className={styles.menuLink} href='#'>
        <HistoryIcon />
      </a>
      <a className={styles.menuLink} href='#'>
        <SettingsIcon />
      </a>
      <a className={styles.menuLink} href='#'>
        <SunIcon />
      </a>
      <button className={styles.menuLink} onClick={logout} title='Sair'>
        <LogOutIcon />
      </button>
    </nav>
  );
}
