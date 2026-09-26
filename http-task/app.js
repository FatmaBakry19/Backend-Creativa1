const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    // GET /home
    if (req.method === "GET" && req.url === "/home") {
        res.end(
            JSON.stringify({
                message: "Welcome to Home"
            })
        );
    }

    // GET /user
    else if (req.method === "GET" && req.url === "/user") {
        res.end(
            JSON.stringify({
                name: "Fatma",
                age: 20
            })
        );
    }

    // GET /product
    else if (req.method === "GET" && req.url === "/product") {
        res.end(
            JSON.stringify({
                name: "Laptop",
                price: 25000
            })
        );
    }

    // POST /data
    else if (req.method === "POST" && req.url === "/data") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const data = JSON.parse(body);

            console.log("Received data:", data);

            res.end(
                JSON.stringify({
                    message: "Data received and stored successfully",
                    data: data
                })
            );
        });
    }

    // Route Not Found
    else {
        res.statusCode = 404;

        res.end(
            JSON.stringify({
                message: "Route Not Found"
            })
        );
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});