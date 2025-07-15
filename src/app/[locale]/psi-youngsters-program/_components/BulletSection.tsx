'use client';

import React from 'react';

type BulletSectionProps = {
  title: string;
  items: string[];
};

const BulletSection: React.FC<BulletSectionProps> = ({ title, items }) => (
  <div className="flex flex-col space-y-2 mt-6">
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <hr className="w-2/3 border-t border-white mb-4" />
    <ul className="list-disc pl-5">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-white">{item}</li>
      ))}
    </ul>
  </div>
);

export default BulletSection;
