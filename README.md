# StudyDeck (Electron + React)

StudyDeck is a focused study session planner built with React, Electron, and Vite. It includes a multi-component UI, local state management, and auto-update wiring via `electron-updater`.

## Quick start

```bash
npm install
npm run dev
```

## Build renderer

```bash
npm run build
```

## Package (Windows installer)

```bash
npm run dist
```

Artifacts are generated in `release/`.

## GitHub releases + auto-update

1. Update the `build.publish` section in `package.json` with your GitHub `owner` and `repo`.
2. Create a GitHub repository and push this project.
3. Set a GitHub token with repo permissions:

```bash
setx GH_TOKEN "YOUR_GITHUB_TOKEN"
```

4. Publish a release:

```bash
npm run dist:publish
```

Electron auto-update will run only in packaged builds.
