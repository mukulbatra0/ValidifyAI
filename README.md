# ValidifyAI — AI Startup Idea Validator

A full-stack MVP that validates startup ideas using AI-powered analysis. Built with React, Node.js, Express, MongoDB, and OpenAI.

## Features

- 🚀 Submit startup ideas with title and description
- 🤖 AI-powered analysis using OpenAI GPT-4o-mini
- 📊 Comprehensive validation reports including:
  - Problem summary
  - Customer persona
  - Market overview
  - Top 3 competitors with differentiation
  - Suggested tech stack
  - Risk level assessment (Low/Medium/High)
  - Profitability score (0-100)
- 📱 Modern glassmorphism UI with dark theme
- ⚡ Real-time analysis status updates
- 💾 Persistent storage with MongoDB

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- CSS3 with glassmorphism design

### Backend
- Node.js with Express
- MongoDB with Mongoose
- OpenAI API (GPT-4o-mini)
- CORS enabled
- Async error handling

## Project Structure

```
ValidifyAI/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app with routing
│   │   └── index.css      # Design system
│   └── vite.config.js
│
└── server/                # Node.js backend
    ├── controllers/       # Request handlers
    ├── models/           # Mongoose schemas
    ├── routes/           # API routes
    ├── services/         # OpenAI integration
    └── index.js          # Express app entry
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Configuration

1. Create `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

2. Update the `.env` file with your credentials:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/validifyai?retryWrites=true&w=majority
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Running the Application

1. Start the backend server:

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

2. In a new terminal, start the frontend:

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Ideas

- `POST /api/ideas` - Create new idea and trigger AI analysis
- `GET /api/ideas` - Get all ideas (sorted by newest)
- `GET /api/ideas/:id` - Get single idea with full report
- `DELETE /api/ideas/:id` - Delete an idea

### Health Check

- `GET /api/health` - Check API status

## Usage

1. Navigate to the Submit page
2. Enter your startup idea title and description
3. Click "Analyze My Idea"
4. You'll be redirected to the detail page where you can watch the analysis progress
5. Once complete, view the comprehensive validation report
6. Access all your ideas from the Dashboard

## Sample Ideas

Try these sample ideas to test the application:

1. **AI-powered meal planner for dietitians** - A SaaS tool that lets dietitians create personalized weekly meal plans for clients using AI.

2. **Remote team water-cooler app** - A Slack-integrated app that facilitates casual, spontaneous video calls between remote team members.

3. **Micro-SaaS for freelance contract generation** - A tool that auto-generates legally-sound contracts using AI with e-signature support.

## Development

### Backend Development

```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development

```bash
cd client
npm run dev  # Vite dev server with HMR
```

### Build for Production

```bash
cd client
npm run build
```

## Environment Variables

### Server (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port number | Yes |
| MONGO_URI | MongoDB connection string | Yes |
| OPENAI_API_KEY | OpenAI API key | Yes |

## Features Checklist

### Backend ✅
- [x] Node.js project initialized
- [x] Express app with MongoDB connection
- [x] Mongoose Idea schema
- [x] OpenAI service integration
- [x] REST API routes and controllers
- [x] Environment configuration

### Frontend ✅
- [x] Vite React project
- [x] Design system with glassmorphism
- [x] API service layer
- [x] Navbar component
- [x] IdeaCard component
- [x] StatusBadge component
- [x] ScoreGauge component
- [x] ReportSection component
- [x] SubmitPage
- [x] DashboardPage
- [x] DetailPage
- [x] App routing

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
