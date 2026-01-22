import React from 'react';
import { Project } from '../types/formalabs';
import { CalendarIcon } from 'lucide-react';
interface ProjectCardProps {
  project: Project;
}
export function ProjectCard({
  project
}: ProjectCardProps) {
  return <div className="border border-wireframe-border bg-white p-4 hover:border-uspn-blue/40 transition-colors">
      {/* Placeholder Image */}
      <div className="w-full h-48 bg-uspn-blue/5 border-2 border-dashed border-uspn-blue/30 mb-4 flex items-center justify-center">
        <span className="text-uspn-gray font-mono text-sm">
          IMG_PLACEHOLDER
        </span>
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <CalendarIcon className="w-4 h-4 text-uspn-blue" />
        <span className="text-xs font-mono text-uspn-gray">{project.date}</span>
      </div>

      <h3 className="text-lg font-bold text-uspn-navy mb-2">{project.title}</h3>
      <p className="text-sm text-wireframe-text leading-relaxed">
        {project.description}
      </p>
    </div>;
}