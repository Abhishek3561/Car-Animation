# 🏎️ ITZFIZZ — Scroll-Driven Automotive Hero Section Animation

A state-of-the-art recreation and enhancement of the [Car Scroll Animation](https://paraschaturvedi.github.io/car-scroll-animation), built with **GSAP 3.12**, **ScrollTrigger**, **Lenis Smooth Scroll**, **React 18**, **Tailwind CSS**, and the **Web Audio API**.

---

## 🌟 Key Highlights & Features

### 1. 🏁 Hero Section Layout & Geometry
- **Full Viewport Pinning (`pin: '.track'`)**: Pinned luxury speedway viewport that responds to vertical scroll while keeping the animation canvas locked in the active screen.
- **Dynamic Letter-by-Letter Typography**: Letter-spaced headline (`W E L C O M E   I T Z F I Z Z`) styled with high-voltage neon glow, ambient blur, and dynamic glyph lighting.
- **Bento-Grid Impact Metric Cards**:
  - `58%` — *Increase in pick up point use* (Neon Lime accent, YoY telemetry)
  - `23%` — *Decreased in customer phone calls* (Electric Cyan accent, time savings)
  - `99.4%` — *Autonomous telemetry precision & uptime* (Ultraviolet accent, zero dropout)
  - `4.2x` — *Real-time throughput acceleration* (Sunset Orange accent, sub-millisecond)

### 2. 🎬 Initial Page Load Animations
- **Staggered 3D Kinetic Reveal**: Headline letters drop in from the top with `blur` and `y` translation offset at 0.04s stagger.
- **Elastic Metric Cards Pop-in**: Bento stats cards spring in one-by-one with `back.out(1.4)` easing and numbers counter progression.
- **Cinematic Drive-In**: Vehicle glides onto the starting grid with headlight beams warming up.

### 3. ⚡ Scroll-Based Animation (Core Feature)
- **Physics-Interpolated Scrubbing (`scrub: 0.45`)**: Fluid, time-independent scroll synchronization using GSAP ScrollTrigger paired with Lenis momentum scroll.
- **Dynamic Letter Collision Lighting**: As the car travels from left to right, its bumper position dynamically calculates which letters it intersects, igniting them into full white luminescence with neon shadows.
- **Asphalt Laser Trail**: Glowing laser trail and speed streak canvas expand continuously behind the car.
- **Suspension Drift & Tilt**: Real-time velocity calculation adds dynamic chassis tilt (`rotate(±6deg)`) during fast scrolling.
- **Headlight Projection**: Custom SVG radial gradient light cone that illuminates ahead of the vehicle.

### 4. 🎛️ Interactive Experience Studio & Telemetry HUD
- **Procedural Engine Audio Synthesizer**: Built with Web Audio API (zero external audio files needed). Harmonics and RPM pitch scale directly with scroll speed! Includes blow-off valve effects and instant mute toggle.
- **Live Telemetry HUD**: Real-time Speedometer (`0–240 MPH`), Gear Shift Indicator (`1–6, N`), RPM Redline Bar (`0–8,800 RPM`), and G-Force meter.
- **Milestone Scrub Navigation**: Instant jump buttons (`ORIGIN`, `METRIC 1`, `METRIC 2`, `METRIC 3`, `MAX SPEED`) and scrub slider.
- **Cinematic Auto-Pilot Demo**: Press `Auto-Drive` or `Space` to let the site drive and scroll itself hands-free.
- **Experience Studio Customizer**: Modal to customize headline text, switch between vehicles (*McLaren 720S*, *Cyberpunk Hypercar GT*, *Formula Apex Racer*), and change neon glow colors in real-time.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18 + Vite** | High-performance component architecture and fast HMR |
| **GSAP 3.12 (GreenSock)** | ScrollTrigger pinning, scrub interpolation, and timeline orchestration |
| **Lenis (`@studio-freight/lenis`)** | 120 FPS inertial smooth scroll synchronization |
| **Tailwind CSS** | Sleek glassmorphism, responsive grid layouts, and custom neon palettes |
| **Web Audio API** | Procedural dual-oscillator acoustic engine rev synthesis |
| **HTML5 Canvas** | High-speed particle emitter for asphalt tire sparks and speed streaks |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm (v9 or newer)

### 1. Development Server
```bash
cd scroll-car-hero
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Production Build
```bash
npm run build
npm run preview
```

### 3. Standalone Version (Zero Build Dependencies)
A completely self-contained single-file HTML version is provided in `standalone/index.html`. You can open it directly in any web browser without running Node or npm!

---

## 🌐 GitHub Pages Deployment Guide

### Option A: Using `gh-pages` CLI
1. Add `"base": "./"` to your `vite.config.js`.
2. Run:
```bash
npm run build
npx gh-pages -d dist
```

### Option B: GitHub Actions Automatic Deployment
Add `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
```

---

## ⌨️ Keyboard Shortcuts

- <kbd>Space</kbd> or <kbd>P</kbd> — Toggle **Auto-Drive** mode
- <kbd>M</kbd> — Toggle **Procedural Engine Audio**
- <kbd>C</kbd> — Open **Experience Studio Customizer**
- <kbd>1</kbd>–<kbd>5</kbd> — Jump to animation milestone stages

---

## 📂 Project Structure

```
scroll-car-hero/
├── public/
│   └── mclaren-720s.png            # High-res transparent top-view vehicle
├── src/
│   ├── components/
│   │   ├── CarAsset.jsx            # Multi-vehicle renderer (McLaren, Cyber GT, Formula F1)
│   │   ├── CarHeroSection.jsx      # Core pinned track, letter collision, and stats animation
│   │   ├── CustomizerModal.jsx     # Live customization drawer for text, color, vehicle
│   │   ├── FeatureShowcase.jsx     # Technical specs, architecture deep-dive & code snippet
│   │   ├── Navbar.jsx              # Brand header, auto-drive toggle, and audio controls
│   │   ├── ParticleCanvas.jsx      # Canvas-based tire spark and motion streak emitter
│   │   └── TelemetryHUD.jsx        # Bottom HUD with MPH speed, RPM, Gear, G-Force & scrub
│   ├── utils/
│   │   └── audioSynth.js           # Procedural Web Audio API engine rev synthesizer
│   ├── App.jsx                     # Root component with Lenis + GSAP RAF synchronization
│   ├── index.css                   # Custom glow effects, asphalt textures, and glassmorphism
│   └── main.jsx                    # React entry point
├── standalone/
│   ├── index.html                  # Single-file zero-dependency version
│   └── mclaren-720s.png
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```
