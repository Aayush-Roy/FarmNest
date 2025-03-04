import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  location: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  location: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('http://localhost:5000/api/auth/user');
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // const login = async (email: string, password: string) => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  //     localStorage.setItem('token', res.data.token);
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
  //     setUser(res.data.user);
  //     setIsAuthenticated(true);
  //   } catch (err: any) {
  //     setError(err.response?.data?.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const login = async (email: string, password: string) => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  
  //     console.log('Sending login request:', { email, password }); // Debug
  
  //     const res = await axios.post('http://localhost:5000/api/auth/login', {
  //       email,
  //       password
  //     });
  
  //     console.log('Login response:', res.data); // Debug response
  
  //     localStorage.setItem('token', res.data.token);
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
  //     setUser(res.data.user);
  //     setIsAuthenticated(true);
  //   } catch (err: any) {
  //     console.error('Login error:', err.response?.data); // Debug error
  //     setError(err.response?.data?.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
  
      console.log('Sending login request:', { email, password }); // Debug log
  
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim(), // Remove spaces
        password
      });
  
      console.log('Login response:', res.data); // Debug response
  
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error('Login error:', err.response?.data); // Debug error
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};