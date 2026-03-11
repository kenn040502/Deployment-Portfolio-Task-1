export default function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">StudyDeck</p>
        <h1>Plan focused sessions. Ship releases with calm.</h1>
      </div>
      <div className="header-meta">
        <div>
          <span className="pill">Electron + React</span>
          <span className="pill">Auto-update ready</span>
        </div>
        <p className="muted">Desktop deployment portfolio: Task 1</p>
      </div>
    </header>
  );
}
