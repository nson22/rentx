import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car>;

  findByLicensesPlate(license_plate: string): Promise<Car>;

  findAllAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]>;

  findById(id: string): Promise<Car>;

  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
