module.exports = class Osu {
    
    static match (message) {
        return message.content.startsWith('!osustats')
    }

    static action (message) {
        let args = message.content.split(' ')
        args.shift()
        message.reply('https://ameobea.me/osutrack/user/' + args.join('%20'))
    }

}
