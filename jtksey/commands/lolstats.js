module.exports = class LoLStats {
    
    static match (message) {
        return message.content.startsWith('!lolstats')
    }

    static action (message) {
        let args = message.content.split(' ')
        args.shift()
        message.reply('http://euw.op.gg/summoner/userName=' + args.join('%20'))
    }

}
