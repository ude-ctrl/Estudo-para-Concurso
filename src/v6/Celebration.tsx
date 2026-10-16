import { useEffect, useState } from 'react';
import { CheckCircle2, Compass, Flag, Sparkles, X } from 'lucide-react';
import type { SensoryEvent } from './sensory';
import { sensoryPreferences } from './sensory';
import { useV6 } from './context';
import { ExpeditionSummary } from './SensoryUI';

export function Celebration({
  milestone,
  onDismiss,
}: {
  milestone: SensoryEvent | null;
  onDismiss: () => void;
}) {
  const { state } = useV6();
  const immersive = sensoryPreferences(state).experience === 'immersive';
  const [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setSystemReduced(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  const reduce = systemReduced || state.preferences.motion === 'reduce';
  const Icon =
    milestone?.kind === 'boss'
      ? Flag
      : milestone?.kind === 'module'
        ? Compass
        : milestone?.kind === 'error'
          ? Sparkles
          : CheckCircle2;
  useEffect(() => {
    setHovered(false);
    setFocused(false);
  }, [milestone?.id]);
  useEffect(() => {
    // An interactive module summary must remain available while it is being read.
    if (!milestone || milestone.kind === 'module' || hovered || focused) return;
    const timer = setTimeout(onDismiss, 9_000);
    return () => clearTimeout(timer);
  }, [milestone, onDismiss, hovered, focused]);
  // Keep the live region mounted before its text changes for assistive technologies.
  return (
    <div className="celebration-region" role="status" aria-live="polite" aria-atomic="true">
      {milestone && (
        <div
          className={'milestone-toast sensory-' + milestone.kind}
          key={milestone.id}
          data-importance={milestone.importance}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          {immersive && !reduce && milestone.importance >= 8 && (
            <div className="sensory-particles" aria-hidden="true">
              {Array.from({ length: milestone.kind === 'module' ? 12 : 6 }, (_, index) => (
                <i key={index} style={{ '--particle': index } as React.CSSProperties} />
              ))}
            </div>
          )}
          <Icon className="milestone-check" size={30} aria-hidden="true" />
          <div>
            <span className="celebration-kicker">
              {milestone.kind === 'error'
                ? 'Fragilidade → recuperação → domínio estável'
                : milestone.kind === 'boss'
                  ? 'Chefão da Expedição'
                  : milestone.kind === 'module'
                    ? 'Um percurso construído com recuperação'
                    : 'Seu avanço, registrado'}
            </span>
            <strong>{milestone.title}</strong>
            <p>{milestone.description}</p>
            {milestone.xp > 0 && (
              <span className="celebration-xp">
                +{milestone.xp} XP já registrados{milestone.kind === 'block' ? ' no bloco' : ''}
              </span>
            )}
            {milestone.kind === 'module' && <ExpeditionSummary />}
          </div>
          <button className="icon-button" onClick={onDismiss} aria-label="Dispensar celebração">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
