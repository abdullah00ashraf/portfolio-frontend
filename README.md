# Portfolio Frontend: Interactive Systems & Telemetry UI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React: 18](https://img.shields.io/badge/React-18-cyan.svg)](https://react.dev/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-teal.svg)](https://tailwindcss.com/)
[![Backend: Django Core](https://img.shields.io/badge/Backend-Portfolio%20Core-darkgreen.svg)](https://github.com/abdullah00ashraf/portfolio-backend)

**Portfolio Frontend** is the decoupled user interface and interactive technical portfolio showcase for **Abdullah Ashraf**.

It features specialized telemetry cursors, capability radars, interactive chronological timeline layers, and responsive vector visualizers.

---

## 1. UI Components & Architectural Features

- **MonolithicChronographLayer**: Stateful, chronological progression tracking across production software, hackathon milestones, and engineering ventures.
- **CapabilitiesStack**: Multi-axis radar diagrams and interactive capability heatmaps (`capability_radar.svg`, `synergy_heatmap.svg`, `topology_network.svg`).
- **TacticalTelemetryCursor**: Custom high-performance canvas cursor tracking cursor position, coordinates, and interactive hover states.
- **SideVenturesSection & LiquidFooter**: Modular product grid and reactive liquid footer animations.

---

## 2. Directory Structure

```
PROTOFOLIO_FRONTEND/
├── public/
│   └── assets/                     # SVG topology networks & radar visualizers
│       ├── capability_radar.svg
│       ├── synergy_heatmap.svg
│       └── topology_network.svg
├── CapabilitiesStack.jsx           # Technical skill matrix & radar chart
├── LiquidFooter.jsx                # Responsive interactive footer
├── MonolithicChronographLayer.jsx  # Chronological milestone timeline
├── SideVenturesSection.jsx         # Venture and project card grid
├── TacticalTelemetryCursor.jsx     # Canvas HUD cursor
├── index.jsx                       # Main application entrypoint
├── package.json                    # Frontend dependencies
├── .env.example                    # Environment template
└── README.md                       # Documentation
```

---

## 3. Quickstart & Installation

### Prerequisites
- Node.js >= 18.x
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abdullah00ashraf/portfolio-frontend.git
   cd portfolio-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Point VITE_API_URL to your running portfolio-backend instance
   ```

4. **Launch development server:**
   ```bash
   npm run dev
   ```

---

## 4. Connecting to Backend

This frontend connects to the [`portfolio-backend`](https://github.com/abdullah00ashraf/portfolio-backend) Django REST API for dynamic profile, credential, and milestone data ingestion.

---

## 5. License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
