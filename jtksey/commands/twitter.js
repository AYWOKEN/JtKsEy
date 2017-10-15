module.exports = class Twitter {
    
    static match (message) {
        return message.content.startsWith('!twitter')
    }

    static action (message) {
        let args = message.content.split(' ')
        args.shift()
        message.reply('https://twitter.com/' + args.join('%20'))
    }

}