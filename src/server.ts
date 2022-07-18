import express from "express";

const app = express();
app.use(express.json())

app.get('/', (resquest, response) => {
    return response.json({message: "🦄" })
})

app.listen(3333, () => console.log("Server is running 🦄"));