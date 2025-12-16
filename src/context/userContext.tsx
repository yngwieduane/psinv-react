'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { SavedItem, User } from '@/types/types';

interface UserContextType {
  user: User | null;
  favorites: SavedItem[];
  compareList: SavedItem[];
  login: () => void;
  logout: () => void;
  toggleFavorite: (item: SavedItem) => void;
  addToCompare: (item: SavedItem) => void;
  removeFromCompare: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isCompared: (id: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<SavedItem[]>([]);
  const [compareList, setCompareList] = useState<SavedItem[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('psi_user');
    const storedFavs = localStorage.getItem('psi_favorites');
    const storedCompare = localStorage.getItem('psi_compare');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    if (storedCompare) setCompareList(JSON.parse(storedCompare));
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('psi_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('psi_compare', JSON.stringify(compareList));
  }, [compareList]);

  const login = () => {
    // Simulate Google Login
    const mockUser: User = {
      id: '123',
      name: 'Ali Ahmed',
      email: 'ali.ahmed@example.com',
      avatar: 'https://picsum.photos/seed/useravatar/100/100'
    };
    setUser(mockUser);
    localStorage.setItem('psi_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('psi_user');
  };

  const toggleFavorite = (item: SavedItem) => {
    if (!user) {
      alert("Please login to save favorites.");
      login();
      return;
    }
    setFavorites(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.filter(i => i.id !== item.id);
      return [...prev, item];
    });
  };

  const addToCompare = (item: SavedItem) => {
    setCompareList(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      if (prev.length >= 3) {
        alert("You can compare up to 3 items only.");
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(i => i.id !== id));
  };

  const isFavorite = (id: string) => !!favorites.find(i => i.id === id);
  const isCompared = (id: string) => !!compareList.find(i => i.id === id);

  return (
    <UserContext.Provider value={{ 
      user, 
      favorites, 
      compareList, 
      login, 
      logout, 
      toggleFavorite, 
      addToCompare, 
      removeFromCompare,
      isFavorite,
      isCompared
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
