import React, { useState } from 'react';
import { FormaLabs } from './pages/FormaLabs';
import { LabTemplate } from './pages/LabTemplate';

export function App() {
  const [currentView,  setCurrentView ] = useState<'home' | 'lab'>('home');
  const [currentLabId, setCurrentLabId] = useState<number | null>(null);

  const navigateToLab = (labId: number) => {
    window.scrollTo(0, 0);
    setCurrentLabId(labId);
    setCurrentView('lab');
  };

  const navigateToHome = () => {
    window.scrollTo(0, 0);
    setCurrentLabId(null);
    setCurrentView('home');
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
      {currentView === 'home' || currentLabId === null ? (
        <FormaLabs onNavigateToLab={navigateToLab} />
      ) : (
        <LabTemplate labId={currentLabId} onBack={navigateToHome} />
      )}
    </div>
  );
}