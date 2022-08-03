import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsResositoryInMemory implements ISpecificationsRepository {
  private specificationsResositoryInMemory: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name,
    });

    this.specificationsResositoryInMemory.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specificationsResositoryInMemory.find(
      (specification) => specification.name === name
    );
  }

  async list(): Promise<Specification[]> {
    return this.specificationsResositoryInMemory;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specificationsResositoryInMemory.filter(
      (specification) => ids.includes(specification.id)
    );

    return allSpecifications;
  }
}

export { SpecificationsResositoryInMemory };
