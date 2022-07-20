import express from "express";
import { router } from "./routes";
import "reflect-metadata"
import swaggerUI from "swagger-ui-express"
import swaggerCategoryFile from "./swagger_category.json"
import "./database"

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerCategoryFile));
app.use(router);

app.listen(3333, () => console.log("Server is running 🦄"));
