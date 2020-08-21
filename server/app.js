const http = require("http");

http.createServer((req, res) => {
    res.setHeader("access-control-allow-origin", "*");
    console.log(res.url);
    res.end("ok");
}).listen(8080);
