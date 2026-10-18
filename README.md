# Event Management System

A React-based Event Management System that allows users to explore events, view event details, register for events, and manage their registered events. 

This project was built to demonstrate proficiency in React, Redux Toolkit, React Router, and integrating third-party APIs (Ticketmaster Discovery API).

## 🚀 Features

- **User Authentication:** Simulated registration, login, and logout with state persisting via `localStorage`.
- **Event Exploration:** Fetch and display real-world events using the Ticketmaster Discovery API.
- **Search & Filter:** Search events by keyword and filter by category (Music, Sports, Arts, etc.).
- **Event Details:** View comprehensive information including venue, date, time, and ticket links.
- **Registration Management:** Logged-in users can register for events and manage their schedule.
- **My Events Dashboard:** Protected route displaying categorized upcoming and past registered events.
- **Responsive UI:** Styled cleanly and responsively using Tailwind CSS.

## 🛠️ Technology Stack

- **Frontend:** React.js (Vite)
- **State Management:** Redux Toolkit (`configureStore`, `createSlice`, `createAsyncThunk`)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **API:** Ticketmaster Discovery API v2

## ⚙️ Setup and Execution Instructions

### Prerequisites
- Node.js installed on your machine.
- A free API key from the [Ticketmaster Developer Portal](https://developer.ticketmaster.com/).

### Installation Steps

1. **Clone the repository:**
git clone <https://github.com/SafeeAkmal/Event-Management-System>
cd event-management-system

2. Install dependencies:
Bash
npm install

3. Configure Environment Variables:
Create a .env file in the root of the project and add your Ticketmaster API key:

Code snippet
VITE_TICKETMASTER_API_KEY=your_api_key_here

4. Start the development server:
Bash
npm run dev

5. Open in Browser:
Navigate to http://localhost:5173 to view the application.
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd event-management-system
