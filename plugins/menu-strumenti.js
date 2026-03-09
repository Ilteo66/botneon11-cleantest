const defmenu = {
  before: ``.trimStart(),
  header: 'ㅤㅤ⋆｡˚『 ╭ \`MENU STRUMENTI\` ╯ 』˚｡⋆\n╭',
  body: '│ 『 🛠️ 』 %cmd',
  footer: '*╰⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*\n',
  after: ``.trimEnd()
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  let tags = {
    'strumenti': 'Strumenti'
  }

  try {
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled && plugin.tags && plugin.tags.includes('strumenti')).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
      prefix: 'customPrefix' in plugin,
    }))
    let text = [
      defmenu.before,
      defmenu.header.replace(/%category/g, tags['strumenti']),
      help.map(menu => menu.help.map(cmd =>
        defmenu.body.replace(/%cmd/g, menu.prefix ? cmd : _p + cmd)
      ).join('\n')).join('\n'),
      defmenu.footer,
      defmenu.after
    ].join('\n')
    await conn.sendMessage(m.chat, {
      image: { url: './media/menu/menu_new.jpg' },
      caption: text.trim(),
      ...fake,
      contextInfo: {
        ...fake.contextInfo,
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
            ...fake.contextInfo.forwardedNewsletterMessageInfo,
            newsletterName: "ᰔᩚ . ˚ Menu Strumenti ☆˒˒"
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, `${global.errore}`, m)
    throw e
  }
}

handler.help = ['menustrumenti']
handler.tags = ['menu']
handler.command = ['menutools', 'menustrumenti']
export default handler
