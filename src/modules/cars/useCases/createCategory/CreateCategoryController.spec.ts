import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Create category controller", async () => {
  it("should be able", async () => {
    await request(app).get("/cars/available").expect(200);
  });
});
