import { v4 as uuidv4 } from "uuid";

export type EventItem = {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO
  end?: string; // ISO
  location?: string;
  createdAt: string;
};

let store: EventItem[] = [];

export function listEvents(): EventItem[] {
  return store;
}

export function getEvent(id: string): EventItem | undefined {
  return store.find((e) => e.id === id);
}

export function addEvent(payload: {
  title: string;
  description?: string;
  start: string;
  end?: string;
  location?: string;
}): EventItem {
  const ev: EventItem = {
    id: uuidv4(),
    title: payload.title,
    description: payload.description,
    start: payload.start,
    end: payload.end,
    location: payload.location,
    createdAt: new Date().toISOString(),
  };
  store.push(ev);
  return ev;
}

export function updateEvent(id: string, payload: Partial<Omit<EventItem, "id" | "createdAt">>): EventItem | undefined {
  const ev = getEvent(id);
  if (!ev) return undefined;
  if (payload.title !== undefined) ev.title = payload.title;
  if (payload.description !== undefined) ev.description = payload.description;
  if (payload.start !== undefined) ev.start = payload.start;
  if (payload.end !== undefined) ev.end = payload.end;
  if (payload.location !== undefined) ev.location = payload.location;
  return ev;
}

export function deleteEvent(id: string): boolean {
  const before = store.length;
  store = store.filter((e) => e.id !== id);
  return store.length < before;
}

export function clearEventsForTest() {
  store = [];
}
