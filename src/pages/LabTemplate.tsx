import React from 'react';
import { LabData } from '../types/formalabs';
import { ProjectCard } from '../components/ProjectCard';
import { ArrowLeftIcon, MapPinIcon, TagIcon } from 'lucide-react';
import { Header } from '../components/Header';
interface LabTemplateProps {
  data: LabData;
  onBack: () => void;
}
const SECTIONS = [{
  id: 'overview',
  label: 'APERÇU'
}, {
  id: 'mission',
  label: 'MISSION'
}, {
  id: 'projects',
  label: 'PROJETS'
}];
export function LabTemplate({
  data,
  onBack
}: LabTemplateProps) {
  return <div className="min-h-screen bg-wireframe-bg pb-20">
      <Header sections={SECTIONS} />

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-wireframe-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <button onClick={onBack} className="flex items-center text-sm font-medium text-uspn-gray hover:text-uspn-navy transition-colors">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <section id="overview" className="bg-white border-b border-wireframe-border py-16 px-6 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 border border-uspn-blue/30 rounded text-xs font-mono text-uspn-navy bg-uspn-blue/5">
              <MapPinIcon className="w-3 h-3 mr-2" />
              {data.room}
            </span>
            <span className="inline-flex items-center px-3 py-1 border border-uspn-blue/30 rounded text-xs font-mono text-uspn-navy bg-uspn-blue/5">
              <TagIcon className="w-3 h-3 mr-2" />
              {data.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-uspn-navy mb-6">
            {data.name}
          </h1>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Mission & Info */}
          <div className="lg:col-span-1 space-y-12">
            <section id="mission" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-uspn-navy mb-4 border-b border-uspn-blue/20 pb-2">
                Notre Mission
              </h2>
              <p className="text-wireframe-text leading-relaxed mb-6">
                {data.mission}
              </p>

              <h3 className="text-sm font-bold text-uspn-navy uppercase tracking-wide mb-3">
                Objectifs
              </h3>
              <ul className="space-y-2">
                {data.objectives.map((obj, idx) => <li key={idx} className="flex items-start text-sm text-wireframe-text">
                    <span className="mr-2 text-uspn-blue">•</span>
                    {obj}
                  </li>)}
              </ul>
            </section>

            <div className="p-6 bg-uspn-blue/5 border border-dashed border-uspn-blue/30 rounded-lg">
              <h3 className="text-sm font-bold text-uspn-navy mb-2">
                Horaires d'ouverture
              </h3>
              <div className="space-y-1 text-sm font-mono text-wireframe-text">
                <div className="flex justify-between">
                  <span>Lun - Ven</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>10:00 - 14:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Projects */}
          <div className="lg:col-span-2">
            <section id="projects" className="scroll-mt-24">
              <div className="flex items-end justify-between mb-8 border-b border-uspn-blue/20 pb-4">
                <h2 className="text-2xl font-bold text-uspn-navy">
                  Projets Réalisés
                </h2>
                <span className="font-mono text-uspn-gray text-sm">
                  ARCHIVES 2023-2024
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map(project => <ProjectCard key={project.id} project={project} />)}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>;
}