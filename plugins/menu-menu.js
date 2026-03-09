import fs from 'fs'

const emojicategoria = {
  info: '⁉️',
  main: '🦋'
}

let tags = {
  'main': '╭ *`𝐌𝐀𝐈𝐍`* ╯',
  'info': '╭ *`𝐈𝐍𝐅𝐎`* ╯'
}

const defaultMenu = {
  before: `╭⭒─ׄ─⊱ *𝐌𝐄𝐍𝐔 - 𝐁𝐎𝐓* ⊰
✦ 👤 \`Utente:\` *%name*
✧ 🪐 \`Attivo da:\` *%uptime*
✦ 💫 \`Utenti:\` *%totalreg*
╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒\n
`.trimStart(),
  header: '      ⋆｡˚『 %category 』˚｡⋆\n╭',
  body: '*│ ➤* 『%emoji』%cmd',
  footer: '*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*\n',
  after: ``,
}

const MENU_IMAGE_PATH = './media/menu/menu_new.jpg'

function detectDevice(msgID) {
  if (!msgID) return 'unknown'
  else if (/^[a-zA-Z]+-[a-fA-F0-9]+$/.test(msgID)) return 'bot'
  else if (msgID.startsWith('false_') || msgID.startsWith('true_')) return 'web'
  else if (msgID.startsWith('3EB0')) return 'web'
  else if (msgID.includes(':')) return 'desktop'
  else if (/^[A-F0-9]{32}$/i.test(msgID)) return 'android'
  else if (/^[0-9a-f]{8}-/.test(msgID)) return 'ios'
  else if (/^[A-Z0-9]{20,25}$/i.test(msgID)) return 'ios'
  else return 'unknown'
}

function getRandomMenus() {
  const allMenus = [
    { title: "🤖 Menu IA", description: "Intelligenza Artificiale", command: "menuia" },
    { title: "⭐ Menu Premium", description: "Funzionalità Premium", command: "menupremium" },
    { title: "🛠️ Menu Strumenti", description: "Utilità e tools", command: "menustrumenti" },
    { title: "💰 Menu Euro", description: "Sistema economico", command: "menueuro" },
    { title: "🎮 Menu Giochi", description: "Games e divertimento", command: "menugiochi" },
    { title: "👥 Menu Gruppo", description: "Gestione gruppi", command: "menugruppo" },
    { title: "🔍 Menu Ricerche", description: "Ricerca online", command: "menuricerche" },
    { title: "📥 Menu Download", description: "Scarica contenuti", command: "menudownload" },
    { title: "👨‍💻 Menu Creatore", description: "Comandi owner", command: "menucreatore" }
  ]

  const shuffled = allMenus.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 5)
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {

    let name = await conn.getName(m.sender) || 'Utente'
    let uptime = clockString(process.uptime() * 1000)
    let totalreg = Object.keys(global.db.data.users).length

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
      }
    })

    let menuTags = Object.keys(tags)

    let _text = [
      defaultMenu.before,
      ...menuTags.map(tag => {
        return defaultMenu.header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag)).map(menu => {
            return menu.help.map(cmd => {
              return defaultMenu.body
                .replace(/%cmd/g, menu.prefix ? cmd : '%p' + cmd)
                .replace(/%emoji/g, emojicategoria[tag] || '❔')
            }).join('\n')
          }),
          defaultMenu.footer
        ].join('\n')
      }),
      defaultMenu.after
    ].join('\n')

    let replace = {
      '%': '%',
      p: _p,
      uptime: uptime,
      name: name,
      totalreg: totalreg
    }

    let text = _text.replace(new RegExp(`%(${Object.keys(replace).join('|')})`, 'g'), (_, name) => replace[name])

    const msgID = m.id || m.key?.id
    const deviceType = detectDevice(msgID)

    const imageBuffer = fs.readFileSync(MENU_IMAGE_PATH)

    if (deviceType === 'ios') {

      const randomMenus = getRandomMenus()

      const buttons = randomMenus.map(menu => ({
        buttonId: _p + menu.command,
        buttonText: { displayText: menu.title },
        type: 1
      }))

      await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: text.trim(),
        footer: "",
        buttons: buttons,
        headerType: 4
      }, { quoted: m })

    } else {

      const sections = [
        {
          title: "⭐ Menu Consigliati ⭐",
          rows: [
            { title: "🤖 Menu IA", description: "Intelligenza Artificiale", id: _p + "menuia" },
            { title: "⭐ Menu Premium", description: "Funzionalità Premium", id: _p + "menupremium" }
          ]
        },
        {
          title: "Menu Standard",
          rows: [
            { title: "🛠️ Menu Strumenti", description: "Utilità e tools", id: _p + "menustrumenti" },
            { title: "💰 Menu Euro", description: "Sistema economico", id: _p + "menueuro" },
            { title: "🎮 Menu Giochi", description: "Giochi e divertimento", id: _p + "menugiochi" },
            { title: "👥 Menu Gruppo", description: "Gestione gruppi", id: _p + "menugruppo" },
            { title: "🔍 Menu Ricerche", description: "Ricerca online", id: _p + "menuricerche" },
            { title: "📥 Menu Download", description: "Scarica contenuti", id: _p + "menudownload" },
            { title: "👨‍💻 Menu Creatore", description: "Comandi owner", id: _p + "menucreatore" }
          ]
        }
      ]

      await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: text.trim()
      }, { quoted: m })

    }

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `${global.errore}`, m)
  }
}

handler.help = ['menu']
handler.command = ['menu','menuall','menucompleto','funzioni','comandi','help']

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2,0)).join(':')
}