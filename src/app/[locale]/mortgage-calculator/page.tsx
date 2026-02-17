'use client';

import React from "react";
import MortgageTabs from "./MortgageTabs";
import Breadcrumb from '../_components/Breadcrumb';

export default function MortgageCalculatorPage() {
  return (
    <div className="">
      <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="container mx-auto">
          <Breadcrumb
          />
        </div>
      </div>
      <div className="mx-auto container">
        <MortgageTabs />
      </div>
    </div>
  );
}
