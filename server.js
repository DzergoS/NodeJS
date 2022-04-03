const http = require('http');
const fs = require('fs');
const {notifications} = require("./utils/Notifications");

const PORT = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    console.log(`[Request] url: `, req.url);
    notifications.emit("request-url", req.url);

    if(req.url === "/favicon.ico")
        fs.createReadStream("./assets/favicon.ico").pipe(res);

    if(req.url === "/")
        fs.createReadStream("./index.html").pipe(res);

    else res.end();
})

server.listen(PORT, () => {
    console.log(`Server is serving on http://localhost:${PORT}`);
});