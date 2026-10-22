import type { Category, Lesson } from './types';

export interface LibraryGroup {
  id: string;
  title: string;
  description: string;
  category: Category;
  parts: Record<string, { title: string; description: string }>;
}

// These sources share a topic, not a progress record or an interchangeable content bank.
const groups: LibraryGroup[] = [
  {
    id: 'bncc-ensino-geografia',
    title: 'BNCC e Ensino de Geografia',
    description: 'Da estrutura do currículo à prática em sala de aula.',
    category: 'Educação',
    parts: {
      'lesson-fa532170310d': {
        title: 'BNCC: estrutura e progressão curricular',
        description: 'Competências, habilidades, unidades temáticas e etapas da Educação Básica.',
      },
      'lesson-73811adb3a6b': {
        title: 'Ensino de Geografia: aplicação em sala de aula',
        description: 'Raciocínio geográfico, autores do ensino, planejamento e avaliação.',
      },
    },
  },
  {
    id: 'geopolitica',
    title: 'Geopolítica, Globalização e Ordem Mundial',
    description: 'Dos fundamentos da geopolítica às dinâmicas contemporâneas.',
    category: 'Geografia humana',
    parts: {
      'lesson-96894ebe9dba': {
        title: 'Fundamentos, globalização e ordem mundial',
        description:
          'Estado, território, teorias geopolíticas, organizações e integração regional.',
      },
      'lesson-445e32dc5a8d': {
        title: 'Dinâmicas contemporâneas, tecnologia e recursos estratégicos',
        description: 'China, cadeias globais, semicondutores, energia e disputas por recursos.',
      },
    },
  },
];

export const lessonPart = (lesson: Lesson) =>
  groups.find((group) => group.parts[lesson.id])?.parts[lesson.id];

export interface LibraryEntry {
  id: string;
  lessons: Lesson[];
  group?: LibraryGroup;
}

export function groupLessons(lessons: Lesson[]): LibraryEntry[] {
  const entries: LibraryEntry[] = [];
  const groupedEntries = new Map<string, LibraryEntry>();
  for (const lesson of lessons) {
    const group = groups.find((candidate) => candidate.parts[lesson.id]);
    if (!group) {
      entries.push({ id: lesson.id, lessons: [lesson] });
      continue;
    }
    let entry = groupedEntries.get(group.id);
    if (!entry) {
      entry = { id: group.id, lessons: [], group };
      groupedEntries.set(group.id, entry);
      entries.push(entry);
    }
    entry.lessons.push(lesson);
  }
  return entries;
}
