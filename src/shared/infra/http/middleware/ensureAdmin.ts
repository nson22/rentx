import { Request, Response, NextFunction} from "express";
import { AppError } from "@shared/errors/AppErrors";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

export async function ensureAdmin(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { id } = request.user;
	
	const userRepository = new UsersRepository();
	const user = await userRepository.findById(id);

	if(!user.isAdmin){
		throw new AppError("User isn't an admin");
	}

	next();
}