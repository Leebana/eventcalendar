import { Router, Request, Response } from "express";
import { addEvent, listEvents, getEvent, deleteEvent, updateEvent } from "../services/eventService";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(listEvents());
});

router.get("/:id", (req: Request, res: Response) => {
  const ev = getEvent(req.params.id);
  if (!ev) return res.status(404).json({ error: "not found" });
  res.json(ev);
});

router.post("/", (req: Request, res: Response) => {
  const { title, description, start, end, location } = req.body;
  if (!title || !start) return res.status(400).json({ error: "title and start are required" });
  const ev = addEvent({ title, description, start, end, location });
  res.status(201).json(ev);
});

router.put("/:id", (req: Request, res: Response) => {
  const updated = updateEvent(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "not found" });
  res.json(updated);
});

router.delete("/:id", (req: Request, res: Response) => {
  const ok = deleteEvent(req.params.id);
  res.status(ok ? 204 : 404).end();
});
