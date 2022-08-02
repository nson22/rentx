import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRespository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

container.registerSingleton<ICategoriesRepository>(
	"CategoriesRepository", CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
	"SpecificationsRepository", SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
	"UsersRepository", UsersRepository
);

container.registerSingleton<ICarsRepository>(
	"CarsRepository", CarsRepository
)