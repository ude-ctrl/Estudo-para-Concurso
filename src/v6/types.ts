export type UnitId = 'cartografia-fundamentos' | 'cartografia-representacao' | 'geotecnologias';
export type Mode = 'estudo' | 'treino' | 'revisao' | 'prova';
export type Rating = 'errei' | 'dificil' | 'bom' | 'facil';
export type ErrorType = 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8';
export interface LegacyRef {
  legacy_source: string;
  legacy_id: string;
  hash: string;
}
export interface Mission {
  id: string;
  unit: UnitId;
  title: string;
  goal: string;
  conceptIds: string[];
  sections: Section[];
  recalls: Recall[];
}
export interface Section {
  id: string;
  title: string;
  hook: string;
  html: string;
  primary: boolean;
  refs: LegacyRef[];
}
export interface Concept {
  id: string;
  mission: string;
  name: string;
  explanation: string;
  mechanism: string;
  example: string;
  confusion: string;
  repair: string;
  errorType: ErrorType;
}
export interface Recall {
  id: string;
  mission: string;
  concept: string;
  prompt: string;
  model: string;
  points: string[];
  refs: LegacyRef[];
}
export interface Option {
  id: string;
  text: string;
  feedback: string;
  errorType: ErrorType;
}
export interface Question {
  qualityFlags?: string[];
  id: string;
  mission: string;
  unit: UnitId;
  concept: string;
  prompt: string;
  options: Option[];
  correct: string;
  explanation: string;
  pool: 'fixacao' | 'concurso' | 'elite';
  roles: string[];
  difficulty: number;
  cognitive: number;
  scope: string;
  origin: string;
  status: string;
  reviewNotes: string;
  visual?: string;
  refs: LegacyRef[];
  originalFeedback: string[];
}
export interface Card {
  id: string;
  mission: string;
  unit: UnitId;
  concept: string;
  front: string;
  back: string;
  variants: { front: string; back: string }[];
  refs: LegacyRef[];
}
export interface GameItem {
  id: string;
  mission: string;
  unit: UnitId;
  concept: string;
  statement: string;
  truth: boolean;
  justification: string;
  variants: { statement: string; justification: string }[];
  refs: LegacyRef[];
}
export interface Writing {
  id: string;
  unit: UnitId;
  mission: string;
  prompt: string;
  model: string;
  rubric: string[];
  refs: LegacyRef[];
}
export interface ArchiveEntry {
  id: string;
  kind: string;
  mission: string;
  refs: LegacyRef[];
  original: unknown;
}
export interface Content {
  version: string;
  units: { id: UnitId; title: string; description: string }[];
  missions: Mission[];
  concepts: Concept[];
  questions: Question[];
  cards: Card[];
  game: GameItem[];
  writing: Writing[];
  supplements: { id: string; mission: string; kind: string; html: string; refs: LegacyRef[] }[];
  references: { source: string; html: string }[];
  archive: ArchiveEntry[];
  sources: {
    code: string;
    path: string;
    hash: string;
    key: string;
    previous: string | null;
    counts: Record<string, number>;
  }[];
}
export interface Review {
  due: number;
  last: number;
  interval: number;
  reviews: number;
  lapses: number;
  rating: Rating;
  history: { at: number; rating: Rating; interval: number }[];
}
export interface Evidence {
  id: string;
  item: string;
  concept: string;
  mission: string;
  unit: UnitId;
  at: number;
  kind: 'fixacao' | 'concurso' | 'elite' | 'game' | 'recall' | 'flashcard' | 'exam' | 'boss';
  correct: boolean;
  delayed: boolean;
  eligible: boolean;
  difficulty: number;
  rating?: Rating;
  context?: string;
}
export interface ErrorRecord {
  id: string;
  concept: string;
  mission: string;
  unit: UnitId;
  type: ErrorType;
  misconception: string;
  status: 'aberto' | 'em-recuperacao' | 'resolvido' | 'dominado-apos-erro';
  first: number;
  last: number;
  count: number;
  itemIds: string[];
  events: { at: number; item: string; correct: boolean; note: string }[];
  delayedItems: string[];
  falseMastery: boolean;
}
export interface ExamSession {
  id: string;
  ids: string[];
  answers: Record<string, string>;
  optionOrder: Record<string, string[]>;
  started: number;
  deadline: number;
  finished?: number;
  current: number;
  profile: string;
  novelty: number;
}
export interface State {
  schema: 6;
  revision: number;
  updated: number;
  preferences: { theme: 'system' | 'light' | 'dark'; motion: 'system' | 'reduce' };
  read: Record<string, number>;
  drafts: Record<string, string>;
  reviews: Record<string, Review>;
  evidence: Evidence[];
  errors: Record<string, ErrorRecord>;
  awards: Record<string, { at: number; xp: number; reason: string }>;
  // Additive to schema 6: older backups without this field remain valid.
  milestones?: Record<string, number>;
  migrations: Record<string, { at: number; raw: string; notes: string[]; imported: number }>;
  legacyHistory: {
    source: string;
    legacy_id: string;
    canonical: string;
    value: unknown;
    ambiguous: boolean;
  }[];
  exposures: Record<string, number>;
  resume?: { unit: UnitId; mode: Mode; mission: string };
  exam?: ExamSession;
  writingHistory: {
    id: string;
    item: string;
    at: number;
    text: string;
    rubric: number[];
    medium: string;
  }[];
  practical: {
    phase: 'plano' | 'defesa' | 'rubrica' | 'concluida';
    started?: number;
    deadline?: number;
    topic: string;
    planMinutes: number;
    defenseMinutes: number;
    checks: number[];
  };
  practicalHistory: {
    id: string;
    at: number;
    topic: string;
    fields: Record<string, string>;
    rubric: number[];
  }[];
  session?: {
    id: string;
    deadline?: number;
    kind: 'cards' | 'questions' | 'game';
    ids: string[];
    position: number;
    answered?: boolean;
    pool?: string;
    repeat: string[];
  };
  significantDays: string[];
  calendarPolicy?: 'local-v1';
  legacySignificantDays?: string[];
}
