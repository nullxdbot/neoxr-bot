import { Client, Config, Database, Utils } from '@neoxr/wb'
import baileys from './lib/engine.js'
import './lib/proto.js'
import './error.js'
import './lib/config.js'
import './lib/functions.js'
import bytes from 'bytes'
import fs from 'node:fs'
import colors from 'colors'
import cron from 'node-cron'
import extra from './lib/listeners-extra.js'
import { stringify } from 'flatted'
import system from './lib/adapter.js'


const connect = async () => {
   try {
      const client = new Client({
         plugsdir: 'plugins',
         online: true,
         bypass_disappearing: true,
         bot: id => {
            // Detect message from bot by message ID, you can add another logic here
            return id && (id.startsWith('BAE') || /[-]/.test(id))
         },
         custom_id: 'neoxr', // Prefix for Custom Message ID (automatically detects isBot for itself)
         presence: true, // Set to 'true' if you want to see the bot typing or recording
         create_session: {
            type: system.session,
            session: 'session',
            config: process.env.DATABASE_URL || ''
         },
         engines: [baileys], // Init baileys as main engine
         debug: false // Set to 'true' if you want to see how this module works :v
      }, {
         // This is the Baileys connection options section
         version: Config.pairing.version, // To see the latest version : https://wppconnect.io/whatsapp-versions/
         browser: Config.pairing.browser,
         shouldIgnoreJid: jid => {
            return /(newsletter|bot)/.test(jid)
         }
      })

      client.once('connect', async res => {
         try {
            const defaults = { users: [], chats: [], groups: [], statistic: {}, sticker: {}, setting: {}, ...(await system.database.fetch() || {}) }
            const previous = await system.database.fetch()
            if (!previous || typeof previous !== 'object' || !Object.keys(previous).length) {
               global.db = defaults
               await system.database.save(defaults)
            } else {
               global.db = previous
            }
         } catch (e) {
            Utils.printError(e)
         }
         if (res && typeof res === 'object' && res.message) Utils.logFile(res.message)
      })

      client.register('error', async error => {
         console.log(colors.red(error.message))
         if (error && typeof error === 'object' && error.message) Utils.logFile(error.message)
      })

      client.once('ready', async () => {
         const ramCheck = setInterval(() => {
            var ramUsage = process.memoryUsage().rss
            if (ramUsage >= bytes(Config.ram_limit)) {
               clearInterval(ramCheck)
               process.send('reset')
            }
         }, 60 * 1000)

         setInterval(async () => {
            if (global.db) await system.database.save(global.db)
         }, 60 * 1000 * (['local', 'sqlite'].includes(system.session) ? 3 : 5))

         cron.schedule('0 12 * * *', async () => {
            if (global?.db?.setting?.autobackup) {
               await system.database.save(global.db)
               fs.writeFileSync(Config.database + '.json', stringify(global.db), 'utf-8')
               await client.sock.sendFile(Config.owner + '@s.whatsapp.net', fs.readFileSync('./' + Config.database + '.json'), Config.database + '.json', '', null)
            }
         })

         extra(system, client)
      })
   } catch (e) {
      Utils.printError(e)
   }
}

connect().catch(() => connect())