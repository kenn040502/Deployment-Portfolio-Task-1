import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import CryptoCard from './CryptoCard.jsx';
import PriceChart from './PriceChart.jsx';

const COINS = [
  { id: 'bitcoin',  symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana',   symbol: 'SOL', name: 'Solana' },
  { id: 'cardano',  symbol: 'ADA', name: 'Cardano' },
  { id: 'ripple',   symbol: 'XRP', name: 'XRP' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
];

export default function App() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const ids = COINS.map(c => c.id).join(',');
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      setPrices(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch prices. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div style={styles.page}>
      <Header onRefresh={fetchPrices} loading={loading} lastUpdated={lastUpdated} />
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.grid}>
        <PriceChart coins={COINS} prices={prices} />
        {COINS.map(coin => (
          <CryptoCard
            key={coin.id}
            coin={coin}
            data={prices[coin.id]}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#0f1117',
    minHeight: '100vh',
    padding: '0 0 40px 0',
    color: '#fff',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: '0 24px',
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    margin: '16px 0',
    fontSize: 14,
  },
};
