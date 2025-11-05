# Finance Tracking (minimal scaffold)

Run locally:
1. npm install
2. npm run dev     # start server (ts-node-dev)
3. npm test        # run tests

Event organizer API
-------------------

This repo now includes a small event organizer API at `/events`.

Endpoints:
- GET /events — list all events
- POST /events — create an event (body: { title, start, description?, end?, location? })
- GET /events/:id — get a specific event
- PUT /events/:id — update an event
- DELETE /events/:id — delete an event

Try it after `npm install` and `npm run dev`.
