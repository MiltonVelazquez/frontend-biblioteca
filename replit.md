# Biblioteca Frontend

## Overview
React + TypeScript + Vite frontend application imported from GitHub. This is a standard Vite template configured to run in the Replit environment.

## Project Setup
- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Dev Server**: Configured to run on 0.0.0.0:5000
- **Package Manager**: npm

## Architecture
- **Frontend**: Single-page React application
- **Entry Point**: src/main.tsx
- **Main Component**: src/App.tsx
- **Build Output**: dist/

## Configuration
- Vite server configured for Replit proxy support (HMR over WSS on port 443)
- Host set to 0.0.0.0 for proper Replit webview integration
- Port 5000 for both dev and preview modes

## Recent Changes (October 28, 2025)
- Configured Vite for Replit environment with proper host and HMR settings
- Installed all npm dependencies
- Set up development workflow
- Configured deployment settings

## Development
Run `npm run dev` to start the development server.

## Build
Run `npm run build` to create production build in dist/ folder.
