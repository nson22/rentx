import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppErrors";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("Token missing", 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = verify(token, "4e325a659675d10353727d6211db0cf8") as IPayloadDTO;

		const usersRepository = new UsersRepository();

		const user = usersRepository.findById(user_id);

		if (!user) {
			throw new AppError("User does not exists.", 401);
		}

		next();

	} catch (error) {
		throw new AppError("Invalid token.", 401);
	}



}