const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

async function getRankName(func_group, func_user){
    let rolename = await roblox.getRankNameInGroup(func_group, func_user);
    return rolename;
}

async function getRankID(func_group, func_user){
    let role = await roblox.getRankInGroup(func_group, func_user);
    return role;
}

async function getRankFromName(func_rankname, func_group){
    let roles = await roblox.getRoles(func_group);
    let role = await roles.find(rank => rank.name == func_rankname);
    if(!role){
        return 'NOT_FOUND';
    }
    return role.rank;
}

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["High Ranks", "Server Administrator", "Deputy Chief Operation Officer", "Chief Operation Officer"].includes(role.name))){
        return message.channel.send({embed: {
            color: 0xff0000,
            description: "You need to be  `Operation Manager+` to run this command.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }})
    }
    let username = args[0];
    if(!username){
        return message.channel.send({embed: {
            color: 0xff0000,
            description: "The username argument is required.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send({embed: {
            color: 0xff0000,
            description: `Oops! ${username} is not a Roblox user. Perhaps you misspelled?`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL
            }
        }});
    }
    let rankInGroup = await getRankID(Number(process.env.MainGroup), id);
    let rankNameInGroup = await getRankName(Number(process.env.MainGroup), id);
    if(Number(process.env.maximumRacerRank) <= rankInGroup || Number(process.env.maximumRacerRank) <= rankInGroup + 1){
        return message.channel.send({embed: {
            color: 0xff0000,
            description: "This rank cannot be ranked by this bot.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let promoteResponse;
    try {
        promoteResponse = await roblox.promote(Number(process.env.MainGroup), id);
    } catch (err) {
        console.log(chalk.red('An error occured when running the promote command: ' + err));
        return message.channel.send({embed: {
            color: 0xff0000,
            description: `Oops! An unexpected error has occured. It has been logged to the bot console.`,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }});
    }
    let newRankName = await getRankName(Number(process.env.MainGroup), id);
    let newRank = await getRankID(Number(process.env.MainGroup), id);
    message.channel.send({embed: {
        color: 0x00FF0F,
        description: `**Success!** Ranked ${username} to ${promoteResponse.newRole.name} (${promoteResponse.newRole.rank})`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        }
    }});
    if(process.env.racerranklogs === 'false') return;
    let logchannel = await message.guild.channels.cache.get(process.env.racerranklogs);
    logchannel.send({embed: {
        color: 0x00FF0F,
        description: `<@${message.author.id}> has promoted ${username} from ${rankNameInGroup} (${rankInGroup}) to ${promoteResponse.newRole.name} (${promoteResponse.newRole.rank}).`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Operation Logs'
        },
        timestamp: new Date(),
        thumbnail: {
            url: `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
        }
    }});
}