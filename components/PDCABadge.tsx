import React from 'react';
import { PDCAStage } from '../types';

interface Props {
  stage?: PDCAStage;
}

const colors = {
  [PDCAStage.PLAN]: 'bg-blue-600/90 border-blue-400 text-white shadow-blue-500/20',
  [PDCAStage.DO]: 'bg-indigo-600/90 border-indigo-400 text-white shadow-indigo-500/20',
  [PDCAStage.CHECK]: 'bg-emerald-600/90 border-emerald-400 text-white shadow-emerald-500/20',
  [PDCAStage.ACT]: 'bg-amber-600/90 border-amber-400 text-white shadow-amber-500/20',
  [PDCAStage.NONE]: 'hidden'
};

export const PDCABadge: React.FC<Props> = ({ stage = PDCAStage.NONE }) => {
  if (stage === PDCAStage.NONE) return null;

  return (
    <div className={`absolute top-0 left-0 md:top-8 md:left-8 px-5 py-2 rounded-lg border-l-4 ${colors[stage]} backdrop-blur-sm text-sm font-bold tracking-widest uppercase shadow-xl z-20 flex items-center gap-2 transform hover:scale-105 transition-transform`}>
      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
      {stage} Phase
    </div>
  );
};