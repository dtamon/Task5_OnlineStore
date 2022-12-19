﻿const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/store",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7036',
        secure: false
    });

    app.use(appProxy);
};
