import { format, formatDistanceToNow } from 'date-fns';

export default function SessionItem({ session, onToggle, onRemove }) {
  const scheduledDate = new Date(session.scheduledFor);
  const scheduledLabel = format(scheduledDate, 'EEE, MMM d • h:mm a');
  const relative = formatDistanceToNow(scheduledDate, { addSuffix: true });

  return (
    <article className={`session-card ${session.status === 'done' ? 'done' : ''}`}>
      <div>
        <p className="session-subject">{session.subject}</p>
        <h3>{session.title}</h3>
        <p className="session-meta">
          {session.minutes} min · {scheduledLabel} · {relative}
        </p>
      </div>
      <div className="session-actions">
        <button type="button" onClick={() => onToggle(session.id)}>
          {session.status === 'done' ? 'Reopen' : 'Complete'}
        </button>
        <button type="button" className="danger" onClick={() => onRemove(session.id)}>
          Remove
        </button>
      </div>
    </article>
  );
}
