module.exports = class Twitch {
    
    static match (message) {
        return message.content.startsWith('!twitch')
    }

    static action (message) {
        let args = message.content.split(' ')
        args.shift()
        message.reply('https://go.twitch.tv/' + args.join('%20'))
    }

}
