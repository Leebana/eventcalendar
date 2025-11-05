import request from "supertest";
import app from "../src/index";
import { clearEventsForTest } from "../src/services/eventService";

describe("events API", () => {
  beforeEach(() => clearEventsForTest());

  it("creates and lists events", async () => {
    const createRes = await request(app)
      .post("/events")
      .send({ title: "Meeting", start: new Date().toISOString(), description: "Team sync" })
      .expect(201);
    expect(createRes.body.id).toBeDefined();

    const listRes = await request(app).get("/events").expect(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.find((e: any) => e.id === createRes.body.id)).toBeTruthy();
  });

  it("returns 400 on missing fields", async () => {
    await request(app).post("/events").send({ title: "No start" }).expect(400);
  });
});
