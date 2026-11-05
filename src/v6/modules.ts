import type { Content, UnitId } from './types.ts';

export type ModuleId = 'fundamentos' | 'cartografia';
export function moduleOf(unit: UnitId): ModuleId {
  return unit === 'fundamentos-geografia' ? 'fundamentos' : 'cartografia';
}
export const moduleTitles: Record<ModuleId, string> = {
  fundamentos: 'Fundamentos, Conceitos e Autores',
  cartografia: 'Cartografia e Geotecnologias',
};
// A view only: persistence always reconciles against the complete approved bank.
export function moduleView(content: Content, module: ModuleId): Content {
  const missions = content.missions.filter((m) => moduleOf(m.unit) === module);
  return {
    ...content,
    units: content.units.filter((u) => moduleOf(u.id) === module),
    missions,
    cards: content.cards.filter((c) => moduleOf(c.unit) === module),
  };
}
