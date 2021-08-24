---
title: "Two Forms of Pre-rendering"
date: "2021-04-25"
---

| 命令      | 语法                                                 | 作用                                                 | 参数          | 解释                                                                                                                  | 执行成功                   | 相关命令   |
| --------- | ---------------------------------------------------- | ---------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| set       | set key value [EX seconds][px milliseconds] [NX][xx] | 将字符串值 value 关联到 key                          | EX/PX/NX/XX   | NX,XX:key 不/存在才执行, EX,PX:设置 key 的过期时间                                                                    | OK                         | get        |
| ttl       | ttl key                                              | 以秒为单位返回 key 的剩余过期时间                    |               | 当 key 不存在时，返回 -2 。 当 key 存在但没有设置剩余生存时间时，返回 -1 。 否则，以秒为单位，返回 key 的剩余生存时间 | 秒                         |
| del       | del key [key...]                                     | 删除一个 key                                         | EX/PX/NX/XX   | NX,XX:key 不/存在才执行, EX,PX:设置 key 的过期时间                                                                    | 1                          |            |
| zadd      | zadd key [NX,XX][ch] [INCR] score member             | 将一个或多个 member 元素及其 score 放入有序集 key 中 | NX,XX,CH,INCR | 当 key 存在但不是有序集,报错                                                                                          | 添加成功元素的个数/0/score |            |
| zrevrange | zrevrange key start stop [withscores]                | 按照 score 递减返回有序集 key 中,指定区间的成员      |               | 和 zrange 的区别在于,zrange 是递增                                                                                    | 列表                       |            |
| hset      | hset key field value                                 | 将哈希表中域 field 的值设置为 value                  |               |                                                                                                                       | 0/1                        | hget, hdel |
| hgetall   | hgetall key                                          | 返回 hash 表 key 中,所有的域和值                     |               |                                                                                                                       | 列表                       |            |

| 命令    | 数据格式 | 复杂度     |
| ------- | -------- | ---------- |
| set/get | 字符串   |            |
| z{XXX}  | 有序集合 | NO(log(N)) |
| s{XXX}  | 无序集合 | O(N)       |
| h{XXX}  | 哈希表   | O(N)       |
