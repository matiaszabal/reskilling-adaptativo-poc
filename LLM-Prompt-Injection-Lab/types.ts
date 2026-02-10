
export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface Message {
  role: Role;
  content: string;
  timestamp: Date;
}

export interface Resource {
  title: string;
  url: string;
}

export interface LabState {
  currentLevel: number;
  isSolved: boolean;
  isLabComplete: boolean;
  attempts: number;
  lastAnalysis: string | null;
}

export interface LevelConfig {
  id: number;
  name: string;
  flag: string;
  description: string;
  mission: string;
  defenseMechanism: string;
  agentInstruction: string;
  resources: Resource[];
}
