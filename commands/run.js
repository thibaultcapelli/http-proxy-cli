const httpProxy = require('http-proxy');
const http = require("http");

function run ({ uri, port }) {
    const proxy = httpProxy.createProxyServer({});

    const server = http.createServer(function(req, res) {
        proxy.web(req, res, {
            changeOrigin: true,
            target: uri
        });
    });

    console.log(`listening on port ${port}`)

    server.listen(Number(port));
}

module.exports = run
