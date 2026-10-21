# Pass It On — Community Peer-to-Peer Rental Platform

> **Advanced Web Technologies — Semester Project (Phase 1: Frontend)**  
> Built with React 19, Vite, Lucide Icons, and Vanilla CSS with Claymorphic & Glassmorphic visual aesthetics.

---

## 📌 Project Overview
**Pass It On** is a hyper-local peer-to-peer equipment sharing and rental platform designed for university communities and neighborhoods. It eliminates the single biggest failure point of P2P rentals: **scheduling friction and double bookings**.

### ✨ Core Features (Phase 1)
- **Zero Double-Booking Guarantee:** Intelligent calendar scheduling with real-time overlap collision detection that locks booked dates.
- **Interactive Calendar Picker:** Visual date selection with distinct states for available, selected, booked, and maintenance-blocked days.
- **Transparent Deposit & Escrow Simulation:** Upfront mock escrow security deposit model to protect high-value equipment.
- **Complete 9-Step Booking Lifecycle:**
  1. Requested by Borrower
  2. Accepted by Lender
  3. Mock Deposit Reserved in Escrow
  4. Handover Confirmed (Physical check)
  5. In-Use (Active borrow period)
  6. Return Completed
  7. Deposit Released / Refunded
  8. Reviews & Ratings
  9. Dispute Mediation
- **Moderator Dashboard:** Dispute resolution panel with log auditing and platform health statistics.
- **Glassmorphic & Neumorphic UI:** Modern design system with responsive layouts, smooth micro-interactions, and accessible typography.

---

## 📁 Project Structure

```text
pass_it_on/
├── frontend/                     # React + Vite frontend application
│   ├── public/                   # Static assets, SVG icons, and images
│   ├── src/
│   │   ├── components/           # Reusable UI & Structural Components
│   │   │   ├── layout/           # App-wide structural layout (Navbar, Footer)
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── index.js
│   │   │   └── common/           # Shared reusable atomic UI widgets
│   │   │       ├── Badge.jsx
│   │   │       └── index.js
│   │   ├── pages/                # Top-level route/page views
│   │   │   ├── HomePage.jsx
│   │   │   ├── ItemDetailPage.jsx
│   │   │   ├── BookingLifecyclePage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   └── index.js
│   │   ├── data/
│   │   │   └── mockData.js       # Preloaded listings, bookings, and logs
│   │   ├── App.jsx               # Application router & root shell
│   │   ├── App.css               # Claymorphic & component styles
│   │   ├── index.css             # Design tokens, variables & typography
│   │   └── main.jsx              # React DOM entry point
│   ├── package.json              # Frontend dependencies (React 19, Vite, Lucide)
│   └── vite.config.js            # Vite bundler configuration
├── package.json                  # Root runner scripts (--prefix frontend)
├── .gitignore                    # Root Git exclusions
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (bundled with Node.js)

### Installation
From the root directory:
```bash
# Install frontend dependencies
npm --prefix frontend install
```

### Running Locally
Run the development server from the root:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```
