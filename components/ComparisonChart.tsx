import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { ChartDataPoint } from '../types';

interface Props {
  data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-tech-blue/30 p-4 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-md">
        <p className="text-slate-300 text-sm mb-1">{label}</p>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-tech-accent"></div>
           <p className="text-white font-mono text-xl font-bold">{payload[0].value} <span className="text-xs text-slate-400">秒</span></p>
        </div>
      </div>
    );
  }
  return null;
};

export const ComparisonChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[500px] mt-8 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 60, right: 30, left: 20, bottom: 5 }}
          barSize={100} 
        >
          <defs>
            <linearGradient id="barGradientOld" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#475569" stopOpacity={0.4}/>
            </linearGradient>
            <linearGradient id="barGradientNew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.5}/>
            </linearGradient>
            <filter id="glow" height="130%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
              <feOffset dx="0" dy="0" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
              </feComponentTransfer>
              <feMerge> 
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            tick={{fontSize: 20, fill: '#cbd5e1', fontWeight: 600}} 
            tickLine={false} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} 
            dy={15}
          />
          
          <YAxis 
            hide={true} 
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.03)'}} />
          
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]} 
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 0 ? "url(#barGradientOld)" : "url(#barGradientNew)"} 
                stroke={index === 1 ? "rgba(6,182,212,0.5)" : "transparent"}
                strokeWidth={1}
                filter={index === 1 ? "url(#glow)" : ""}
              />
            ))}
            <LabelList 
              dataKey="value" 
              position="top" 
              formatter={(val: number) => `${val} 秒`}
              style={{ fill: '#fff', fontSize: '32px', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}
              offset={15}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};