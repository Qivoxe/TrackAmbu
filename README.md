# 🚑 Ambulance Tracker

**Live ambulance tracking and emergency response coordination system.**

Built for hackathon submission — July 19, 2026.

---

## The Problem

Every minute of ambulance delay reduces survival rates by **7%**. In Indian cities, average response time is **15–20 minutes** due to traffic chaos and zero coordination between ambulances, hospitals, and citizens.

**People die because nobody clears the path.**

---

## Our Solution

An Uber-like live tracking platform that connects **three stakeholders** in real time:

| Stakeholder | Screen     | What They See                                          |
| ----------- | ---------- | ------------------------------------------------------ |
| **Patient** | `/`        | One-tap emergency booking with live ambulance tracking |
| **Driver**  | `/driver`  | Optimized route to patient → nearest hospital          |
| **Citizen** | `/citizen` | Lane-clearing alert when ambulance approaches          |

---

## Key Features

- 📍 **GPS Auto-Location** — No address typing during panic
- 🚨 **8 Emergency Types** — Cardiac, Accident, Breathing, Bleeding, Pregnancy, Stroke, Burns, Other
- 🗺️ **Live Map Tracking** — Real-time ambulance movement with ETA countdown
- 🛣️ **Smart Routing** — Driver gets best route to patient, then to nearest hospital
- 🔔 **Citizen Alerts** — 500m radius notification: "Ambulance approaching, clear left lane"
- 🏥 **Hospital Network** — 5 major Delhi hospitals pre-loaded (AIIMS, Safdarjung, Max, Fortis, BLK-Max)
- ⚡ **Sub-4-minute Response** — Simulated average dispatch time

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

## Demo URLs

| Route      | Role        | What to Show                           |
| ---------- | ----------- | -------------------------------------- |
| `/`        | **Patient** | Book ambulance → watch live tracking   |
| `/driver`  | **Driver**  | Navigation console with route progress |
| `/citizen` | **Citizen** | Lane-clearing alert with countdown     |

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
