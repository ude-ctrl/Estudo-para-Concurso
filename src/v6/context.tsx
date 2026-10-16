import { createContext, useContext } from 'react';
import type { Content, Mode, State, TrainingPool, UnitId } from './types';
import type { SensoryEvent } from './sensory';
export interface Route {
  page: 'home' | 'unit' | 'errors' | 'settings';
  unit: UnitId;
  mode: Mode;
  mission: string;
  pool?: TrainingPool;
}
export const V6Context = createContext<{
  content: Content;
  state: State;
  update: (fn: (s: State) => void) => void;
  notify: (s: string) => void;
  route: Route;
  quiet: boolean;
  signal: SensoryEvent | null;
  previewSound: () => void;
  go: (unit: UnitId, mode: Mode, mission?: string) => void;
} | null>(null);
export function useV6() {
  const value = useContext(V6Context);
  if (!value) throw Error('Contexto de estudo indisponível');
  return value;
}
