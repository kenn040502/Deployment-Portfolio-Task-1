import { useEffect, useMemo, useReducer, useState } from 'react';
import Header from './components/Header.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';
import SummaryStats from './components/SummaryStats.jsx';
import CategoryBreakdown from './components/CategoryBreakdown.jsx';
import UpdateBanner from './components/UpdateBanner.jsx';
import './App.css';

const storageKey = 'budgetdeck:transactions';

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state];
    case 'remove':
      return state.filter((t) => t.id !== action.payload);
    case 'clearAll':
      return [];
    default:
      return state;
  }
}

function initTransactions() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (error) {
    console.error('Failed to parse saved transactions', error);
  }
  return [];
}

export default function App() {
  const [transactions, dispatch] = useReducer(reducer, [], initTransactions);
  const [filter, setFilter] = useState('all');
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (!window.electronAPI?.onUpdateStatus) return undefined;
    const unsubscribe = window.electronAPI.onUpdateStatus((payload) => {
      setUpdateStatus(payload);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filteredTransactions = useMemo(() => {
    if (filter === 'income') return transactions.filter((t) => t.type === 'income');
    if (filter === 'expense') return transactions.filter((t) => t.type === 'expense');
    return transactions;
  }, [transactions, filter]);

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, netBalance };
  }, [transactions]);

  const categoryBreakdown = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const handleAdd = (payload) => dispatch({ type: 'add', payload });
  const handleRemove = (id) => dispatch({ type: 'remove', payload: id });
  const handleClearAll = () => dispatch({ type: 'clearAll' });

  return (
    <div className="app-shell">
      <Header />
      <UpdateBanner
        status={updateStatus}
        onInstall={() => window.electronAPI?.installUpdate?.()}
      />
      <main className="app-main">
        <section className="panel panel-primary">
          <SummaryStats stats={stats} />
          <TransactionForm onAdd={handleAdd} />
        </section>

        <section className="panel panel-secondary">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Ledger</p>
              <h2>Transactions</h2>
            </div>
            <div className="filter-group">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
                type="button"
              >
                All
              </button>
              <button
                className={filter === 'income' ? 'active' : ''}
                onClick={() => setFilter('income')}
                type="button"
              >
                Income
              </button>
              <button
                className={filter === 'expense' ? 'active' : ''}
                onClick={() => setFilter('expense')}
                type="button"
              >
                Expenses
              </button>
            </div>
          </div>

          <TransactionList
            transactions={filteredTransactions}
            onRemove={handleRemove}
          />

          <div className="panel-footer">
            <button className="ghost" onClick={handleClearAll} type="button">
              Clear all
            </button>
            <span className="muted">{transactions.length} total transactions</span>
          </div>

          {categoryBreakdown.length > 0 && (
            <CategoryBreakdown breakdown={categoryBreakdown} total={stats.totalExpenses} />
          )}
        </section>
      </main>
    </div>
  );
}
