import express, { Application, NextFunction, Request, response, Response } from "express";
import fs from "fs";
// Define API port
const PORT: number = 2066;

// Define API config
const server: Application = express();

server.use(express.json()); // untuk membaca data req.body

interface IProduct {
    id: number;
    name: string;
    price: number;
}

// Define req methode and url
server.get("/products", (request: Request, response: Response) => {
    console.log(request.query.name);

    const data = JSON.parse(fs.readFileSync("./db.json").toString());
    // 1. jika ada data dari req.query maka filter datanya
    if (request.query.name) {
        const filter = data.products.filter((val: IProduct) => val.name === request.query.name)
        // 2. Lalu kirim hasil filter sebagai response
        response.status(200).send(filter);
    } else {
        // 3. Tetapi, jika tidak ada data apapun dari req.query maka kirim seluruh data sebagai response
        response.status(200).send(data.products);
    }
});

server.get("/products/:name", (request: Request, response: Response) => {
    console.log(request.params.name);

    const data = JSON.parse(fs.readFileSync("./db.json").toString());

    const filter = data.products.filter((val: IProduct) => val.name === request.params.name)
    if (filter.length === 0) {
        response.status(404).send("Data tidak ditemukan")
    } else {
        response.status(200).send(filter[0]);
    }

});

server.post("/products", (req: Request, res: Response) => {
    console.log(req.body);

    // 1. Mengakses data sebelumnya pada db.json
    const data = JSON.parse(fs.readFileSync("./db.json").toString());
    // 2. Menambahkan data baru ke array of object product
    data.products.push(req.body);
    // 3. Menulis ulang isi dari db.json dengan data terbaru menggunakan fs.writeFileSync()
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    // 4. Kirim response dengan pesan Add data berhasil
    res.status(201).send({
        message: "Add data success"
    })
});

server.get("/categories", (req: Request, res: Response) => {
    const data = JSON.parse(fs.readFileSync("./db.json").toString());

    res.status(200).send(data.categories);
})

// Run server
server.listen(PORT, () => {
    console.log(`API RUNNING at http://localhost:${PORT}`);
})