"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    host: process.env.REDIS_HOST, // e.g., "redis-14758.c256.us-east-1-2.ec2.redns.redis-cloud.com"
    port: Number(process.env.REDIS_PORT), // e.g., 14758
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null, // <-- this is required by BullMQ v5
    enableReadyCheck: true,
});
