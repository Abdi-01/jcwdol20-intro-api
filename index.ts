import express, { Application, NextFunction, Request, response, Response } from "express";
import fs from "fs";
// Define API port
const PORT: number = 2066;

// Define API config
const server: Application = express();

server.use(express.json()); // untuk membaca data req.body

// import router config
import productsRouter from "./routers/products.router";

interface IProduct {
    id: number;
    name: string;
    price: number;
}

// Define req methode and url
server.use("/products", productsRouter);

server.get("/categories", (req: Request, res: Response) => {
    const data = JSON.parse(fs.readFileSync("./db.json").toString());

    res.status(200).send(data.categories);
})

// Run server
server.listen(PORT, () => {
    console.log(`API RUNNING at http://localhost:${PORT}`);
})