'use strict';

const fs = require('fs');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const paths = require('./paths');
const getHttpsConfig = require('./getHttpsConfig');

const host = process.env.HOST || '0.0.0.0';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH;
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function (proxy, allowedHost) {
    return {
        disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        compress: true,
        clientLogLevel: 'none',
        contentBase: paths.appPublic,
        contentBasePublicPath: paths.publicUrlOrPath,
        watchContentBase: true,
        hot: true,
        transportMode: 'ws',
        injectClient: false,
        sockHost,
        sockPath,
        sockPort,
        publicPath: paths.publicUrlOrPath.slice(0, -1),
        quiet: true,
        watchOptions: {
            ignored: ignoredFiles(paths.appSrc),
        },
        https: getHttpsConfig(),
        host,
        overlay: false,
        historyApiFallback: {

            disableDotRule: true,
            index: paths.publicUrlOrPath,
        },
        public: allowedHost,
        proxy,
        before(app, server) {
            app.use(evalSourceMapMiddleware(server));
            app.use(errorOverlayMiddleware());
            if (fs.existsSync(paths.proxySetup)) {
                require(paths.proxySetup)(app);
            }
        },
        after(app) {
            app.use(redirectServedPath(paths.publicUrlOrPath));
            app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
        },
    };
};
