const httpProxy = require('http-proxy');
const http = require("http");
const cors = require("cors");

function run ({ uri, port }) {
    const proxy = httpProxy.createProxyServer({});

    const server = http.createServer(function(req, res) {
        proxy.web(req, res, {
            changeOrigin: true,
            target: uri
        });
        proxy.on('proxyRes', (proxyRes, req, res) => {
            cors(/* CORS OPTIONS */)(req, res, () => { });
        });
    });

    console.log(`listening on port ${port}`)

    server.listen(Number(port));
}

module.exports = run
