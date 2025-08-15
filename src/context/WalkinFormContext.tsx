'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ClientLabel = 'Buyer' | 'Seller' | 'Tenant' | 'Landlord';

type RequirementTypeId = '91212' | '91213';
type ContactTypeId = '1' | '2' | '3' | '4';

export type WalkinFormData = {
  title?: string;
  firstName?: string;
  lastName?: string;
  branch?: string;
  nationality?: string;
  dob?: string;
  address?: string;
  residenceType?: string;
  reasonOfVisit?: string;
  email?: string;
  bestTime?: string;
  professionType?: string;
  companyName?: string;
  position?: string;
  professionCity?: string;
  professionCountry?: string;
  buildingName?: string;
  selectedService?: string;
  requirementType?: string;
  unitCategory?: string;
  unitType?: string;
  bedroom?: string;
  movingDate?: string;
  minBudget?: number;
  maxBudget?: number;

  reqType?: RequirementTypeId;

  contactType?: ContactTypeId;

  clientTypeLabel?: ClientLabel;
  primaryPhone?: string;
  alternatePhone?: string;

  // Viewing
  onSpotViewing?: boolean;
  onSpotDetails?: {
    communityName?: string;
    date?: string;
    time?: string;
  };

  // Finance
  lookingForFinance?: boolean;
  financeDetails?: {
    preferredBank?: string;
    downpayment?: number;
    loanAmount?: number;
  };

  selfieFileName?: string;
  uploadedSelfieURL?: string;
  selfieFileData?: string;

  property?: {
    id?: string;
    name?: string;
    country?: string;
    city?: string;
    district?: string;
    community?: string;
    subCommunity?: string;
  };

  hostedBy?: {
    agentId?: string;
    agentName?: string;
  };

  experienceRating?: number;
  remarks?: string;
};

type WalkinFormContextType = {
  data: WalkinFormData;
  updateForm: (fields: Partial<WalkinFormData>) => void;
  resetForm: () => void;
};

const WalkinFormContext = createContext<WalkinFormContextType | undefined>(undefined);

export const WalkinFormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<WalkinFormData>({});

  const updateForm = (fields: Partial<WalkinFormData>) => {
    setData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const resetForm = () => setData({});

  return (
    <WalkinFormContext.Provider value={{ data, updateForm, resetForm }}>
      {children}
    </WalkinFormContext.Provider>
  );
};

export const useWalkinForm = () => {
  const context = useContext(WalkinFormContext);
  if (!context) throw new Error('useWalkinForm must be used within a WalkinFormProvider');
  return context;
};
