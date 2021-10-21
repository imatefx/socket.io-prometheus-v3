import { Counter, Gauge } from 'prom-client';
declare const Metrics: {
    concurrentConnections: Gauge<string>;
    totalSentsEvents: Counter<string>;
    totalSentsBytes: Counter<string>;
    totalReceivedEvents: Counter<string>;
    totalReceivedBytes: Counter<string>;
};
export default Metrics;
