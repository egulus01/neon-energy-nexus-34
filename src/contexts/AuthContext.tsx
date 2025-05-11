
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id?: string;
  email: string;
  name?: string;
}

interface ThresholdSettings {
  pressure: number;
  temperature: number;
  flowRate: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
  isLoading: boolean;
  theme: string;
  setTheme: (theme: string) => void;
  thresholds: ThresholdSettings;
  updateThresholds: (newThresholds: ThresholdSettings) => void;
}

// Default threshold values
const DEFAULT_THRESHOLDS: ThresholdSettings = {
  pressure: 200,
  temperature: 80,
  flowRate: 300
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setThemeState] = useState(() => localStorage.getItem('theme') || 'dark');
  const [thresholds, setThresholds] = useState<ThresholdSettings>(() => {
    const savedThresholds = localStorage.getItem('thresholds');
    return savedThresholds ? JSON.parse(savedThresholds) : DEFAULT_THRESHOLDS;
  });
  const navigate = useNavigate();

  // Apply theme on mount and when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Set the data-theme attribute on the html element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add transition class when switching themes
    document.documentElement.classList.add('theme-transition');
    
    // Also set a class on the body for broader theme support
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    
    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
    
    return () => clearTimeout(timer);
  }, [theme]);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, []);

  // Save thresholds to localStorage when they change
  useEffect(() => {
    localStorage.setItem('thresholds', JSON.stringify(thresholds));
  }, [thresholds]);

  // Set theme function with improved validation
  const setTheme = (newTheme: string) => {
    console.log('Setting theme to:', newTheme); // Debug log
    // Ensure only valid themes are set
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    } else {
      console.warn(`Invalid theme: ${newTheme}. Using 'dark' as fallback.`);
      setThemeState('dark');
    }
  };

  // Update thresholds function
  const updateThresholds = (newThresholds: ThresholdSettings) => {
    setThresholds(newThresholds);
    // In a real app, we would also send this to the backend
    toast({
      title: "Settings Updated",
      description: "Your threshold settings have been saved.",
    });
  };

  // Validate token and set auth state
  const checkAuth = (): boolean => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        // For mock token validation, check if it at least looks like a JWT
        // Real JWT validation would verify the signature with a secret key
        const tokenParts = token.split('.');
        
        if (tokenParts.length !== 3) {
          throw new Error('Invalid token format');
        }
        
        // For our mock token, we'll still try to decode the payload
        try {
          const payload = JSON.parse(atob(tokenParts[1]));
          
          if (payload.exp && payload.exp > Math.floor(Date.now() / 1000)) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
            return true;
          }
        } catch (decodeError) {
          console.error('Invalid token format', decodeError);
        }
      } catch (error) {
        console.error('Invalid token format', error);
      }
    }
    
    // Clear auth data if invalid or expired
    setIsAuthenticated(false);
    setUser(null);
    return false;
  };

  const login = (token: string, userData: User) => {
    return new Promise<void>((resolve, reject) => {
      try {
        // First store the token and user data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Verify the token is valid
        const isValid = checkAuth();
        
        if (isValid) {
          setIsAuthenticated(true);
          setUser(userData);
          toast({
            title: "Login Successful",
            description: `Welcome back, ${userData.name || userData.email}!`,
          });
          resolve();
        } else {
          reject(new Error('Token validation failed'));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      checkAuth, 
      isLoading, 
      theme, 
      setTheme,
      thresholds, 
      updateThresholds 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
