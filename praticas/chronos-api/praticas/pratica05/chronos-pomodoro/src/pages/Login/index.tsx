import { TimerIcon } from 'lucide-react';
import { LoginForm } from '../../components/LoginForm';
import styles from './styles.module.css';

export function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.logoArea}>
        <TimerIcon className={styles.logoIcon} aria-hidden='true' />
        <h1 className={styles.logoText}>Chronos</h1>
        <p className={styles.logoTagline}>Gerencie seu tempo com a técnica Pomodoro</p>
      </div>

      <LoginForm />
    </main>
  );
}
