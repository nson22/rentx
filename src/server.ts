import express from "express";
import { categoriesRouter } from "./routes/categories.routes";

const app = express();

app.use(express.json())
app.use('/categories', categoriesRouter)

app.get('/', (resquest, response) => {
    return response.json({message: "🦄" })
})

app.listen(3333, () => console.log("Server is running 🦄"));