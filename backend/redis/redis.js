import Redis from "ioredis";

export const redisClient = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 1,
  connectTimeout: 10000,
});

redisClient.on("connect", () => {
  console.log("✅ Redis Connected");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Ready");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});
