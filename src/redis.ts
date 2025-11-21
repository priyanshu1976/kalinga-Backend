import IORedis from 'ioredis'

export const redis = new IORedis({
  host: process.env.REDIS_HOST, // e.g., "redis-14758.c256.us-east-1-2.ec2.redns.redis-cloud.com"
  port: Number(process.env.REDIS_PORT), // e.g., 14758
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null, // <-- this is required by BullM
  enableReadyCheck: true,
})
