"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrometheusSocketIo = void 0;
const prom_client_1 = require("prom-client");
const SocketIoCollector_1 = require("./SocketIoCollector");
const os_1 = require("os");
class PrometheusSocketIo {
    constructor(options) {
        this.config = options;
        if (options.collectDefaultMetrics) {
            this.collectDefaultMetrics();
        }
        this.collectSocketIoMetrics();
    }
    static init(options) {
        return new PrometheusSocketIo(options);
    }
    collectDefaultMetrics() {
        prom_client_1.collectDefaultMetrics({
            labels: { SOCKET_SERVER_INSTANCE: os_1.hostname() },
            prefix: "socket_server_"
        });
    }
    collectSocketIoMetrics() {
        SocketIoCollector_1.default.collectSocketIoMetrics(this.config.io);
    }
    async getMetrics() {
        return await prom_client_1.register.metrics();
    }
}
exports.PrometheusSocketIo = PrometheusSocketIo;
