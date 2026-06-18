import { createContext, useContext, useReducer, useEffect } from 'react';

const API_URL = 'http://localhost:3333';

export type AuthState = {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
};

export type AuthAction =
  | { type: 'LOGIN'; payload: { username: string; token: string } }
  | { type: 'LOGOUT' };

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  forgot: (email: string) => Promise<{ success: boolean; token?: string; error?: string }>;
  reset: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  token: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, username: action.payload.username, token: action.payload.token };
    case 'LOGOUT':
      return { isAuthenticated: false, username: null, token: null };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState, () => {
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

  useEffect(() => {
    sessionStorage.setItem('auth', JSON.stringify(authState));
  }, [authState]);

  async function login(email: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      dispatch({ type: 'LOGIN', payload: { username: data.name, token: data.token } });
      return { success: true };
    } catch {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true };
    } catch {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  async function forgot(email: string) {
    try {
      const res = await fetch(`${API_URL}/auth/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true, token: data.token };
    } catch {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  async function reset(token: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/auth/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true };
    } catch {
      return { success: false, error: 'Erro ao conectar com o servidor' };
    }
  }

  function logout() {
    sessionStorage.removeItem('auth');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider value={{ authState, login, register, forgot, reset, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthContextProvider');
  }
  return context;
}
