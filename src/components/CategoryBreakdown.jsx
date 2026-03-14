export default function CategoryBreakdown({ breakdown, total }) {
  return (
    <div className="category-breakdown">
      <p className="eyebrow">Expense Breakdown</p>
      <ul className="breakdown-list">
        {breakdown.map(({ category, amount }) => {
          const pct = total > 0 ? Math.round((amount / total) * 100) : 0;
          return (
            <li key={category} className="breakdown-item">
              <div className="breakdown-header">
                <span>{category}</span>
                <span>
                  ${amount.toFixed(2)}{' '}
                  <span className="muted">({pct}%)</span>
                </span>
              </div>
              <div className="breakdown-bar-bg">
                <div className="breakdown-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
