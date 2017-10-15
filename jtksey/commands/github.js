module.exports = class GitHub {
    
    static match (message) {
        return message.content.startsWith('!github')
    }

    static action (message) {
        let args = message.content.split(' ')
        args.shift()
        message.reply('https://github.com/' + args.join('%20'))
    }

}