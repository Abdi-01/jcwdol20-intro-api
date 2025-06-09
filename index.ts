import http from "http";
import fs from "fs";
// Define API port
const PORT: number = 2066;

// Define API config
const server = http.createServer((
    request: http.IncomingMessage, response: http.ServerResponse
) => {
    // check incoming request
    console.log("READ REQUEST", request.method, request.url);
    if (request.method === "GET" && request.url === "/products") {
        // Membaca isi file db.json
        const data = JSON.parse(fs.readFileSync("./db.json").toString());
        console.log(data.products);
        // send response
        response.write(JSON.stringify(data.products));
        response.end();
    } else if (request.method === "GET" && request.url === "/categories") {
        // send response
        response.write("DATA CATEGORIES");
        response.end();
    } else {
        // send response
        response.write("URL NOT FOUND");
        response.end();
    }
})

// Run server
server.listen(PORT, () => {
    console.log(`API Running at http://localhost:${PORT}`);
})