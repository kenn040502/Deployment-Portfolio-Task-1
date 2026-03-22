import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  document.body.innerHTML = '<h1 style="color:red">ERROR: root element not found</h1>';
} else {
  try {
    const root = createRoot(container);
    root.render(<App />);
  } catch (e) {
    document.body.innerHTML = '<h1 style="color:red">Render error: ' + e.message + '</h1>';
  }
}
