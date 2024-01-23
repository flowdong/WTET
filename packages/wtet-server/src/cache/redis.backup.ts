// import { RedisService } from '@liaoliaots/nestjs-redis';
// import { Injectable } from '@nestjs/common';
// import { Redis } from 'ioredis';
//
// @Injectable()
// export class RedisRepository {
//   private redisClient: Redis;
//
//   constructor(private readonly redisService: RedisService) {
//     this.redisClient = this.redisService.getClient();
//   }
//
//   /**
//    * 加锁
//    * @param key
//    * @param ttl
//    */
//   public async lock(key: string, ttl = 1) {
//     key += ':lock';
//     const res = await this.redisClient.set(key, 'Y', 'EX', ttl, 'NX');
//     return res === 'OK';
//   }
//
//   /**
//    * 释放锁
//    * @param key
//    */
//   public unlock(key: string) {
//     key += ':lock';
//     this.redisClient.del(key);
//   }
//
//   /**
//    * 删除单个key
//    * @param key
//    */
//   public del(key: string) {
//     this.redisClient.del(key);
//   }
//
//   /**
//    * 获取单个number数据
//    * @param key
//    */
//   public async getNumber(key: string) {
//     return Number(this.getString(key));
//   }
//
//   /**
//    * 设置单个number数据
//    * @param key
//    * @param value
//    * @param ttl
//    */
//   public setNumber(key: string, value: number, ttl: number) {
//     this.redisClient.setex(key, ttl, value);
//   }
//
//   public async getString(key: string) {
//     return this.redisClient.get(key);
//   }
//
//   public setString(key: string, value: string, ttl: number) {
//     this.redisClient.setex(key, ttl, value);
//   }
//
//   /**
//    * 设置hash的field
//    * @param key
//    * @param field
//    * @param value
//    * @param ttl
//    */
//   public setAttr(
//     key: string,
//     field: string,
//     value: string | number,
//     ttl: number | string,
//   ) {
//     this.redisClient
//       .multi({ pipeline: true })
//       .hset(key, field, value)
//       .expire(key, ttl);
//   }
//
//   /**
//    * 移除hash的field
//    * @param key
//    * @param field
//    * @returns
//    */
//   public removeAttr(key: string, field: string) {
//     return this.redisClient.hdel(key, field);
//   }
//
//   /**
//    * 获取hash的field
//    * @param key
//    * @param field
//    * @returns
//    */
//   public getAttr(key: string, field: string) {
//     return this.redisClient.hget(key, field);
//   }
//
//   /**
//    * 给hash属性增加整数值
//    * @param key
//    * @param field
//    * @param value
//    * @param ttl
//    */
//   public async incrAttr(
//     key: string,
//     field: string,
//     value: string | number,
//     ttl: number | string,
//   ) {
//     const res = await this.redisClient.hincrby(key, field, value);
//     this.redisClient.expire(key, ttl);
//     return res;
//   }
//
//   /**
//    * 给hash属性增加小数值
//    * @param key
//    * @param field
//    * @param value
//    * @param ttl
//    */
//   public async incrFloatAttr(
//     key: string,
//     field: string,
//     value: string | number,
//     ttl: number | string,
//   ) {
//     const res = await this.redisClient.hincrbyfloat(key, field, value);
//     this.redisClient.expire(key, ttl);
//     return res;
//   }
//
//   /**
//    * 获取hash多个属性
//    * @param key
//    * @param fields
//    */
//   public async getAttrs(key: string, fields: string[] = null) {
//     const res = await this.redisClient.hmget(key, ...fields);
//     return new Map(fields.map((item, i) => [item, res[i]]));
//   }
//
//   /**
//    * 获取hash所有
//    * @param key
//    */
//   public async getAllAttrs(key: string) {
//     return this.redisClient.hgetall(key);
//   }
//
//   /**
//    * 获取列表
//    * @param key
//    * @param start
//    * @param end
//    */
//   public async getList(key: string, start: number, end: number) {
//     return this.redisClient.lrange(key, start, end);
//   }
//
//   /**
//    * 获取Set集合中的所有内容
//    * @param key
//    */
//   public getSetItems(key: string) {
//     return this.redisClient.smembers(key);
//   }
//
//   public async hasSetItem(key: string, item: string) {
//     const result = await this.redisClient.sismember(key, item);
//     return result === 1;
//   }
//
//   /**
//    * 向Set集合中增加一个堆值
//    * @param key
//    * @param items
//    * @param ttl
//    * @returns
//    */
//   public async addSetItems(key: string, items: string[], ttl: number) {
//     return new Promise((resolve, reject) => {
//       this.redisClient
//         .multi()
//         .sadd(key, items)
//         .expire(key, ttl)
//         .exec((err, result) => {
//           if (err) {
//             reject(err);
//           } else {
//             const flag = result.every((v) => v[1] === 1);
//             resolve(flag ? 'ok' : 'failed');
//           }
//         });
//     });
//   }
//
//   /**
//    * 添加列表项并trim长度
//    * @param key
//    * @param items
//    * @param ttl
//    * @param size
//    * @param limitNum
//    */
//   public addItems(
//     key: string,
//     items: string[],
//     ttl: number,
//     size = 20,
//     limitNum = 500,
//   ) {
//     return this.redisClient
//       .multi()
//       .lpush(key, ...items)
//       .llen(key)
//       .expire(key, ttl)
//       .exec((err, result) => {
//         const len = result[1][1] as number;
//         if (len > limitNum) {
//           this.redisClient.ltrim(key, 0, size - 1);
//         }
//       });
//   }
//
//   /**
//    * 判断某个值是否已经存在于列表中
//    * @param key
//    * @param item
//    * @returns
//    */
//   public async hasItem(key: string, item: string) {
//     const result = await this.redisClient.lrange(key, 0, -1);
//     return result.includes(item);
//   }
//
//   /**
//    * 添加单个列表项并trim长度
//    * @param key
//    * @param item
//    * @param ttl
//    * @param size
//    * @param limitNum
//    */
//   public addItem(
//     key: string,
//     item: string,
//     ttl: number,
//     size = 20,
//     limitNum = 500,
//   ) {
//     return this.addItems(key, [item], ttl, size, limitNum);
//   }
// }
