"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prom_client_1 = require("prom-client");
const Metrics = {
    concurrentConnections: new prom_client_1.Gauge({
        name: 'socket_io_concurrent_connections',
        help: 'Number of current connections'
    }),
    totalSentsEvents: new prom_client_1.Counter({
        name: 'socket_io_total_sents_events',
        help: 'The total number of events sent from the server'
    }),
    totalSentsBytes: new prom_client_1.Counter({
        name: 'socket_io_total_sents_bytes',
        help: 'The total number of bytes sents'
    }),
    totalReceivedEvents: new prom_client_1.Counter({
        name: 'socket_io_total_received_events',
        help: 'The total number of events received from the server'
    }),
    totalReceivedBytes: new prom_client_1.Counter({
        name: 'socket_io_total_received_bytes',
        help: 'The total number of bytes received'
    })
};
exports.default = Metrics;
