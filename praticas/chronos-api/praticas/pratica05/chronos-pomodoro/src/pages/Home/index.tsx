import { LogOutIcon, PlayCircleIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';
import { CountDown } from '../../components/CountDown';
import { DefaultInput } from '../../components/DefaultInput';
import { Cycles } from '../../components/Cycles';
import { DefaultButton } from '../../components/DefaultButton';
import { Footer } from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.css';

export function HomePage() {
  const { authState, logout } = useAuth();

  return (
    <>
      <Container>
        {/* Barra de usuário com botão de logout */}
        <div className={styles.userBar}>
          <span className={styles.greeting}>
            Olá, <strong>{authState.username}</strong>
          </span>
          <button
            className={styles.logoutButton}
            onClick={logout}
            aria-label='Sair da conta'
          >
            <LogOutIcon />
            Sair
          </button>
        </div>
      </Container>

      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <form className='form' action=''>
          <div className='formRow'>
            <DefaultInput
              labelText='task'
              id='meuInput'
              type='text'
              placeholder='Digite algo'
            />
          </div>

          <div className='formRow'>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

          <div className='formRow'>
            <Cycles />
          </div>

          <div className='formRow'>
            <DefaultButton icon={<PlayCircleIcon />} />
          </div>
        </form>
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
}
