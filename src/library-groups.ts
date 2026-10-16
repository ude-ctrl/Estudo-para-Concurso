import type { Lesson } from './types';

// These sources share a topic, not a progress record or an interchangeable content bank.
const bnccParts: Record<string, { title: string; description: string }> = {
  'lesson-fa532170310d': {
    title: 'BNCC: estrutura e progressão curricular',
    description: 'Competências, habilidades, unidades temáticas e etapas da Educação Básica.',
  },
  'lesson-73811adb3a6b': {
    title: 'Ensino de Geografia: aplicação em sala de aula',
    description: 'Raciocínio geográfico, autores do ensino, planejamento e avaliação.',
  },
};

export const lessonPart = (lesson: Lesson) => bnccParts[lesson.id];

export interface LibraryEntry {
  id: string;
  lessons: Lesson[];
  grouped: boolean;
}

export function groupLessons(lessons: Lesson[]): LibraryEntry[] {
  const entries: LibraryEntry[] = [];
  let bncc: LibraryEntry | undefined;
  for (const lesson of lessons) {
    if (!lessonPart(lesson)) {
      entries.push({ id: lesson.id, lessons: [lesson], grouped: false });
      continue;
    }
    if (!bncc) {
      bncc = { id: 'bncc-ensino-geografia', lessons: [], grouped: true };
      entries.push(bncc);
    }
    bncc.lessons.push(lesson);
  }
  return entries;
}
