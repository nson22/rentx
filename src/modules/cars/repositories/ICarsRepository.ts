import { ICreateCarDTO } from "../dtos/ICreateCarDTO"
import { Car } from "../infra/typeorm/entities/Car"

interface ICarsRepository {
	create({
		name,
		description,
		daily_rate,
		license_plate,
		fine_amount,
		brand,
		category_id
	}: ICreateCarDTO): Promise<Car>;

	findByLicensesPlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository }