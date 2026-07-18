# 🚑 Ambulance Tracker

**Real-time ambulance dispatch and emergency response coordination — built to cut India's ambulance response time from 15–20 minutes to under 4.**

Hackathon submission — July 19, 2026

---

## The Problem

Every minute of ambulance delay cuts survival rates by **7%**. In Indian cities, average ambulance response time is **15–20 minutes**, driven by two things: traffic chaos and zero coordination between ambulances, hospitals, and citizens.

**People don't die because help isn't coming. They die because nobody clears the path.**

---

## Our Solution

Ambulance Tracker is an Uber-like live coordination platform connecting three stakeholders in real time, on a single shared map:

| Stakeholder    | Screen     | What They See                                                  |
| -------------- | ---------- | -------------------------------------------------------------- |
| 🧑‍🤝‍🧑 **Patient** | `/`        | One-tap emergency booking with live ambulance tracking and ETA |
| 🚑 **Driver**  | `/driver`  | Optimized route to patient, then to the nearest hospital       |
| 🚗 **Citizen** | `/citizen` | Lane-clearing alert the moment an ambulance is nearby          |

No app download for citizens. No dispatcher phone calls. No guessing.

---

## Key Features

- 📍 **GPS Auto-Location** — no address typing during a panic
- 🚨 **8 Emergency Types** — Cardiac, Accident, Breathing, Bleeding, Pregnancy, Stroke, Burns, Other
- 🗺️ **Live Map Tracking** — real-time ambulance movement with ETA countdown
- 🛣️ **Smart Routing** — best route to patient, then to nearest available hospital
- 🔔 **Citizen Lane-Clearing Alerts** — 500m radius notification: "Ambulance approaching — clear left lane"
- 🏥 **Hospital Network** — 5 major Delhi hospitals pre-loaded (AIIMS, Safdarjung, Max, Fortis, BLK-Max)
- ⚡ **Sub-4-Minute Dispatch** — simulated average response time, down from the 15–20 minute city average

---

## Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Framework | Next.js 14 (App Router)                |
| Language  | TypeScript                             |
| Styling   | Tailwind CSS                           |
| Maps      | Leaflet + OpenStreetMap (CartoDB Dark) |
| Animation | Framer Motion                          |
| Icons     | Lucide React                           |
| Deploy    | Vercel                                 |

---

## Demo Walkthrough

| Route      | Role    | What to Show Judges                                               |
| ---------- | ------- | ----------------------------------------------------------------- |
| `/`        | Patient | Book ambulance → watch live tracking + ETA update                 |
| `/driver`  | Driver  | Navigation console with route progress to patient, then hospital  |
| `/citizen` | Citizen | Lane-clearing alert firing with countdown as ambulance approaches |

**Suggested demo flow:** Open all three routes side by side (three browser windows/tabs). Book an emergency on `/`, then flip to `/driver` to show route optimization kicking in, then to `/citizen` to show the alert firing — judges see the full loop in under 60 seconds.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/ambulance-tracker.git
cd ambulance-tracker
npm install

# Run locally
npm run dev

# Open http://localhost:3000
```

---

## Project Structure

```
ambulance-tracker/
├── app/
│   ├── page.tsx                 # Patient booking screen
│   ├── driver/
│   │   └── page.tsx             # Driver navigation
│   ├── citizen/
│   │   └── page.tsx             # Citizen alert view
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles + Tailwind
├── components/
│   ├── MapComponent.tsx         # Leaflet map with markers
│   ├── EmergencySelector.tsx    # Emergency type grid
│   ├── BookingCard.tsx          # Live booking status
│   ├── DriverPanel.tsx          # Driver dashboard
│   ├── NotificationBanner.tsx   # Alert banner with sound
│   ├── LoadingScreen.tsx        # Splash screen
│   └── StatsCard.tsx            # Stats display
├── lib/
│   ├── mockData.ts              # Hospitals, ambulances, routes
│   └── utils.ts                 # Tailwind helpers
├── types/
│   └── index.ts                 # TypeScript interfaces
├── public/                      # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Screenshots

_(Add screenshots before submission — see `/screenshots`)_

| Patient View                        | Driver View                       | Citizen View                        |
| ----------------------------------- | --------------------------------- | ----------------------------------- |
| ![Patient](screenshots/patient.png) | ![Driver](screenshots/driver.png) | ![Citizen](screenshots/citizen.png) |

---

## Why This Wins

- **Real problem, real numbers** — 7% survival drop per minute isn't a hook, it's the whole pitch.
- **Three-sided coordination** in one build — most ambulance-tracking projects only solve for one stakeholder (usually the patient). This solves for all three, which is the actual bottleneck.
- **Demo-able in under a minute** — three tabs, one story, no setup friction for judges.
- **Believable path to production** — every "Future Scope" item below is an integration, not a rebuild.

---

## Future Scope

- 🔗 Real-time backend with WebSocket connections
- 📡 IoT integration for live ambulance telemetry
- 🤖 AI-driven route optimization using traffic prediction
- 📱 Native mobile apps (React Native)
- 🏛️ Government API integration for official hospital data

---

## Team

- **[Your Name]** — Full Stack Developer

---

## License

MIT License — built with ❤️ for saving lives.

---

> "In an emergency, every second counts. We built the bridge between panic and help."
