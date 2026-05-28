import config from './config.js';
import { createClient } from 'redis';

const redisClient  = createClient({
    url: config.REDIS_URL,
})

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect("Redis connection established successfully");

export default redisClient;