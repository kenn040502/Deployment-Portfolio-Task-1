import { format } from 'date-fns';

export default function TransactionItem({ transaction, onRemove }) {
  const { id, description, amount, type, category, date } = transaction;
  const isIncome = type === 'income';

  return (
    <article className={`session-card transaction-card ${isIncome ? 'income-card' : 'expense-card'}`}>
      <div>
        <p className="session-subject">{category}</p>
        <h3>{description}</h3>
        <p className="session-meta">{format(new Date(date), 'EEE, MMM d, yyyy')}</p>
      </div>
      <div className="session-actions">
        <span className={`tx-amount ${isIncome ? 'tx-income' : 'tx-expense'}`}>
          {isIncome ? '+' : '-'}${amount.toFixed(2)}
        </span>
        <button
          type="button"
          className="danger"
          onClick={() => onRemove(id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}
