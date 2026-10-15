import { ERROR_KEY, STATE_KEY, fresh, parseState } from './engine.ts';
import type { State } from './types.ts';
type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;
export class Repository {
  state: State = fresh();
  warning = '';
  readonly store: StorageLike;
  constructor(store: StorageLike) {
    this.store = store;
    try {
      const raw = store.getItem(STATE_KEY);
      if (raw) {
        try {
          this.state = parseState(raw);
        } catch {
          this.warning =
            'O progresso salvo está inválido. O conteúdo continua disponível; a cópia bruta foi preservada para recuperação.';
          store.setItem(STATE_KEY + '.recovery', raw);
        }
      }
    } catch {
      this.warning =
        'Armazenamento indisponível. O progresso desta sessão está só na memória; exporte uma cópia antes de sair.';
    }
  }
  commit(fn: (state: State) => void, at = Date.now()): State {
    let latest = this.state;
    try {
      const raw = this.store.getItem(STATE_KEY);
      if (raw) {
        const saved = parseState(raw);
        if (saved.revision > latest.revision) latest = saved;
      }
    } catch {
      /* The original recovery copy remains untouched. */
    }
    const next = structuredClone(latest);
    fn(next);
    next.revision = latest.revision + 1;
    next.updated = at;
    try {
      this.store.setItem(STATE_KEY, JSON.stringify(next));
      // A replace/import can be recovered independently of the current envelope.
      let mirror: { schema: number; modules: Record<string, unknown> } = { schema: 6, modules: {} };
      try {
        const old = JSON.parse(this.store.getItem(ERROR_KEY) || 'null');
        if (old?.schema === 6 && old.modules && typeof old.modules === 'object') mirror = old;
      } catch {
        /* Rebuild only this derived cache. */
      }
      mirror.modules.cartografia = next.errors;
      try {
        this.store.setItem(ERROR_KEY, JSON.stringify(mirror));
      } catch {
        /* Authoritative errors are also in STATE_KEY. */
      }
      if (!this.warning.includes('inválido')) this.warning = '';
    } catch {
      this.warning =
        'Não foi possível gravar no navegador. O progresso está só nesta sessão; exporte uma cópia antes de sair.';
    }
    this.state = next;
    return next;
  }
  replace(raw: string) {
    const restored = parseState(raw);
    this.store.setItem(STATE_KEY + '.before-restore', JSON.stringify(this.state));
    return this.commit((s) => Object.assign(s, restored, { revision: s.revision }));
  }
  reload() {
    try {
      const raw = this.store.getItem(STATE_KEY);
      if (raw) this.state = parseState(raw);
    } catch {
      this.warning = 'Outra aba gravou um estado inválido. A sessão atual foi mantida.';
    }
    return this.state;
  }
}
export function downloadState(state: State) {
  const url = URL.createObjectURL(
    new Blob(
      [JSON.stringify({ schemaVersion: 6, exportedAt: new Date().toISOString(), state }, null, 2)],
      { type: 'application/json' },
    ),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = 'missao-geo-v6-progresso.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
