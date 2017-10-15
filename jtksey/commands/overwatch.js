module.exports = class OverWatch {
    
    static match (message) {
        return message.content.startsWith('!owstats')
    }

    static action (message) {
        let args = message.content.split(' ')
        args.shift()
        message.reply('https://overwatchtracker.com/search?name=' + args.join('%20'))
    }

}