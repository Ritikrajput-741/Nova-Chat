import { redisClient } from "../redis/redis.js";

export const rateLimiter = async (req, res, next) => {
  const key = `user:${req.ip}`;

  const requests = await redisClient.incr(key);

  if (requests === 1) {
    await redisClient.expire(key, 60);
  }

  if (requests > 5) {
    return res.status(429).json({
      success: false,
      message: "Too many requests! Try again after 1 minute.",
    });
  }

  next();
};
