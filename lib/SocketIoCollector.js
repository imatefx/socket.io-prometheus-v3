"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("./metrics");
const helpers_1 = require("./helpers");
class SocketIoCollector {
    static collectSocketIoMetrics(io) {
        io.on('connect', (socket) => {
            SocketIoCollector.collectConcurrentConnections(socket);
            SocketIoCollector.collectTotalSentsMessages(socket, io);
            SocketIoCollector.collectTotalReceivedMessages(socket, io);
        });
    }
    static collectConcurrentConnections(socket) {
        socket.on('disconnect', () => {
            metrics_1.default.concurrentConnections.dec();
        });
        metrics_1.default.concurrentConnections.inc();
    }
    static collectTotalSentsMessages(socket, io) {
        const orgEmit = socket.emit;
        socket.emit = (event, ...args) => {
            metrics_1.default.totalSentsEvents.inc();
            metrics_1.default.totalSentsBytes.inc(helpers_1.default.dataToBytes(args));
            return orgEmit.apply(socket, [event, ...args]);
        };
        const orgServerEmit = io.emit;
        io.emit = (event, ...args) => {
            metrics_1.default.totalSentsEvents.inc();
            metrics_1.default.totalSentsBytes.inc(helpers_1.default.dataToBytes(args));
            return orgServerEmit.apply(io, [event, ...args]);
        };
    }
    static collectTotalReceivedMessages(socket, io) {
        socket.onAny((...args) => {
            const [eventName, message] = args;
            metrics_1.default.totalReceivedEvents.inc();
            metrics_1.default.totalReceivedBytes.inc(helpers_1.default.dataToBytes(message));
        });
    }
}
exports.default = SocketIoCollector;
