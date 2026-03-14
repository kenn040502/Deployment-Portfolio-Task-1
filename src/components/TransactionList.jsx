import TransactionItem from './TransactionItem.jsx';

export default function TransactionList({ transactions, onRemove }) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No transactions yet</h3>
        <p>Add your first income or expense above.</p>
      </div>
    );
  }

  return (
    <div className="session-list">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
