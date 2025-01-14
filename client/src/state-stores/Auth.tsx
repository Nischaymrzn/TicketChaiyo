import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  handleSetAccessToken: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  setAccessToken: () => {},
  setUser: () => {},
  setIsAuthenticated: () => {},
  handleSetAccessToken : () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSetAccessToken = (token: string | null) => {
    setAccessToken(token);
    setIsAuthenticated(!!token);
  };

  return (
    <AuthContext.Provider value={{
      accessToken,
      user,
      isAuthenticated,
      setAccessToken,
      handleSetAccessToken,
      setUser,
      setIsAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
