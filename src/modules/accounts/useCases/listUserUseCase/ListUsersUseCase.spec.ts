import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { ListUsersUseCase } from "./ListUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUsersUseCase: ListUsersUseCase;

describe("List users use case", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it("should be possible to list all empty users", async () => {
    const users = await listUsersUseCase.execute();

    expect(users.length).toEqual(0);
  });

  it("should be possible to list all users", async () => {
    await usersRepositoryInMemory.create({
      name: "List User",
      email: "listuser@rentx.com",
      password: "1234",
      driver_license: "1234",
    });

    const users = await listUsersUseCase.execute();

    expect(users.length).toEqual(1);
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("email");
    expect(users[0]).toHaveProperty("password");
    expect(users[0]).toHaveProperty("driver_license");
  });
});
