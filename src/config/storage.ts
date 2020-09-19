/* eslint-disable @typescript-eslint/no-explicit-any */
interface IStorageConfig {
  driver: 'disk';

  config: {
    disk: any;
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  config: {
    disk: {},
  },
} as IStorageConfig;
