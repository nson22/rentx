import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specificationsRepositoryInMemory: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name,
    });

    this.specificationsRepositoryInMemory.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specificationsRepositoryInMemory.find(
      (specification) => specification.name === name
    );
  }

  async list(): Promise<Specification[]> {
    return this.specificationsRepositoryInMemory;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specificationsRepositoryInMemory.filter(
      (specification) => ids.includes(specification.id)
    );

    return allSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };
