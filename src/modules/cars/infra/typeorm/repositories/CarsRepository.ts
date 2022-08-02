import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

	private repository: Repository<Car>;

	constructor(){
		this.repository = getRepository(Car);
	}

	async create({ 
		name, 
		description, 
		daily_rate, 
		license_plate, 
		fine_amount, 
		brand, 
		category_id }: ICreateCarDTO): Promise<Car> {

		const car = this.repository.create({
			name, 
			description, 
			daily_rate, 
			license_plate, 
			fine_amount, 
			brand, 
			category_id
		});

		await this.repository.save(car);

		return car;
	}
		
	async findByLicensesPlate(license_plate: string): Promise<Car> {
		return await this.repository.findOne({license_plate});
	}

	async findAllAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
		const carsQuery = this.repository
							.createQueryBuilder("cars")
							.where("available = :available", {available: true})
		if(brand){
			carsQuery.andWhere("cars.brand = :brand", {brand})
		}

		if(name){
			carsQuery.andWhere("cars.name = :name", {name})
		}

		if(category_id){
			carsQuery.andWhere("cars.category_id = :category_id", {category_id})
		}

		const cars = await carsQuery.getMany()

		return cars;
	}
}

export { CarsRepository }