import { Config, Database, Proxy } from '@neoxr/wb'

const url = process?.env?.DATABASE_URL
const strategies = [
   { regex: /mongo/i, proxy: Proxy.proxyMongo, database: (url) => Database.saveToMongo(url, Config.database), session: 'mongo', name: 'Mongo' },
   { regex: /postgres/i, proxy: Proxy.proxyPgSql, database: (url) => Database.saveToPostgres(url, Config.database), session: 'postgresql', name: 'PostgreSQL' },
   { regex: /mysql/i, proxy: Proxy.proxyMySql, database: (url) => Database.saveToMySQL(url, Config.database), session: 'mysql', name: 'MySQL' },
   { regex: /rediss/i, proxy: Proxy.proxyRedis, database: (url) => Database.saveToRedis(url, Config.database), session: 'redis', name: 'Redis' }
].find(({ regex }) => url && regex.test(url))

export default {
   database: await (strategies
      ? strategies.database(url)
      : Database.saveToLocal(Config.database)),
   session: strategies?.session || 'local',
   name: strategies?.name || 'Local',
   proxy: strategies?.proxy || Proxy.proxyJson
}