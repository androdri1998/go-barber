import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: process.env.CACHE_DRIVER || 'redis',

  config: {
    redis: {
      host: process.env.CACHE_HOST,
      port: process.env.CACHE_PORT,
      password: process.env.CACHE_PASSWORD,
    },
  },
} as ICacheConfig;
