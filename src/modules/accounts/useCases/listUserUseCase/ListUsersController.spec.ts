import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List users controller integration testing", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all user", async () => {
    await request(app).post("/users").send({
      name: "User",
      email: "user@rentx.com",
      password: "1234",
      driver_license: "1234",
    });

    expect(async () => {
      await request(app).get("/users");
    }).toHaveLength(0);
  });
});
