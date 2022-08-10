import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateUserUserCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase: CreateUserUserCase;

describe("Create user use case", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUsersUseCase = new CreateUserUserCase(usersRepositoryInMemory);
  });

  it("should be possible to create a new user", async () => {
    const user = await createUsersUseCase.execute({
      name: "Fake user",
      email: "fake@rentax.com",
      password: "1234",
      driver_license: "1234",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be possible to create a new user if user already exists.", async () => {
    const user = await createUsersUseCase.execute({
      name: "Fake user",
      email: "fake@rentax.com",
      password: "1234",
      driver_license: "1234",
    });

    expect(user).toHaveProperty("id");

    expect(async () => {
      await createUsersUseCase.execute({
        name: "Fake user",
        email: "fake@rentax.com",
        password: "1234",
        driver_license: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
