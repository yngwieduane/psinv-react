'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { SavedItem, User } from '@/types/types';
import { db, auth } from '@/lib/firebase';

interface UserContextType {
  user: User | null;
  favorites: SavedItem[];
  compareList: SavedItem[];
  login: () => Promise<void>;
  logout: () => void;
  toggleFavorite: (item: SavedItem) => void;
  addToCompare: (item: SavedItem) => void;
  removeFromCompare: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isCompared: (id: string) => boolean;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<SavedItem[]>([]);
  const [compareList, setCompareList] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from local storage on mount
  // Load from local storage on mount
  useEffect(() => {
    const storedFavs = localStorage.getItem('psi_favorites');
    const storedCompare = localStorage.getItem('psi_compare');

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    if (storedCompare) setCompareList(JSON.parse(storedCompare));

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth State Changed:", currentUser ? "User found" : "No user");

      if (currentUser) {
        // User is signed in
        const userData: User = {
          id: currentUser.uid,
          name: currentUser.displayName || 'Anonymous',
          email: currentUser.email || '',
          avatar: currentUser.photoURL || ''
        };
        setUser(userData);
        console.log("User Set:", userData.email);

        // Turn off loading immediately so UI renders
        setLoading(false);
        console.log("Loading set to false (User found)");

        // Sync with firestore in background (don't await)
        try {
          const userRef = doc(db, "users", currentUser.uid);
          setDoc(userRef, {
            ...userData,
            lastLogin: new Date().toISOString(),
            role: 'Client'
          }, { merge: true }).catch(err => console.error("Firestore sync error:", err));
        } catch (e) {
          console.error("Error initiating firestore sync", e);
        }

      } else {
        // User is signed out
        setUser(null);
        console.log("User Set: null");
        setLoading(false);
        console.log("Loading set to false (No user)");
      }
    });

    // Failsafe: If Firebase doesn't respond in 4 seconds, verify locally
    const timer = setTimeout(() => {
      setLoading(prev => {
        if (prev) {
          console.warn("Auth check timed out, forcing loading false");
          return false;
        }
        return prev;
      });
    }, 4000);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };

    return () => unsubscribe();
  }, []);

  // Sync state to local storage for persistence across tabs
  useEffect(() => {
    localStorage.setItem('psi_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('psi_compare', JSON.stringify(compareList));
  }, [compareList]);

  const login = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged hook will handle state updates and firestore syncing
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Firebase Login Error:", error);
      alert("Failed to sign in. Please try again.");
    } finally {
      // loading state is also handled in onAuthStateChanged, 
      // but we turn it off here in case of error where auth state doesn't change
      setLoading(false);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      // localStorage.removeItem('psi_user'); // Not needed as we rely on Firebase Auth
    }).catch((error) => {
      console.error("Logout error", error);
    });
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
      isCompared,
      loading
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
