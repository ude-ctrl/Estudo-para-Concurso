// Compatibility aliases only: these IDs never become active study records again.
export const legacyCartographyRoutes: Record<string, string> = {
  'lesson-dc8d42e3bace': 'cartografia-fundamentos',
  'lesson-76fbd0d2b7a4': 'cartografia-representacao',
  'lesson-561eab12386b': 'cartografia-representacao',
  'lesson-db774fa4095f': 'geotecnologias',
};
export function canonicalLegacyRoute(hash: string): string | null {
  const [path, query] = hash.replace(/^#/, '').split('?');
  const id = path.match(/^\/missao\/([\w-]+)$/)?.[1];
  const unit = id && legacyCartographyRoutes[id];
  if (!unit) return null;
  const mode = new URLSearchParams(query).get('modo');
  return `/unidade/${unit}/${mode === 'flash' ? 'revisao' : mode === 'game' ? 'treino' : 'estudo'}`;
}
