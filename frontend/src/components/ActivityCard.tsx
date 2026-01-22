import React from 'react';
import { Activity } from '../types/formalabs';
import { ArrowRightIcon } from 'lucide-react';
interface ActivityCardProps {
  activity: Activity;
}
export function ActivityCard({
  activity
}: ActivityCardProps) {
  return <div className="flex flex-col p-8 border border-wireframe-border bg-white h-full hover:border-uspn-blue/40 transition-colors">
      <div className="w-12 h-12 border-2 border-dashed border-uspn-blue/30 mb-6 flex items-center justify-center bg-uspn-blue/5">
        <div className="w-4 h-4 bg-uspn-blue/40" />
      </div>

      <h3 className="text-xl font-bold text-uspn-navy mb-3">
        {activity.title}
      </h3>
      <p className="text-wireframe-text leading-relaxed mb-6 flex-grow">
        {activity.description}
      </p>

      <div className="flex items-center text-sm font-mono text-uspn-gray group cursor-pointer hover:text-uspn-navy transition-colors">
        <span>EN SAVOIR PLUS</span>
        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>;
}