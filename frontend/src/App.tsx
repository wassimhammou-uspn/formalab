import React, { useState } from 'react';
import { FormaLabs } from './pages/FormaLabs';
import { LabTemplate } from './pages/LabTemplate';
import { LabData } from './types/formalabs';
// Mock data for the demo lab
const makerLabData: LabData = {
  name: 'MakerLab',
  room: 'Salle A101',
  category: 'Fabrication Numérique',
  mission: "Le MakerLab est un espace dédié à la concrétisation d'idées par le prototypage rapide. Nous fournissons les outils et l'expertise nécessaires pour transformer des concepts abstraits en objets tangibles.",
  objectives: ['Formation aux machines à commande numérique', "Soutien aux projets de fin d'études", 'Promotion de la culture Maker sur le campus', 'Collaboration interdisciplinaire'],
  projects: [{
    id: 'p1',
    title: 'Prothèse de main imprimée 3D',
    description: "Conception et fabrication d'une prothèse mécanique open-source à faible coût pour enfants.",
    date: 'OCT 2023'
  }, {
    id: 'p2',
    title: 'Station Météo Connectée',
    description: 'Boîtier résistant aux intempéries usiné par CNC pour abriter des capteurs environnementaux.',
    date: 'DEC 2023'
  }, {
    id: 'p3',
    title: 'Mobilier Modulaire',
    description: "Système d'étagères paramétriques découpées au laser pour l'aménagement des espaces étudiants.",
    date: 'JAN 2024'
  }]
};
export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'lab'>('home');
  const navigateToLab = () => {
    window.scrollTo(0, 0);
    setCurrentView('lab');
  };
  const navigateToHome = () => {
    window.scrollTo(0, 0);
    setCurrentView('home');
  };
  return <div className="font-sans text-gray-900 antialiased">
      {currentView === 'home' ? <FormaLabs onNavigateToLab={navigateToLab} /> : <LabTemplate data={makerLabData} onBack={navigateToHome} />}
    </div>;
}