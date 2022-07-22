import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemoey";
import { CreateUserUserCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

describe("Authenticate an user", () => {
	let userRepositoryInMemory: UsersRepositoryInMemory;
	let authenticateUserUseCase: AuthenticateUserUseCase;
	let createUserUseCase: CreateUserUserCase;

	beforeAll(() => {
		userRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
		createUserUseCase = new CreateUserUserCase(userRepositoryInMemory);

	});

	it("should be possible create a token for an user", async () => {
		const user: ICreateUsersDTO = {
			name: "Fake user",
			email: "fake@fake.com",
			password: "fake",
			driver_license: "0000"
		}

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password
		});

		expect(result).toHaveProperty("token");
	});
});