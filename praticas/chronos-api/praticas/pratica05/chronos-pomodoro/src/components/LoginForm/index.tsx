import { useState, useEffect, useRef } from 'react';
import { LoginInput } from '../LoginInput';
import { LoginActions } from '../LoginActions';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

// Tipo para controlar qual "tela" exibir dentro do card
type ViewMode = 'login' | 'register' | 'forgot';

export function LoginForm() {
  const { login } = useAuth();

  // Estado local do formulário
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');
  const [viewMode, setViewMode] = useState<ViewMode>('login');

  // Foca automaticamente no campo de usuário ao montar
  const usernameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, [viewMode]);

  // Limpa mensagens de feedback após 4 segundos
  useEffect(() => {
    if (!feedbackMessage) return;
    const timer = setTimeout(() => setFeedbackMessage(''), 4000);
    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de um pequeno delay (como se fosse uma chamada de API)
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        setFeedbackType('success');
        setFeedbackMessage('Login realizado com sucesso! Redirecionando...');
      } else {
        setFeedbackType('error');
        setFeedbackMessage('Usuário ou senha incorretos. Verifique e tente novamente.');
        setPassword('');
      }
      setIsSubmitting(false);
    }, 800);
  }

  function handleRegisterClick() {
    setViewMode('register');
    setFeedbackType('info');
    setFeedbackMessage('');
  }

  function handleForgotPasswordClick() {
    setViewMode('forgot');
    setFeedbackType('info');
    setFeedbackMessage('');
  }

  function handleBackToLogin() {
    setViewMode('login');
    setUsername('');
    setPassword('');
    setFeedbackMessage('');
  }

  // Renderização condicional: tela de cadastro (simulação)
  if (viewMode === 'register') {
    return (
      <div className={styles.card}>
        <div className={styles.simView}>
          <p className={styles.simTitle}>📋 Tela de Cadastro</p>
          <p className={styles.simText}>
            O fluxo de cadastro ainda será implementado em etapas futuras.
          </p>
          <button className={styles.backButton} onClick={handleBackToLogin}>
            ← Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  // Renderização condicional: tela de recuperação de senha (simulação)
  if (viewMode === 'forgot') {
    return (
      <div className={styles.card}>
        <div className={styles.simView}>
          <p className={styles.simTitle}>🔑 Recuperação de Senha</p>
          <p className={styles.simText}>
            O fluxo de recuperação de senha ainda será implementado em etapas futuras.
          </p>
          <button className={styles.backButton} onClick={handleBackToLogin}>
            ← Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  // Tela principal de login
  return (
    <div className={styles.card}>
      <p className={styles.subtitle}>Entre com sua conta para continuar</p>

      {/* Feedback ao usuário (renderização condicional) */}
      {feedbackMessage && (
        <div
          className={`${styles.feedback} ${styles[feedbackType]}`}
          role='alert'
          aria-live='polite'
        >
          {feedbackMessage}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <LoginInput
          ref={usernameRef}
          id='username'
          labelText='Usuário (e-mail)'
          type='email'
          placeholder='usuario@chronos.com'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='username'
          required
          aria-required='true'
        />

        <LoginInput
          id='password'
          labelText='Senha'
          type='password'
          placeholder='••••••••'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
          required
          aria-required='true'
        />

        <LoginActions
          isSubmitting={isSubmitting}
          onRegisterClick={handleRegisterClick}
          onForgotPasswordClick={handleForgotPasswordClick}
        />
      </form>

      {/* Dica de credenciais mock para fins didáticos */}
      <div className={styles.hint}>
        <p>
          <strong>Dica:</strong> usuário <code>usuario@chronos.com</code> / senha{' '}
          <code>chronos123</code>
        </p>
      </div>
    </div>
  );
}
