export type Category =
  | 'Fundamentos'
  | 'Cartografia'
  | 'Geografia física'
  | 'Geografia humana'
  | 'Amazônia e Pará'
  | 'Educação'
  | 'Conhecimentos gerais';
export type StudyMode = 'study' | 'flash' | 'game';

export interface Lesson {
  id: string;
  code: string;
  number: number;
  title: string;
  originalTitle: string;
  category: Category;
  edition: string;
  audited: boolean;
  sourcePath: string;
  sourceHash: string;
  legacyUrl: string;
  contentUrl: string;
  storage: { current: string; previous: string | null };
  counts: {
    stages: number;
    stageQuestions: number;
    diagnostic: number;
    boss: number;
    questions: number;
    flashcards: number;
    game: number;
    recall: number;
  };
  legacyQuestionKeys: string[];
  legacyQuestionOptions: Record<string, number>;
}

export interface Catalog {
  schemaVersion: number;
  lessons: Lesson[];
  resources: {
    id: string;
    title: string;
    sourcePath: string;
    sourceHash: string;
    legacyUrl: string;
  }[];
  totals: {
    pages: number;
    lessons: number;
    stages: number;
    questions: number;
    flashcards: number;
    game: number;
    recall: number;
  };
}

export interface Progress {
  answered: number;
  total: number;
  percent: number;
  known: number;
  review: number;
  stage: number;
  started: boolean;
}
