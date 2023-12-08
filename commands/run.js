const httpProxy = require('http-proxy');
const http = require("http");
const corsMiddleware = require("cors");

function run ({ uri, port, cors }) {
    const proxy = httpProxy.createProxyServer({});

    const server = http.createServer(function(req, res) {
        if (cors) {
            let corsOptions = {}

            if (Array.isArray(cors)) {
                const whitelist = Array.isArray(cors)

                corsOptions.origin = function (origin, callback) {
                    if (whitelist.indexOf(origin) !== -1) {
                        callback(null, true)
                    } else {
                        callback(new Error('Not allowed by CORS'))
                    }
                }
            }

            proxy.on('proxyRes', (proxyRes, req, res) => {
                corsMiddleware(corsOptions)(req, res, () => {});
            });
        }

        proxy.web(req, res, {
            changeOrigin: true,
            target: uri
        });
    });

    console.log(`listening on port ${port}`)

    server.listen(Number(port));
}

module.exports = run
