import { localDay, streak } from './engine.ts';
import type { Content, State } from './types.ts';
import { expeditionComplete, missionComplete } from './sensory.ts';

export interface Milestone {
  id: string;
  title: string;
  description: string;
}

export function describeMilestone(id: string, content: Content): Milestone {
  const [kind, key] = id.split(':');
  const unit = content.units.find((u) => u.id === key);
  const mission = content.missions.find((m) => m.id === key);
  const concept = content.concepts.find((c) => c.id === key);
  const copy: Record<string, [string, string]> = {
    mission: [
      'Checkpoint alcançado',
      `${mission?.title || 'Missão'}: leitura completa e recuperação registradas. Conclusão do percurso não significa domínio.`,
    ],
    module: [
      'Expedição Cartográfica concluída',
      'As três unidades tiveram leitura, recuperação e Chefão superado. Seu percurso está completo; a estimativa de domínio e as revisões continuam independentes.',
    ],
    unit: [
      'Percurso da unidade concluído',
      `${unit?.title || 'Unidade'}: todas as explicações registradas e recuperação em cada missão. A retenção continua sendo verificada após intervalos.`,
    ],
    boss: [
      'Chefão superado',
      `${unit?.title || 'Unidade'}: rodada completa com pelo menos 80% de acertos. O resultado orienta sua revisão; ainda não comprova retenção.`,
    ],
    reviews: [
      'Revisões vencidas em dia',
      `${unit?.title || 'Unidade'}: os cartões vencidos foram revisados e não há pendências agendadas nesta unidade agora.`,
    ],
    error: [
      'Erro convertido em domínio',
      `${concept?.name || 'Um raciocínio'}: recuperação confirmada em outro contexto e após intervalos. Esse avanço veio de evidência de aprendizagem.`,
    ],
    streak: [
      `${key} dias de ritmo`,
      'Uma sequência de dias com prática significativa. Seu histórico continua com você nas retomadas.',
    ],
  };
  const [title, description] = copy[kind] || [
    'Marco de aprendizagem',
    'Seu progresso foi registrado.',
  ];
  return { id, title, description };
}

function studied(content: Content, state: State, unit: string) {
  const missions = content.missions.filter((m) => m.unit === unit);
  return (
    missions.length > 0 &&
    missions.every(
      (m) => m.sections.every((s) => !!state.read[s.id]) && !!state.awards['mission:' + m.id],
    )
  );
}

// Called inside the same persistence transaction as the learning action. No XP is awarded here.
// Only transitions earn a milestone; navigation, reloads and imports of old evidence do not.
export function recognize(content: Content, before: State, after: State, at: number): Milestone[] {
  const ids: string[] = [];
  for (const unit of content.units) {
    if (!studied(content, before, unit.id) && studied(content, after, unit.id))
      ids.push('unit:' + unit.id);
  }
  if (after.evidence.length > before.evidence.length) {
    for (const key of Object.keys(after.awards))
      if (key.startsWith('error:') && !before.awards[key]) ids.push(key);
    if (after.significantDays.includes(localDay(at))) {
      const days = streak(after, at);
      for (const mark of [3, 7, 14, 30, 60, 90])
        if (days >= mark && streak(before, at) < mark) ids.push('streak:' + mark);
    }
  }
  const session = after.session;
  const completed =
    session &&
    session.ids.length > 0 &&
    session.position >= session.ids.length &&
    before.session?.id === session.id &&
    before.session.position < session.ids.length;
  if (completed && session.kind === 'questions' && session.pool === 'chefao') {
    const answers = after.evidence.filter((e) => e.context === session.id && e.kind === 'boss');
    const unit = content.questions.find((q) => q.id === session.ids[0])?.unit;
    const required = content.questions.filter((q) => q.unit === unit && q.roles.includes('chefao'));
    if (
      unit &&
      required.length > 0 &&
      required.every((q) => session.ids.includes(q.id)) &&
      session.ids.every((id) => answers.some((e) => e.item === id)) &&
      session.ids.filter((id) => answers.find((e) => e.item === id)?.correct).length /
        session.ids.length >=
        0.8
    )
      ids.push('boss:' + unit);
  }
  if (session?.kind === 'cards' && after.evidence.length > before.evidence.length) {
    const unit = content.cards.find((c) => c.id === session.ids[0])?.unit;
    const cards = content.cards.filter((c) => c.unit === unit);
    const wasDue = cards.some(
      (c) =>
        before.reviews[c.id]?.due <= at &&
        before.reviews[c.id]?.last > 0 &&
        before.reviews[c.id]?.reviews > 0,
    );
    const stillDue = cards.some((c) => after.reviews[c.id]?.due <= at);
    if (unit && wasDue && !stillDue) ids.push('reviews:' + unit + ':' + localDay(at));
  }
  for (const mission of content.missions)
    if (!missionComplete(mission, before) && missionComplete(mission, after))
      ids.push('mission:' + mission.id);
  if (!expeditionComplete(content, before) && expeditionComplete(content, after, ids))
    ids.push('module:cartografia');
  const earned = [...new Set(ids)].filter((id) => after.milestones?.[id] === undefined);
  if (earned.length) {
    after.milestones ??= {};
    for (const id of earned) after.milestones[id] = at;
  }
  return earned.map((id) => describeMilestone(id, content));
}
