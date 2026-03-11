export default function Stats({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p>Total minutes</p>
        <h2>{stats.totalMinutes}</h2>
        <span className="muted">Planned + completed</span>
      </div>
      <div className="stat-card">
        <p>Upcoming sessions</p>
        <h2>{stats.upcoming}</h2>
        <span className="muted">Still on the runway</span>
      </div>
      <div className="stat-card">
        <p>Completed</p>
        <h2>{stats.completed}</h2>
        <span className="muted">Marked as done</span>
      </div>
    </div>
  );
}
