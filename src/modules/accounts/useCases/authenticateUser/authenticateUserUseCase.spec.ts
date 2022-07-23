import { AppError } from "@shared/errors/AppErrors";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemoey";
import { CreateUserUserCase } from "@modules/accounts/useCases/createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/authenticateUserUseCase";

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

	it("should be not possible to authenticate a non existing user", () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "",
				password: ""				
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be not possible to authenticate an existing user without a valid password", () => {
		expect(async () => {
			const user: ICreateUsersDTO = {
				name: "Fake user",
				email: "fake@fake.com",
				password: "fake",
				driver_license: "0000"
			}
			
			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: "fake@fake.com",
				password: "Not given"				
			});
		}).rejects.toBeInstanceOf(AppError);
	});

});