export default function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">BudgetDeck</p>
        <h1>Track your income and expenses with ease.</h1>
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
