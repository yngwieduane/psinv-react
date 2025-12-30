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

// Helper to remove undefined values which cause Firestore errors
const sanitizeData = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

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

        // Fetch user data from Firestore (Favorites & Compare)
        try {
          console.log("Fetching user data from Firestore...");
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            console.log("User data fetched:", data);
            if (data.favorites) {
              setFavorites(data.favorites);
              console.log("Favorites restored from Firestore:", data.favorites.length);
            }
            if (data.compareList) {
              setCompareList(data.compareList);
              console.log("Compare list restored from Firestore:", data.compareList.length);
            }
          } else {
            console.log("No user document found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }

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

  const toggleFavorite = async (item: SavedItem) => {
    if (!user) {
      alert("Please login to save favorites.");
      login();
      return;
    }

    // Calculate new list based on current state
    let newFavorites: SavedItem[];
    if (favorites.find(i => i.id === item.id)) {
      newFavorites = favorites.filter(i => i.id !== item.id);
    } else {
      newFavorites = [...favorites, item];
    }

    setFavorites(newFavorites);

    // Sync to Firestore
    try {
      // Sanitize to remove undefined values
      const safeFavorites = sanitizeData(newFavorites);
      console.log("Syncing favorites to Firestore...", safeFavorites.length);

      const userRef = doc(db, "users", user.id);
      await setDoc(userRef, { favorites: safeFavorites }, { merge: true });
      console.log("Favorites synced successfully to Firestore");
    } catch (e) {
      console.error("Error syncing favorites to Firestore", e);
    }
  };

  const addToCompare = async (item: SavedItem) => {
    if (compareList.find(i => i.id === item.id)) return;

    // Determine category of the new item
    const isProject = item.type === 'project';

    // Count existing items of same category
    const sameCategoryCount = compareList.filter(i =>
      isProject ? i.type === 'project' : (i.type === 'property' || i.type === 'units')
    ).length;

    if (sameCategoryCount >= 3) {
      alert(`You can compare up to 3 ${isProject ? 'projects' : 'properties'} only.`);
      return;
    }

    const newCompareList = [...compareList, item];
    setCompareList(newCompareList);

    // Sync to Firestore
    if (user) {
      try {
        const safeCompareList = sanitizeData(newCompareList);
        const userRef = doc(db, "users", user.id);
        await setDoc(userRef, { compareList: safeCompareList }, { merge: true });
        console.log("Compare list synced successfully!");
      } catch (e) {
        console.error("Error syncing compare list to Firestore", e);
      }
    }
  };

  const removeFromCompare = async (id: string) => {
    const newCompareList = compareList.filter(i => i.id !== id);
    setCompareList(newCompareList);

    // Sync to Firestore
    if (user) {
      try {
        const safeCompareList = sanitizeData(newCompareList);
        const userRef = doc(db, "users", user.id);
        await setDoc(userRef, { compareList: safeCompareList }, { merge: true });
      } catch (e) {
        console.error("Error syncing compare list to Firestore", e);
      }
    }
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
