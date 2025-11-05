import request from "supertest";
import app from "../src/index";

describe("transactions API", () => {
  it("creates and lists transactions", async () => {
    const createRes = await request(app)
      .post("/transactions")
      .send({ title: "Coffee", amount: 3.5, type: "expense" })
      .expect(201);
    expect(createRes.body.id).toBeDefined();

    const listRes = await request(app).get("/transactions").expect(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.find((t: any) => t.id === createRes.body.id)).toBeTruthy();
  });

  it("returns 400 on bad payload", async () => {
    await request(app).post("/transactions").send({ title: "bad" }).expect(400);
  });
});
