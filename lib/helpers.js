"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers = {
    dataToBytes(data) {
        return new TextEncoder().encode(JSON.stringify(data)).length;
    }
};
exports.default = Helpers;
