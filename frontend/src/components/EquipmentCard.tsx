import React, { useState } from 'react';
import { Equipment } from '../types/formalabs';
import { MapPinIcon, WrenchIcon } from 'lucide-react';
interface EquipmentCardProps {
  equipment: Equipment;
}
export function EquipmentCard({
  equipment
}: EquipmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return <div className="relative group p-6 border-2 border-dashed border-wireframe-border bg-white hover:border-uspn-blue/40 hover:bg-uspn-blue/5 transition-colors duration-200 cursor-default" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-uspn-blue/10 rounded-md">
          <WrenchIcon className="w-6 h-6 text-uspn-navy" />
        </div>
        <span className="text-xs font-mono text-uspn-gray border border-wireframe-border px-2 py-1 rounded">
          EQ-{equipment.id}
        </span>
      </div>

      <h3 className="text-lg font-bold text-uspn-navy mb-2">
        {equipment.name}
      </h3>
      <p className="text-sm text-wireframe-secondary">
        {equipment.description}
      </p>

      {/* Tooltip */}
      {isHovered && <div className="absolute z-10 left-0 bottom-full mb-2 w-full px-2">
          <div className="bg-white border border-uspn-blue/30 shadow-lg p-4 rounded-md text-left">
            <h4 className="text-xs font-bold text-uspn-gray uppercase tracking-wider mb-2 border-b border-wireframe-border pb-1">
              Disponible dans :
            </h4>
            <ul className="space-y-2">
              {equipment.labs.map((lab, index) => <li key={index} className="flex items-center text-sm text-uspn-navy">
                  <MapPinIcon className="w-3 h-3 mr-2 text-uspn-blue" />
                  <span className="font-medium">{lab.name}</span>
                  <span className="mx-1 text-wireframe-border">|</span>
                  <span className="font-mono text-xs text-uspn-gray">
                    {lab.room}
                  </span>
                </li>)}
            </ul>
            {/* Arrow */}
            <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-white border-b border-r border-uspn-blue/30 transform -translate-x-1/2 rotate-45"></div>
          </div>
        </div>}
    </div>;
}