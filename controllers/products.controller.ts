import { Request, Response } from "express";
import fs from "fs";

interface IProduct {
    id: number;
    name: string;
    price: number;
}
export const getProducts = (req: Request, res: Response) => {
    console.log(req.query.name);

    const data = JSON.parse(fs.readFileSync("./db.json").toString());
    // 1. jika ada data dari req.query maka filter datanya
    if (req.query.name) {
        const filter = data.products.filter((val: IProduct) => val.name === req.query.name)
        // 2. Lalu kirim hasil filter sebagai response
        res.status(200).send(filter);
    } else {
        // 3. Tetapi, jika tidak ada data apapun dari req.query maka kirim seluruh data sebagai response
        res.status(200).send(data.products);
    }
}

export const getProductbyName = (req: Request, res: Response) => {
    console.log(req.params.name);

    const data = JSON.parse(fs.readFileSync("./db.json").toString());

    const filter = data.products.filter((val: IProduct) => val.name === req.params.name)
    if (filter.length === 0) {
        res.status(404).send("Data tidak ditemukan")
    } else {
        res.status(200).send(filter[0]);
    }
}