import { createContext, useContext, useReducer, useEffect } from 'react';

// Credenciais mockadas (valores fixos no front-end)
export const MOCK_USER = 'usuario@chronos.com';
export const MOCK_PASSWORD = 'chronos123';

// Types
export type AuthState = {
  isAuthenticated: boolean;
  username: string | null;
};

export type AuthAction =
  | { type: 'LOGIN'; payload: { username: string } }
  | { type: 'LOGOUT' };

type AuthContextType = {
  authState: AuthState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

// Estado inicial
const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
};

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, username: action.payload.username };
    case 'LOGOUT':
      return { isAuthenticated: false, username: null };
    default:
      return state;
  }
}

// Contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// Provider
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState, () => {
    // Restaura sessão do sessionStorage ao recarregar a página
    const saved = sessionStorage.getItem('auth');
    if (saved) {
      try {
        return JSON.parse(saved) as AuthState;
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  // Persiste sessão no sessionStorage
  useEffect(() => {
    sessionStorage.setItem('auth', JSON.stringify(authState));
  }, [authState]);

  function login(username: string, password: string): boolean {
    const isValid =
      username.trim() === MOCK_USER && password === MOCK_PASSWORD;
    if (isValid) {
      dispatch({ type: 'LOGIN', payload: { username } });
    }
    return isValid;
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthContextProvider');
  }
  return context;
}
