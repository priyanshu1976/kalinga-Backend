"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../redis");
exports.attendanceQueue = new bullmq_1.Queue('attendanceQueue', {
    connection: redis_1.redis,
});
