import { useState, useEffect, useCallback } from "react";

interface AuthUser {
  name: string;
  email: string;
}

// Mock users database
const mockUsers = [
  { email: "test@netflix.com", password: "123456", name: "Test User" },
  { email: "demo@netflix.com", password: "demo123", name: "Demo User" },
];

export function useMockAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('netflix_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const user = { name: foundUser.name, email: foundUser.email };
      setUser(user);
      localStorage.setItem('netflix_user', JSON.stringify(user));
      return null;
    } else {
      return "Invalid email or password. Try: test@netflix.com / 123456";
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      return "User already exists";
    }
    
    // Add new user to mock database
    mockUsers.push({ email, password, name });
    
    const user = { name, email };
    setUser(user);
    localStorage.setItem('netflix_user', JSON.stringify(user));
    return null;
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem('netflix_user');
  }, []);

  return { user, loading, login, signup, logout };
}
