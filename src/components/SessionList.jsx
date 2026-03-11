import SessionItem from './SessionItem.jsx';

export default function SessionList({ sessions, onToggle, onRemove }) {
  if (!sessions.length) {
    return (
      <div className="empty-state">
        <h3>No sessions yet</h3>
        <p>Add a focus block to start your study queue.</p>
      </div>
    );
  }

  return (
    <div className="session-list">
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
