'use client';

import React from "react";
import MortgageTabs from "./MortgageTabs";
import Breadcrumb from '../_components/Breadcrumb';

export default function MortgageCalculatorPage() {
  return (
    <>
  <Breadcrumb /> {/* No container here */}

  <div className="container mx-auto px-4">
    <MortgageTabs />
  </div>
</>
  );
}
