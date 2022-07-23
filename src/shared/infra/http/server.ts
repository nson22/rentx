import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express"
import swaggerCategoryFile from "@docs/swagger_category.json"
import "@shared/infra/typeorm"
import "@shared/container"
import { AppError } from "@shared/errors/AppErrors";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerCategoryFile));
app.use(router);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			message: err.message
		})
	}

	response.status(500).json({
		status: "error",
		message: `Internal server error - ${err.message}`
	})
})

app.listen(3333, () => console.log("Server is running 🦄"));
