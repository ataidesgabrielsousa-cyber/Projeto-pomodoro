import styles from './styles.module.css';

type LoginActionsProps = {
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
  isSubmitting: boolean;
};

export function LoginActions({
  onRegisterClick,
  onForgotPasswordClick,
  isSubmitting,
}: LoginActionsProps) {
  return (
    <div className={styles.actions}>
      <button
        type='submit'
        className={styles.submitButton}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>

      <div className={styles.links}>
        <button
          type='button'
          className={styles.linkButton}
          onClick={onForgotPasswordClick}
        >
          Esqueci minha senha
        </button>

        <button
          type='button'
          className={styles.linkButton}
          onClick={onRegisterClick}
        >
          Não tem conta? <span>Cadastre-se</span>
        </button>
      </div>
    </div>
  );
}
