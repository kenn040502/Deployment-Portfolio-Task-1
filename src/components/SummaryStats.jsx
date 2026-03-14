export default function SummaryStats({ stats }) {
  const { totalIncome, totalExpenses, netBalance } = stats;
  const isPositive = netBalance >= 0;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p className="eyebrow">Income</p>
        <h2 className="stat-value income">${totalIncome.toFixed(2)}</h2>
        <span className="muted">Total received</span>
      </div>
      <div className="stat-card">
        <p className="eyebrow">Expenses</p>
        <h2 className="stat-value expense">${totalExpenses.toFixed(2)}</h2>
        <span className="muted">Total spent</span>
      </div>
      <div className="stat-card">
        <p className="eyebrow">Net Balance</p>
        <h2 className={`stat-value ${isPositive ? 'income' : 'expense'}`}>
          {isPositive ? '' : '-'}${Math.abs(netBalance).toFixed(2)}
        </h2>
        <span className="muted">{isPositive ? 'Surplus' : 'Deficit'}</span>
      </div>
    </div>
  );
}
