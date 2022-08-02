import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
	})

	it("should be able list all available cars", async () => {

		await carsRepositoryInMemory.create({
			name: "Car name",
			description: "Car description", 
			daily_rate: 0, 
			license_plate: "Car plate", 
			fine_amount: 0, 
			brand: "Car brand", 
			category_id: "Category id"
		})

		const cars = await listAvailableCarsUseCase.execute({})

		expect(cars).toHaveLength(cars.length);

	});

	it("should be able to list all available cars by brand", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car name",
			description: "Car description", 
			daily_rate: 0, 
			license_plate: "Car plate", 
			fine_amount: 0, 
			brand: "Car brand", 
			category_id: "Category id"
		});

		const cars = await listAvailableCarsUseCase.execute({
			brand: "Brand",
		});

		expect(cars).toHaveLength(cars.length);
		expect(cars).toEqual([car])	});

	it("should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car name",
			description: "Car description", 
			daily_rate: 0, 
			license_plate: "Car plate", 
			fine_amount: 0, 
			brand: "Car brand", 
			category_id: "Category id"
		});

		const cars = await listAvailableCarsUseCase.execute({
			name: "Car name",
		});

		expect(cars).toHaveLength(cars.length);
		expect(cars).toEqual([car])	});

	it("should be able to list all available cars by category_id", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car name",
			description: "Car description", 
			daily_rate: 0, 
			license_plate: "Car plate", 
			fine_amount: 0, 
			brand: "Car brand", 
			category_id: "Category id"
		});

		const cars = await listAvailableCarsUseCase.execute({
			category_id: "Category id"
		});

		expect(cars).toHaveLength(cars.length);
		expect(cars).toEqual([car])
	});
})