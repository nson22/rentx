import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {

    private specifications: Specification[];
    private static INSTANCE: SpecificationRepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationRepository{
        if(!SpecificationRepository.INSTANCE){
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        return SpecificationRepository.INSTANCE;
    }


    create({ name, description }: ICreateSpecificationDTO): void {
        const specifications = new Specification();

        Object.assign(specifications, {
            name,
            description,
            created_at: new Date()
        })

        this.specifications.push(specifications)
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find((specification) => name === specification.name);
        return specification;
    }

    list(): Specification[] {
        return this.specifications;
    }

}

export { SpecificationRepository }