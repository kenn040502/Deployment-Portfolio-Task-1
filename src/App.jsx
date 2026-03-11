import { useEffect, useMemo, useReducer, useState } from 'react';
import Header from './components/Header.jsx';
import SessionForm from './components/SessionForm.jsx';
import SessionList from './components/SessionList.jsx';
import Stats from './components/Stats.jsx';
import UpdateBanner from './components/UpdateBanner.jsx';
import './App.css';

const storageKey = 'studydeck:sessions';

const seedSessions = [
  {
    id: 'seed-1',
    title: 'Electron build rehearsal',
    subject: 'SWE40006',
    minutes: 50,
    scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    status: 'planned',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Release notes pass',
    subject: 'Portfolio',
    minutes: 25,
    scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: 'planned',
    createdAt: new Date().toISOString(),
  },
];

function initSessions() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return seedSessions;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (error) {
    console.error('Failed to parse saved sessions', error);
  }
  return seedSessions;
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state];
    case 'toggle':
      return state.map((session) =>
        session.id === action.payload
          ? {
              ...session,
              status: session.status === 'done' ? 'planned' : 'done',
            }
          : session
      );
    case 'remove':
      return state.filter((session) => session.id !== action.payload);
    case 'clearDone':
      return state.filter((session) => session.status !== 'done');
    default:
      return state;
  }
}

export default function App() {
  const [sessions, dispatch] = useReducer(reducer, [], initSessions);
  const [filter, setFilter] = useState('all');
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (!window.electronAPI?.onUpdateStatus) return undefined;
    const unsubscribe = window.electronAPI.onUpdateStatus((payload) => {
      setUpdateStatus(payload);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filteredSessions = useMemo(() => {
    if (filter === 'planned') return sessions.filter((s) => s.status === 'planned');
    if (filter === 'done') return sessions.filter((s) => s.status === 'done');
    return sessions;
  }, [sessions, filter]);

  const stats = useMemo(() => {
    const totalMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0);
    const completed = sessions.filter((session) => session.status === 'done').length;
    const upcoming = sessions.filter((session) => session.status !== 'done').length;
    return { totalMinutes, completed, upcoming };
  }, [sessions]);

  const handleAddSession = (payload) => {
    dispatch({ type: 'add', payload });
  };

  const handleToggle = (id) => dispatch({ type: 'toggle', payload: id });
  const handleRemove = (id) => dispatch({ type: 'remove', payload: id });
  const handleClearDone = () => dispatch({ type: 'clearDone' });

  return (
    <div className="app-shell">
      <Header />
      <UpdateBanner
        status={updateStatus}
        onInstall={() => window.electronAPI?.installUpdate?.()}
      />
      <main className="app-main">
        <section className="panel panel-primary">
          <Stats stats={stats} />
          <SessionForm onAdd={handleAddSession} />
        </section>

        <section className="panel panel-secondary">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Pipeline</p>
              <h2>Session Queue</h2>
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
                className={filter === 'planned' ? 'active' : ''}
                onClick={() => setFilter('planned')}
                type="button"
              >
                Planned
              </button>
              <button
                className={filter === 'done' ? 'active' : ''}
                onClick={() => setFilter('done')}
                type="button"
              >
                Done
              </button>
            </div>
          </div>
          <SessionList
            sessions={filteredSessions}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
          <div className="panel-footer">
            <button className="ghost" onClick={handleClearDone} type="button">
              Clear completed
            </button>
            <span className="muted">{sessions.length} total sessions</span>
          </div>
        </section>
      </main>
    </div>
  );
}
