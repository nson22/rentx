/* eslint-disable import-helpers/order-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import swaggerUI from "swagger-ui-express";

import swaggerCategoryFile from "@docs/swagger_category.json";
import { AppError } from "@shared/errors/AppErrors";
import createConnection from "@shared/infra/typeorm";

import { router } from "./routes";

import "@shared/container";

createConnection();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerCategoryFile));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
