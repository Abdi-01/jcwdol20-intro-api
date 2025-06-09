import express, { Application, Request, Response } from "express";
import fs from "fs";
// Define API port
const PORT: number = 2066;

// Define API config
const server: Application = express();

// Define req methode and url
server.get("/products", (request: Request, response: Response) => {
    const data = JSON.parse(fs.readFileSync("./db.json").toString());

    response.status(200).send(data.products);
});

server.get("/categories", (req: Request, res: Response) => {
    const data = JSON.parse(fs.readFileSync("./db.json").toString());

    res.status(200).send(data.categories);
})

// Run server
server.listen(PORT, () => {
    console.log(`API RUNNING at http://localhost:${PORT}`);
})