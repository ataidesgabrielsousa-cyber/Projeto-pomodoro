import { useState, useEffect, useRef } from 'react';
import { LoginInput } from '../LoginInput';
import { LoginActions } from '../LoginActions';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

type ViewMode = 'login' | 'register' | 'forgot' | 'reset';

export function LoginForm() {
  const { login, register, forgot, reset } = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');
  const [viewMode, setViewMode] = useState<ViewMode>('login');

  const firstFieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstFieldRef.current?.focus();
  }, [viewMode]);

  useEffect(() => {
    if (!feedbackMessage) return;
    const timer = setTimeout(() => setFeedbackMessage(''), 5000);
    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  function showFeedback(msg: string, type: 'success' | 'error' | 'info') {
    setFeedbackType(type);
    setFeedbackMessage(msg);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await login(username, password);
    if (result.success) {
      showFeedback('Login realizado com sucesso!', 'success');
    } else {
      showFeedback(result.error || 'Erro ao realizar login', 'error');
      setPassword('');
    }
    setIsSubmitting(false);
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      showFeedback('As senhas não coincidem', 'error');
      return;
    }
    setIsSubmitting(true);
    const result = await register(name, username, password);
    if (result.success) {
      showFeedback('Conta criada com sucesso! Faça login.', 'success');
      setTimeout(() => handleBackToLogin(), 2000);
    } else {
      showFeedback(result.error || 'Erro ao cadastrar', 'error');
    }
    setIsSubmitting(false);
  }

  async function handleForgot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await forgot(username);
    if (result.success) {
      showFeedback(`Token gerado: ${result.token}`, 'success');
      setTimeout(() => setViewMode('reset'), 3000);
    } else {
      showFeedback(result.error || 'Erro ao recuperar senha', 'error');
    }
    setIsSubmitting(false);
  }

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showFeedback('As senhas não coincidem', 'error');
      return;
    }
    setIsSubmitting(true);
    const result = await reset(resetToken, newPassword);
    if (result.success) {
      showFeedback('Senha redefinida com sucesso! Faça login.', 'success');
      setTimeout(() => handleBackToLogin(), 2000);
    } else {
      showFeedback(result.error || 'Erro ao redefinir senha', 'error');
    }
    setIsSubmitting(false);
  }

  function handleBackToLogin() {
    setViewMode('login');
    setName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setResetToken('');
    setNewPassword('');
    setFeedbackMessage('');
  }

  const Feedback = () =>
    feedbackMessage ? (
      <div className={`${styles.feedback} ${styles[feedbackType]}`} role='alert' aria-live='polite'>
        {feedbackMessage}
      </div>
    ) : null;

  if (viewMode === 'register') {
    return (
      <div className={styles.card}>
        <p className={styles.subtitle}>Crie sua conta</p>
        <Feedback />
        <form className={styles.form} onSubmit={handleRegister} noValidate>
          <LoginInput ref={firstFieldRef} id='name' labelText='Nome' type='text'
            placeholder='Seu nome' value={name} onChange={(e) => setName(e.target.value)} required />
          <LoginInput id='email' labelText='E-mail' type='email'
            placeholder='seu@email.com' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <LoginInput id='password' labelText='Senha' type='password'
            placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <LoginInput id='confirmPassword' labelText='Confirmar Senha' type='password'
            placeholder='••••••••' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Criar conta'}
          </button>
          <button type='button' className={styles.backButton} onClick={handleBackToLogin}>
            ← Voltar ao Login
          </button>
        </form>
      </div>
    );
  }

  if (viewMode === 'forgot') {
    return (
      <div className={styles.card}>
        <p className={styles.subtitle}>Recuperar senha</p>
        <Feedback />
        <form className={styles.form} onSubmit={handleForgot} noValidate>
          <LoginInput ref={firstFieldRef} id='email' labelText='E-mail' type='email'
            placeholder='seu@email.com' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Gerar token'}
          </button>
          <button type='button' className={styles.backButton} onClick={handleBackToLogin}>
            ← Voltar ao Login
          </button>
        </form>
      </div>
    );
  }

  if (viewMode === 'reset') {
    return (
      <div className={styles.card}>
        <p className={styles.subtitle}>Redefinir senha</p>
        <Feedback />
        <form className={styles.form} onSubmit={handleReset} noValidate>
          <LoginInput ref={firstFieldRef} id='token' labelText='Token recebido' type='text'
            placeholder='Cole o token aqui' value={resetToken} onChange={(e) => setResetToken(e.target.value)} required />
          <LoginInput id='newPassword' labelText='Nova senha' type='password'
            placeholder='••••••••' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <LoginInput id='confirmPassword' labelText='Confirmar nova senha' type='password'
            placeholder='••••••••' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Redefinindo...' : 'Redefinir senha'}
          </button>
          <button type='button' className={styles.backButton} onClick={handleBackToLogin}>
            ← Voltar ao Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <p className={styles.subtitle}>Entre com sua conta para continuar</p>
      <Feedback />
      <form className={styles.form} onSubmit={handleLogin} noValidate>
        <LoginInput ref={firstFieldRef} id='username' labelText='E-mail' type='email'
          placeholder='seu@email.com' value={username} onChange={(e) => setUsername(e.target.value)}
          autoComplete='username' required aria-required='true' />
        <LoginInput id='password' labelText='Senha' type='password'
          placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password' required aria-required='true' />
        <LoginActions isSubmitting={isSubmitting}
          onRegisterClick={() => setViewMode('register')}
          onForgotPasswordClick={() => setViewMode('forgot')} />
      </form>
    </div>
  );
}
