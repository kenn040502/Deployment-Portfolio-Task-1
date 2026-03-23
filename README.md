# CryptoPulse — Electron + React Desktop App

A live cryptocurrency price tracker desktop application built with Electron and React.
Developed as part of **SWE40006 Software Deployment & Evolution** — Deployment Portfolio Task 1.

---

## Overview

CryptoPulse displays real-time prices for Bitcoin, Ethereum, Solana, Cardano, XRP, and Dogecoin fetched from the CoinGecko public API. The app features a dark dashboard UI, a price bar chart, and supports in-app auto-update via `electron-updater`.

---

## Features

- Live cryptocurrency prices fetched from CoinGecko API
- Price bar chart using Chart.js
- 24-hour percentage change indicator per coin
- Refresh button with last-updated timestamp
- Auto-update support via `electron-updater` (v1.0.0 → v1.1.0)
- Custom app icon and name (CryptoPulse)
- Packaged as a Windows installer using Electron Forge + Squirrel

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Electron | Desktop app shell |
| React | UI framework |
| Webpack | Bundler (via electron-forge) |
| axios | HTTP requests to CoinGecko API |
| chart.js + react-chartjs-2 | Price bar chart |
| date-fns | Date/time formatting |
| electron-updater | In-app auto-update |
| electron-forge | Build and packaging |

---

## Project Structure

```
electron-react-app/
├── assets/
│   └── icon.ico              # Custom app icon
├── src/
│   ├── main.js               # Electron main process + auto-updater
│   ├── preload.js            # Preload script
│   ├── renderer.js           # React entry point
│   ├── App.jsx               # Root component, state management
│   ├── Header.jsx            # App title and Refresh button
│   ├── CryptoCard.jsx        # Individual coin price card
│   ├── PriceChart.jsx        # Bar chart using Chart.js
│   ├── index.html            # HTML shell
│   └── index.css             # Global styles
├── forge.config.js           # Electron Forge configuration
├── package.json              # Dependencies and build config
├── webpack.main.config.js
├── webpack.renderer.config.js
└── webpack.rules.js
```

---

## Prerequisites

- Node.js v18 or later
- npm (comes with Node.js)
- Git

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kenn040502/Deployment-Portfolio-Task-1.git
cd Deployment-Portfolio-Task-1/electron-react-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm start
```

### 4. Build installer

```bash
npm run make
```

The installer will be generated at:
```
out/make/squirrel.windows/x64/CryptoPulse-x.x.x Setup.exe
```

---

## Releases

| Version | Description | GitHub Release |
|---|---|---|
| v1.0.0 | Initial release — CryptoPulse with 5 coins, chart, auto-update support | [v1.0.0](https://github.com/kenn040502/Deployment-Portfolio-Task-1/releases/tag/v1.0.0) |
| v1.1.0 | Added Dogecoin (DOGE) to the coin list | [v1.1.0](https://github.com/kenn040502/Deployment-Portfolio-Task-1/releases/tag/v1.1.0) |

---

## Auto-Update

The app uses `electron-updater` to check for updates on startup. When a new version is published to GitHub Releases:

1. The app fetches `latest.yml` from the GitHub release assets
2. If a newer version is found, a dialog notifies the user
3. The update is downloaded in the background
4. The user is prompted to restart and install the update

To publish a new release:

1. Bump the version in `package.json`
2. Run `npm run make`
3. Generate `latest.yml` using the SHA-512 hash script
4. Create a new GitHub Release with the tag (e.g. `v1.2.0`)
5. Upload `Setup.exe`, `full.nupkg`, `RELEASES`, and `latest.yml` as assets

---

## Author

**Kenneth Hui Hong CHUA**
Student ID: 102782494
Swinburne University of Technology
SWE40006 Software Deployment & Evolution
