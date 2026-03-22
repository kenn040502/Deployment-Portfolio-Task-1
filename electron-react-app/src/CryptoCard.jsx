import React from 'react';

const ICONS = {
  BTC: '₿',
  ETH: 'Ξ',
  SOL: '◎',
  ADA: '₳',
  XRP: '✕',
};

export default function CryptoCard({ coin, data, loading }) {
  const price = data?.usd;
  const change = data?.usd_24h_change;
  const isPositive = change >= 0;

  return (
    <div style={styles.card}>
      <div style={styles.left}>
        <span style={styles.icon}>{ICONS[coin.symbol]}</span>
        <div>
          <div style={styles.name}>{coin.name}</div>
          <div style={styles.symbol}>{coin.symbol}</div>
        </div>
      </div>
      <div style={styles.right}>
        {loading || price === undefined ? (
          <span style={styles.loading}>Loading...</span>
        ) : (
          <>
            <div style={styles.price}>${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div style={{ ...styles.change, color: isPositive ? '#2ecc71' : '#e74c3c' }}>
              {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1d2e',
    borderRadius: 12,
    padding: '16px 20px',
    border: '1px solid #252840',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  icon: {
    fontSize: 28,
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252840',
    borderRadius: '50%',
    color: '#f7931a',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  symbol: {
    fontSize: 13,
    color: '#8a8fa8',
    marginTop: 2,
  },
  right: {
    textAlign: 'right',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  change: {
    fontSize: 13,
    marginTop: 4,
  },
  loading: {
    color: '#8a8fa8',
    fontSize: 14,
  },
};
