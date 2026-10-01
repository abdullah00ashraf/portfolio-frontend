# Portfolio Frontend: Interactive Systems & Telemetry UI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React: 18](https://img.shields.io/badge/React-18-cyan.svg)](https://react.dev/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-teal.svg)](https://tailwindcss.com/)
[![Hugging Face Hub](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-abdullahashraf122-yellow.svg)](https://huggingface.co/abdullahashraf122)
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

## 5. 🤗 Hugging Face Hub Neural Assets & Registries

The portfolio showcases real-time deep learning and spatiotemporal engineering models published under [`abdullahashraf122`](https://huggingface.co/abdullahashraf122):

* **[Sentinel-Mumbai PINN v1](https://huggingface.co/abdullahashraf122/sentinel-mumbai-pinn-v1)** (20.38M params): Physics-Informed Neural Network with Log-Cosh and Hydraulic Lock loss.
* **[Sentinel-V7 Deep Flood LSTM](https://huggingface.co/abdullahashraf122/sentinel-v7-deep-flood-lstm)**: Dual Bi-LSTM flood sequence model.
* **[Aegis ManagerAI SFT Mixture](https://huggingface.co/datasets/abdullahashraf122/aegis-managerai-agentic-sft-mixture)**: 1.68 MB Augmented ChatML dataset with internal `<think>` reasoning traces.
* **[Alaska Arctic Hydrology Matrix](https://huggingface.co/datasets/abdullahashraf122/alaska-arctic-hydrology-matrix)**: 50,000-point spatiotemporal Parquet matrix.
* **[Mumbai Flood Intelligence (2005–2023)](https://huggingface.co/datasets/abdullahashraf122/mumbai-salsette-flood-intelligence-2005-2023)**: 27.84 GB Parquet dataset (633M records).

---

## 6. License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
