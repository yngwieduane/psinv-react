'use client'
import React from 'react';
import { Heart, MapPin, Trash2 } from 'lucide-react';
import { useUser } from '@/context/userContext';
import { PROPERTIES } from '@/constants/main';
import { PROJECTS } from '@/utils/projectOverrides';
import PropertyBox from '../projects/_components/PropertyBox';

const Favorites: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {

  return (
    <>
    </>
  );
};

export default Favorites;
