# Event Management System

A React-based Event Management System that allows users to explore real-world events, view event details, register for events, and manage their schedule. Styled entirely with [@stitches/react](https://stitches.dev/) — a CSS-in-JS library with a Tailwind-equivalent theme system.

---

## ✨ Features

- 🔐 **User Authentication** — Simulated registration, login, and logout with state persisting via `localStorage`
- 🎟️ **Event Exploration** — Fetch and display real-world events using the Ticketmaster Discovery API
- 🔍 **Search & Filter** — Search events by keyword and filter by category (Music, Sports, Arts, etc.)
- 📋 **Event Details** — View comprehensive information including venue, date, time, and ticket links
- 📅 **Registration Management** — Logged-in users can register for events and manage their schedule
- 🗂️ **My Events Dashboard** — Protected route displaying categorized upcoming and past registered events
- 📱 **Responsive UI** — Fully responsive layout using Stitches media query utilities

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) (`configureStore`, `createSlice`, `createAsyncThunk`) |
| Routing | [React Router v7](https://reactrouter.com/) |
| Styling | [@stitches/react](https://stitches.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| API | [Ticketmaster Discovery API v2](https://developer.ticketmaster.com/) |
| Linting | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) |

---

## 📁 Project Structure

```
src/
├── app/
│   └── store.js                   # Redux store
├── assets/                        # Static assets
├── components/
│   ├── Navbar.jsx                 # Top navigation bar
│   ├── ProtectedRoute.jsx         # Auth guard component
│   └── ui/                        # Reusable Stitches UI primitives
│       ├── Button.jsx             # primary / danger / outline / ghost variants
│       ├── Card.jsx               # Padded card container
│       ├── Input.jsx              # Styled input with error state
│       └── index.js               # Barrel export
├── features/
│   ├── auth/
│   │   ├── authSlice.js
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── events/
│   │   ├── components/
│   │   │   ├── EventCard.jsx
│   │   │   └── EventFilters.jsx
│   │   ├── eventsSlice.js
│   │   ├── EventDetailPage.jsx
│   │   └── EventListPage.jsx
│   └── registrations/
│       ├── registrationsSlice.js
│       └── MyEventsPage.jsx
├── globalStyles.js                # Global CSS reset via Stitches globalCss
├── stitches.config.js             # Theme config (colors, spacing, radii, media)
├── App.jsx                        # Root component & routes
└── main.jsx                       # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A free API key from the [Ticketmaster Developer Portal](https://developer.ticketmaster.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SafeeAkmal/Event-Management-System
   cd event-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root of the project and add your Ticketmaster API key:
   ```env
   VITE_TICKETMASTER_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:** Navigate to [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 🎨 Styling Architecture

This project uses **@stitches/react** for all styling (migrated from Tailwind CSS). The design system is defined in [`src/stitches.config.js`](src/stitches.config.js) and mirrors Tailwind CSS's default theme:

- **Colors** — Full palette (slate, gray, red, blue, green, etc.) with shades 50–950
- **Spacing** — Scale 1–96 (1 unit = 4px)
- **Font Sizes** — `xs` → `5xl`
- **Radii** — `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`
- **Shadows** — `sm`, `DEFAULT`, `md`, `lg`, `xl`
- **Breakpoints** — `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)

Global styles (reset, font, body background) are applied via [`src/globalStyles.js`](src/globalStyles.js).

---

## 📄 License

MIT
