import React from 'react';

export default function Header({ onRefresh, loading, lastUpdated }) {
  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>CryptoPulse</h1>
        <p style={styles.subtitle}>Live Cryptocurrency Price Tracker</p>
      </div>
      <div style={styles.right}>
        {lastUpdated && (
          <span style={styles.updated}>Last updated: {lastUpdated}</span>
        )}
        <button style={styles.btn} onClick={onRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 20px',
    borderBottom: '1px solid #1e2130',
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 26,
    color: '#f7931a',
    letterSpacing: 1,
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: 13,
    color: '#8a8fa8',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
  },
  updated: {
    fontSize: 12,
    color: '#8a8fa8',
  },
  btn: {
    padding: '8px 20px',
    fontSize: 14,
    backgroundColor: '#f7931a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
