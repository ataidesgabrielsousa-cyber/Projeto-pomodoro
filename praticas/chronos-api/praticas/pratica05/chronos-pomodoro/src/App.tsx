import { AuthContextProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/Login';
import { HomePage } from './pages/Home';
import './styles/theme.css';
import './styles/global.css';

// Componente interno que decide qual "rota" exibir
function AppRouter() {
  const { authState } = useAuth();

  // Renderização condicional: rota protegida
  return authState.isAuthenticated ? <HomePage /> : <LoginPage />;
}

export function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}
