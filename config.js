import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import chalk from 'chalk'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import NodeCache from 'node-cache'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const moduleCache = new NodeCache({ stdTTL: 300 });

/*⭑⭒━━━✦❘༻☾⋆⁺₊✧ 𝛢𝑅𝑮𝛩 𝛣𝛩𝑇 ✧₊⁺⋆☽༺❘✦━━━⭒⭑*/

global.sam = ['393444297827']
global.owner = [
  ['393444297827', 'teo', true],
]
global.mods = ['393444297827','2259453354','393492133949']
global.prems = ['393444297827','2259453354','393492133949']

/*⭑⭒━━━✦❘༻🩸 INFO BOT 🕊️༺❘✦━━━⭒⭑*/

global.nomepack = '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇'
global.nomebot = '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇'
global.wm = '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇'
global.autore = '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇'
global.dev = '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇'
global.testobot = `𝛢𝑅𝑮𝛩 𝛣𝛩𝑇`
global.versione = pkg.version
global.errore = '⚠️ *Errore inatteso!* Usa il comando `.segnala _errore_` per avvisare lo sviluppatore.'

/*⭑⭒━━━✦❘༻🌐 LINK 🌐༺❘✦━━━⭒⭑*/

global.repobot = 'haha non ti invio il link del progetto frociazz'
global.gruppo = 'https://chat.whatsapp.com/Gukru8B4wCP9HEolSX2an7'
global.canale = 'https://chat.whatsapp.com/Gukru8B4wCP9HEolSX2an7'
global.insta = 'https://www.instagram.com/22.t.eo'

/*⭑⭒━━━✦❘༻ MODULI ༺❘✦━━━⭒⭑*/

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

/*⭑⭒━━━✦❘🗝️ API KEYS 🌍༺❘✦━━━⭒⭑*/

global.APIKeys = { // le keys con scritto "ARGO BOT" vanno cambiate con keys valide
    spotifyclientid: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    spotifysecret: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    browserless: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    screenshotone: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    screenshotone_default: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    tmdb: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    gemini:'𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    ocrspace: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    assemblyai: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    google: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    googlex: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    googleCX: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    genius: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    unsplash: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    removebg: 'FEx4CYmYN1QRQWD1mbZp87jV',
    openrouter: '𝛢𝑅𝑮𝛩 𝛣𝛩𝑇',
    lastfm: '36f859a1fc4121e7f0e931806507d5f9',
}

/*⭑⭒━━━✦❘༻🪷 SISTEMA XP/EURO 💸༺❘✦━━━⭒⭑*/

global.multiplier = 1 // piu è alto piu è facile guardagnare euro e xp

/*⭑⭒━━━✦❘༻📦 RELOAD 📦༺❘✦━━━⭒⭑*/

let filePath = fileURLToPath(import.meta.url)
let fileUrl = pathToFileURL(filePath).href
const reloadConfig = async () => {
  const cached = moduleCache.get(fileUrl);
  if (cached) return cached;
  unwatchFile(filePath)
  console.log(chalk.bgHex('#3b0d95')(chalk.white.bold("File: 'config.js' Aggiornato")))
  const module = await import(`${fileUrl}?update=${Date.now()}`)
  moduleCache.set(fileUrl, module, { ttl: 300 });
  return module;
}
watchFile(filePath, reloadConfig)