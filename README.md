# Event Organizer API & Web UI

A full-stack event management application with REST API and modern web interface.

## Features

### 🌐 Web UI
- **Modern, Responsive Design** - Beautiful gradient-based interface that works on all devices
- **Full CRUD Operations** - Create, read, update, and delete events through an intuitive interface
- **Real-time Updates** - Instant feedback for all actions with success/error messages
- **Form Validation** - Smart validation with required field checking
- **Event Management** - Sort events by date, view detailed information, manage locations and descriptions

### 🔌 REST API
- **Express.js Backend** - Fast, reliable Node.js server
- **TypeScript** - Type-safe code with full IntelliSense support
- **CORS Enabled** - Ready for frontend integration
- **UUID-based IDs** - Secure, unique event identifiers

### 📦 Deployment Ready
- **Production Build** - Optimized TypeScript compilation
- **Multiple Platform Support** - Pre-configured for Vercel, Render, Railway, and Heroku
- **Environment Configured** - Works in development and production
- **Static File Serving** - Built-in UI hosting

## API Endpoints

### Events
- `GET /events` - List all events
- `POST /events` - Create an event
  - Body: `{ title, start, description?, end?, location? }`
- `GET /events/:id` - Get a specific event
- `PUT /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event

## Quick Start

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser to:
   - **Web UI**: http://localhost:3000
   - **API Base**: http://localhost:3000/events

### Production Deployment
1. Build for production:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

### Deployment Options

#### Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Render (Free)
1. Push code to GitHub
2. Connect repository at render.com
3. Select Node.js web service

#### Railway
```bash
npm install -g @railway/cli
railway login
railway up
```

## Project Structure

```
├── public/                 # Web UI assets
│   ├── index.html         # Main UI page
│   ├── styles.css         # Modern styling
│   └── script.js          # Frontend JavaScript
├── src/
│   ├── index.ts           # Express server setup
│   ├── routes/
│   │   └── events.ts      # Event API routes
│   ├── controllers/
│   │   └── eventController.ts
│   ├── services/
│   │   └── eventService.ts
│   └── models/
│       └── event.ts
├── vercel.json           # Vercel deployment config
├── render.yaml           # Render deployment config
└── Procfile              # Heroku/Railway process config
```

## Technology Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Modern CSS with gradients and animations
- **Icons**: Font Awesome
- **Build**: TypeScript compiler
- **Deployment**: Vercel, Render, Railway, Heroku ready

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run test suite

## License

Private project - All rights reserved.
