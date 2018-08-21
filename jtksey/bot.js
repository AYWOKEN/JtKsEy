const Discord = require("discord.js");
const bot = new Discord.Client();
const YTDL = require('ytdl-core');
var prefix = "!";
const Google = require('./commands/google.js');
const Youtube = require('./commands/youtube.js');
const GitHub = require('./commands/github.js');
const Twitter = require('./commands/twitter.js');
const LoLStats = require('./commands/lolstats.js');
const OverWatch = require('./commands/overwatch.js');
const Osu = require('./commands/osu.js');
const Twitch = require('./commands/twitch.js');


function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
    server.queue.shift();
    server.dispatcher.on('end', function() {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var servers = {};

bot.on('ready', () => {
    console.log("Jt'aikassé ready");
});

/* MUSIC BOT */

bot.on('message', function(message) {
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(' ');

    switch(args[0].toLowerCase()) {
            case 'help':

            break;

          
            case 'play':
                if(!args[1]) {
                    message.channel.sendMessage("Mauvaise syntaxe ! Vous n'avez pas bien utiliser la commande ou vous n'êtes pas dans un channel vocal");
                return;
                }
                if(!message.member.voiceChannel) {
                    message.channel.sendMessage('Vous devez être dans un channel vocal !');
                return;
                }
                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                };
                var server = servers[message.guild.id];
                server.queue.push(args[1]);
                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {

                    play(connection, message);
                });
                break;

                case 'skip':
                    var server = servers[message.guild.id];
                    if(server.dispatcher) server.dispatcher.end();
                break;

                case 'stop':
                    var server = servers[message.guild.id];
                    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                break;


    }
});



bot.on('message', function(message) {
    if(message.content === '!modhelp') {
        message.channel.send('**@Moderateur** | Un moderateur SVP!');
    }

})
    
  

  bot.on('message', function(message) {
      if (message.content === '!embedhelp') {
          var embed = new Discord.RichEmbed()
          .setDescription("@Moderateur")
          message.channel.send(embed);
      }
  })

  bot.on('message', function(message) {
    if (message.content === "!myavatar") {
        message.reply(message.author.avatarURL);
    }

    if (message.content === '!defaultavatar') {
        message.reply(message.author.defaultAvatarURL)
    }

    if (message.content === '!myavatarid') {
        message.reply("L'id de votre avatar : \n\n" + message.author.avatar)
    }

    if (message.content === '!myid') {
        message.reply(message.author.discriminator)
    }

    if (message.content === '!myusername') {
        message.reply(message.author.username)
    }

    if (message.content === '!mytag') {
        message.reply(message.author.tag)
    }

    if (message.content === "!thisidmessage") {
        message.reply(" L'id de ce message est : " + "**" + message.id + "**")
    }

    if (message.content === '!test') {
        message.reply(message.embeds)
    }
  })

  bot.on('message', function (message) {
      if (message.content === '!help') {
          message.reply("\n\n``!help: All commands\n!mytag : Votre id (#)\n!thisidmessage: l'id de ce message\n!myusername: Votre pseudo\n!myavatar: Votre avatar\n!defaultavatar: Avatar par défaut\n!myavatarid: Id de votre avatar\n!play <youtube link>: Ecoute sonore d'une vidéo youtube\n!skip: Passer d'une vidéo à l'autre\n!stop: Arrêt d'une vidéo\n!twitter <name_of_twitter_account>: lien qui mène au twitter choisi.\n!owstats <pseudo>: Stats Overwatch\n!lolstats <pseudo>: Stats League Of Legends\n!osustats <pseudo>: Stats Osu!\n!google <quelque chose>: Recherche Google\n!youtube <quelque chose>: Recherche Youtube\n!github <pseudo>: Voir le profile d'une personne possédant github\n!twitch <pseudo>: Chaîne twitch\n``")
      }
  })


  bot.on('guildMemberAdd', function(member) {
    var arrivant = member.guild.channels.find('name', 'general');
    if (!channel) return; {
        message.channel.send('Bienvenue sur le serveur, ${member}');
    }
  })


  bot.on('ready', function (ready) {
      bot.user.setGame('Programmation').catch(console.error)
  })

  bot.on('message', function (message) {
    if (message.content === 'I am the best !')
    message.react("😎")
})

  bot.on('guildMemberRemove', function(member) {
      var partant = member.guild.channels.find('name', 'general');
      if(channel) return; {
          message.channel.send('Aurevoir !')
      }
  })


/* GOOGLE SEARCH */

bot.on('message', function (message) {
    if(Google.match(message)) {
        return Google.action(message)
    }
})

bot.on('message', function (message) {
    if (Youtube.match(message)) {
        return Youtube.action(message)
    }
})

bot.on('message', function (message) {
    if (GitHub.match(message)) {
        return GitHub.action(message)
    }
})

bot.on('message', function (message) {
    if (Twitter.match(message)) {
        return Twitter.action(message)
    }
})

bot.on('message', function (message) {
    if (LoLStats.match(message)) {
        return LoLStats.action(message)
    }
})

bot.on('message', function (message) {
    if (OverWatch.match(message)) {
        return OverWatch.action(message)
    }
})

bot.on('message', function (message) {
    if (Osu.match(message)) {
        return Osu.action(message)
    }
})

bot.on('message', function (message) {
    if (Twitch.match(message)) {
        return Twitch.action(message)
    }
})

bot.on('message', message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);



    // CLEARCHAT
    if (msg.startsWith(prefix + 'CLEAR')) {
        async function purge() {
            message.delete();

          
            if (!message.member.roles.find("name", "Moderateur")) {
                message.channel.send('Vous devez avoir le grade \`Moderateur\` pour utiliser cette commande');
                return;
            }

            if (isNaN(args[0])) {
                message.channel.send('Vous devez entrer un nombre. \n Utilisation: ' + prefix + 'clear <nombre>');
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' messages found, deleting...');
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));

        }

        purge();

    }
});



bot.login('token');
