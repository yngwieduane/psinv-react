import React from 'react';
import styles from './TabContent.module.css';

interface Day {
  day: string;
  title: string;
  descriptions: string[];
}
interface TabContentProps {
  levelData: {
    title: string;
    comingSoon: boolean;
    days: Day[];
    values: string[];
    skills: string[];
  };
  isComingSoon: boolean;
}
export default function TabContent({ levelData, isComingSoon }: TabContentProps) {
  if (isComingSoon) {
    return (
      <div className="text-center text-white py-10">
        <p className="text-xl">Coming Soon...</p>
      </div>
    );
  }
  return (
    <div className="bg-[#3f51b52b] text-white py-10 w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Day Details */}
        <div className="pt-4">
          <h3 className="text-2xl font-bold mb-6">{levelData.title}</h3>
          {levelData.days.map((day, idx) => (
            <div className={styles.detailsInner} key={idx}>
              <div className={styles.dayCircle}>{day.day}</div>
              <div className={styles.dayText}>
                <p className="text-lg font-semibold mb-1">{day.title}</p>
                {day.descriptions.map((desc, dIdx) => (
                  <p key={dIdx} className="text-sm leading-relaxed">{desc}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/*  Values & Skills */}
        <div className="pt-4 md:pt-10">
          {levelData.values.length > 0 && (
            <div className="mb-10 max-w-xl mx-auto text-white">
              <h4 className="text-2xl font-bold text-center mb-2">Program Values</h4>
              <hr className="border-t border-white w-24 mx-auto mb-6" />
              <ul className="list-disc list-outside pl-6 space-y-3 text-left">
                {levelData.values.map((value, idx) => (
                  <li key={idx}><p>{value}</p></li>
                ))}
              </ul>
            </div>
          )}
          {levelData.skills.length > 0 && (
            <div className="max-w-xl mx-auto text-white">
              <h4 className="text-2xl font-bold text-center mb-2">Enabling Skills</h4>
              <hr className="border-t border-white w-24 mx-auto mb-6" />
              <ul className="list-disc list-outside pl-6 space-y-3 text-left">
                {levelData.skills.map((skill, idx) => (
                  <li key={idx}><p>{skill}</p></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
