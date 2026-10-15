import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { Milestone } from './recognition';

export function Celebration({
  milestone,
  onDismiss,
}: {
  milestone: Milestone | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!milestone) return;
    const timer = setTimeout(onDismiss, 9_000);
    return () => clearTimeout(timer);
  }, [milestone, onDismiss]);
  // Keep the live region mounted before its text changes for assistive technologies.
  return (
    <div className="celebration-region" role="status" aria-live="polite" aria-atomic="true">
      {milestone && (
        <div className="milestone-toast" key={milestone.id}>
          <CheckCircle2 className="milestone-check" size={30} aria-hidden="true" />
          <div>
            <strong>{milestone.title}</strong>
            <p>{milestone.description}</p>
          </div>
          <button className="icon-button" onClick={onDismiss} aria-label="Dispensar celebração">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
