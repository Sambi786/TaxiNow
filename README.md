# 🚕 TaxiNow

> **Premium international taxi & transport platform**  
> A fully functional React single-file app — book rides, manage drivers, track trips in real time.

---

## ✨ Features

### 👤 Passenger Account
- **Book rides** with pickup & destination input
- **4 transport types** — Car, Airport Transfer, Moving Service, Helicopter *(coming soon)*
- **4 car classes** — Economy, Comfort, Premium, XL with live pricing
- **Special options** — Wheelchair accessible & pets allowed toggles
- **International cities** — 12 countries, 30+ cities with currency conversion
- **Live ride tracking** — animated route with progress bar
- **Driver matching** — rating, vehicle, plate, ETA
- **In-ride actions** — Chat, Call, Emergency button
- **Post-ride rating** — 5-star review system
- **Trip history** — all past rides with type, route, price

### 🚗 Driver Account
- **Go online / offline** toggle
- **Incoming ride requests** — accept or decline with fare & passenger info
- **Active ride view** — live timer and current fare
- **Earnings dashboard** — weekly total + daily breakdown
- **Transport type management** — up to 2 active transport types
- **Driver profile** — rating, total trips, active services

### 🌍 International Support
- 12 countries: Norway, Sweden, Denmark, UK, Germany, France, USA, UAE, Saudi Arabia, Japan, Singapore, Canada
- Live currency conversion for all regions
- Airport selector per country (30+ airports)

### 🎨 Design
- **Black & Gold luxury aesthetic** — dark minimal UI with gold accents
- Monospace typography for fares and stats
- CSS grid-based map visualization
- Animated splash screen with concentric rings
- Responsive — optimized for mobile (max 430px)

---

## 🖥️ Demo

| Splash | Login | Booking |
|--------|-------|---------|
| Animated rings + logo | Passenger / Driver tabs | Map + transport selector |

| Driver Dashboard | Earnings | Trip Done |
|-----------------|----------|-----------|
| Online toggle + ride requests | Weekly chart | Star rating + receipt |

---

## 🚀 Getting Started

### Run in JSX Preview (quickest)
1. Download `taxinow-app.jsx`
2. Open in any JSX Preview tool (browser extension or online)
3. The app runs immediately — no build step needed

### Run with Vite (recommended for development)
```bash
npm create vite@latest taxinow -- --template react
cd taxinow
cp taxinow-app.jsx src/App.jsx
npm install
npm run dev
```

### Run with Create React App
```bash
npx create-react-app taxinow
cd taxinow
cp taxinow-app.jsx src/App.js
npm start
```

---

## 📁 Project Structure

```
taxinow-app.jsx          # Entire app — single self-contained file
│
├── Design tokens (G)    # Black & gold color system
├── Static data          # Countries, airports, car classes, drivers
│
├── Shared components
│   ├── Logo             # Luxury taxi logo
│   ├── Avatar           # Gold-bordered initials
│   ├── PrimaryBtn       # Gold CTA button
│   ├── SecondaryBtn     # Outline button
│   ├── GhostBtn         # Subtle ghost button
│   ├── DangerBtn        # Red action button
│   ├── Field            # Underline input field
│   ├── Toggle           # On/off switch
│   ├── Tag / Pill       # Labels & badges
│   ├── Mono             # Monospace text wrapper
│   ├── MapCanvas        # SVG grid map with route animation
│   └── BottomNav        # Bottom navigation bar
│
├── Screens
│   ├── Splash           # Animated intro screen
│   ├── AuthScreen       # Login + register (passenger & driver)
│   ├── BookingScreen    # Main booking flow (main → confirm → tracking → done)
│   ├── HistoryScreen    # Past trips list
│   ├── PassProfile      # Passenger profile & settings
│   ├── AboutScreen      # Company info, services, contact
│   ├── PassengerApp     # Passenger shell + bottom nav
│   └── DriverApp        # Driver shell (dash, earnings, profile, about)
│
└── App (Root)           # Phase manager: splash → auth → app
```

---

## 🧰 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 (via CDN / JSX Preview) |
| Styling | Inline styles (zero dependencies) |
| State | `React.useState`, `React.useEffect`, `React.useRef` |
| Context | `React.createContext` for shared state |
| Build | None required — single `.jsx` file |
| Assets | SVG-only (no external images) |

> **Zero external dependencies.** No npm packages, no CSS files, no build tooling required.

---

## ⚙️ Compatibility

| Environment | Status |
|-------------|--------|
| JSX Preview (browser extension) | ✅ Works |
| Vite + React | ✅ Works |
| Create React App | ✅ Works |
| Next.js (client component) | ✅ Works |
| Direct browser (no bundler) | ❌ Requires Babel transform |

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Passenger | `passasjer@demo.no` | `demo123` |
| Driver | `sjåfør@demo.no` | `demo123` |

Or use the **one-click demo buttons** on the login screen.

---

## 📦 Transport Types

| Type | Icon | Base Price (NOK) | Status |
|------|------|-----------------|--------|
| Car | 🚕 | 89 kr | ✅ Available |
| Airport Transfer | ✈️ | 249 kr | ✅ Available |
| Moving Service | 📦 | 599 kr | ✅ Available |
| Helicopter | 🚁 | 2 499 kr | 🔜 Coming Soon |

---

## 🌐 Supported Countries & Currencies

| Country | Currency | Cities |
|---------|----------|--------|
| 🇳🇴 Norway | NOK | Oslo, Bergen, Stavanger, Trondheim |
| 🇸🇪 Sweden | SEK | Stockholm, Gothenburg, Malmö |
| 🇩🇰 Denmark | DKK | Copenhagen, Aarhus |
| 🇬🇧 UK | GBP | London, Manchester, Edinburgh |
| 🇩🇪 Germany | EUR | Berlin, Munich, Hamburg |
| 🇫🇷 France | EUR | Paris, Lyon, Nice |
| 🇺🇸 USA | USD | New York, Los Angeles, Miami |
| 🇦🇪 UAE | AED | Dubai, Abu Dhabi |
| 🇸🇦 Saudi Arabia | SAR | Riyadh, Jeddah |
| 🇯🇵 Japan | JPY | Tokyo, Osaka, Kyoto |
| 🇸🇬 Singapore | SGD | Singapore |
| 🇨🇦 Canada | CAD | Toronto, Vancouver, Montreal |

---

## 📞 Contact

| Channel | Details |
|---------|---------|
| ✉️ Email | [write here] |
| 📞 Phone | [write here] |
| 🌐 Website | [write here] |

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<div align="center">
  <strong>Built with React · Designed for the world · Zero dependencies</strong><br/>
  <sub>TaxiNow — Always one ride away.</sub>
</div>
