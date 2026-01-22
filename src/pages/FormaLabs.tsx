import React from 'react';
import { Activity, Equipment } from '../types/formalabs';
import { ActivityCard } from '../components/ActivityCard';
import { EquipmentCard } from '../components/EquipmentCard';
import { Header } from '../components/Header';
const activities: Activity[] = [{
  id: '1',
  title: 'Projets Étudiants',
  description: 'Accompagnement complet pour vos projets académiques et personnels, de la conception à la réalisation finale.'
}, {
  id: '2',
  title: 'Accessibilité & Handicap',
  description: "Développement de solutions inclusives et technologies d'assistance pour améliorer le quotidien de tous."
}, {
  id: '3',
  title: 'Transition Énergétique',
  description: 'Innovation durable et éco-conception pour répondre aux défis environnementaux actuels.'
}, {
  id: '4',
  title: 'Vie Étudiante',
  description: "Un espace de rencontre, d'échange et d'événements pour dynamiser la communauté universitaire."
}];
const equipments: Equipment[] = [{
  id: '3D-01',
  name: 'Imprimante 3D',
  description: 'Impression FDM haute précision pour prototypage rapide.',
  labs: [{
    name: 'MakerLab',
    room: 'A101'
  }, {
    name: 'ProtoLab',
    room: 'B205'
  }]
}, {
  id: 'LZR-02',
  name: 'Découpeuse Laser',
  description: 'Découpe et gravure sur bois, acrylique et carton.',
  labs: [{
    name: 'FabLab',
    room: 'A103'
  }]
}, {
  id: 'CNC-03',
  name: 'Fraiseuse CNC',
  description: 'Usinage numérique pour matériaux tendres et bois.',
  labs: [{
    name: 'MakerLab',
    room: 'A101'
  }]
}, {
  id: 'OSC-04',
  name: 'Oscilloscope',
  description: 'Analyse de signaux électroniques 4 canaux.',
  labs: [{
    name: 'ElectroLab',
    room: 'C301'
  }, {
    name: 'ProtoLab',
    room: 'B205'
  }]
}, {
  id: 'SDR-05',
  name: 'Poste de soudure',
  description: 'Station de soudage précision avec extraction de fumée.',
  labs: [{
    name: 'ElectroLab',
    room: 'C301'
  }]
}, {
  id: 'CAM-06',
  name: 'Caméra haute vitesse',
  description: 'Capture de mouvements rapides pour analyse physique.',
  labs: [{
    name: 'MediaLab',
    room: 'D102'
  }]
}];
interface FormaLabsProps {
  onNavigateToLab: () => void;
}
const SECTIONS = [{
  id: 'hero',
  label: 'ACCUEIL'
}, {
  id: 'activities',
  label: 'ACTIVITÉS'
}, {
  id: 'equipments',
  label: 'ÉQUIPEMENTS'
}];
export function FormaLabs({
  onNavigateToLab
}: FormaLabsProps) {
  return <div className="min-h-screen bg-wireframe-bg pb-20">
      <Header sections={SECTIONS} />

      {/* Hero Section with Split Layout */}
      <section id="hero" className="relative bg-white border-b border-wireframe-border scroll-mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Column: Content */}
            <div className="py-20 px-6 lg:pr-12 relative z-10">
              <div className="inline-block px-3 py-1 mb-6 border border-uspn-blue/30 rounded-full text-xs font-mono text-uspn-navy bg-uspn-blue/5">
                UNIVERSITÉ FORMALABS
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-uspn-navy mb-6 tracking-tight">
                FormaLabs
              </h1>
              <p className="text-xl md:text-2xl text-wireframe-text max-w-xl font-light mb-8">
                Plateforme d'innovation et de création pour la vie étudiante. Un
                espace ouvert pour expérimenter, construire et collaborer.
              </p>
              <div className="flex gap-4">
                <button onClick={onNavigateToLab} className="px-6 py-3 bg-uspn-navy text-white font-medium rounded-md hover:bg-uspn-blue transition-colors">
                  Visiter un Lab (Démo)
                </button>
                <button className="px-6 py-3 border border-uspn-navy/30 text-uspn-navy font-medium rounded-md hover:bg-uspn-navy/5 transition-colors">
                  En savoir plus
                </button>
              </div>
            </div>

            {/* Right Column: Image with Fade Effect */}
            <div className="relative h-64 lg:h-auto">
              {/* Image */}
              <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: 'url(https://cdn.magicpatterns.com/uploads/hXcRTKuhmsdNkbWw7dDaQp/Gemini_Generated_Image_33j3oo33j3oo33j3.png)'
            }} />

              {/* Gradient Overlay - Fades from left to transparent on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent lg:from-white/0 lg:via-white/40 lg:to-transparent" style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)'
            }} />

              {/* Optional: Subtle border overlay for wireframe aesthetic */}
              <div className="absolute inset-0 border-l-2 border-dashed border-wireframe-border/30 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-16">
        {/* Activities Section */}
        <section id="activities" className="mb-24 scroll-mt-24">
          <div className="flex items-end justify-between mb-10 border-b border-uspn-blue/20 pb-4">
            <h2 className="text-3xl font-bold text-uspn-navy">Nos Activités</h2>
            <span className="font-mono text-uspn-gray hidden md:block">
              01 — DOMAINES D'ACTION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map(activity => <ActivityCard key={activity.id} activity={activity} />)}
          </div>
        </section>

        {/* Equipment Section */}
        <section id="equipments" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-10 border-b border-uspn-blue/20 pb-4">
            <h2 className="text-3xl font-bold text-uspn-navy">
              Équipements Disponibles
            </h2>
            <span className="font-mono text-uspn-gray hidden md:block">
              02 — RESSOURCES TECHNIQUES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipments.map(equipment => <EquipmentCard key={equipment.id} equipment={equipment} />)}
          </div>
        </section>
      </main>
    </div>;
}