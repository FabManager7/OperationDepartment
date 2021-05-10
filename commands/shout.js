const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["High Ranks", "Server Administrator", "Deputy Chief Operation Officer", "Chief Operation Officer"].includes(role.name))){
        return message.channel.send({embed: {
            color: 0xFF0000,
            description: "You need to be `Operation Manager+` to run this command.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let msg = args.join(' ');
    if(!msg){
        return message.channel.send({embed: {
            color: 0xFF0000,
            description: `The message argument is required.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let shoutResponse;
    try {
        shoutResponse = await roblox.shout(Number(process.env.groupId), msg);
    } catch (err) {
        console.log(chalk.red('An error occured when running the shout command: ' + err));
        return message.channel.send({embed: {
            color: 0xFF0000,
            description: `Oops! An unexpected error has occured. It has been logged to the bot console.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    message.channel.send({embed: {
        color: 0x00FF0F,
        description: `**Success!** Posted group shout:\n`
        + `\`\`\`${msg}\`\`\``,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    if(process.env.logchannelid === 'false') return;
    let logchannel = message.guild.channels.cache.get(process.env.logchannelid);
    logchannel.send({embed: {
        color: 0x00FF0F,
        description: `<@${message.author.id}> has posted a group shout:\n`
        + `\`\`\`${msg}\`\`\``,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Operation Logs'
        },
        timestamp: new Date()
    }});
}
