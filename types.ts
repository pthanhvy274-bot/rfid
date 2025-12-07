import { LucideIcon } from 'lucide-react';

export enum SlideType {
  COVER = 'COVER',
  Content = 'CONTENT',
  SPLIT = 'SPLIT', // Left text, right visual
  CHART = 'CHART',
  BIG_NUMBER = 'BIG_NUMBER',
  PROCESS = 'PROCESS', // Steps
  CONCLUSION = 'CONCLUSION'
}

export enum PDCAStage {
  NONE = '',
  PLAN = 'PLAN',
  DO = 'DO',
  CHECK = 'CHECK',
  ACT = 'ACT'
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface SlideContent {
  id: number;
  type: SlideType;
  pdca?: PDCAStage;
  title: string;
  subtitle?: string;
  points?: string[];
  highlight?: string; // For big numbers or emphasis
  chartData?: ChartDataPoint[];
  icon?: LucideIcon;
  visualDescription?: string; // For accessibility or placeholders
}