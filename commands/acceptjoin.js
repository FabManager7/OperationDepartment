const roblox = require('noblox.js');
const chalk = require('chalk');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["High Ranks", "Server Administrator", "Deputy Chief Operation Officer", "Chief Operation Officer"].includes(role.name))){
        return message.channel.send({embed: {
            color: 0xFF0000,
            description: "You need to be `Operation Manager+` to run this command.",
            author: {
                name: message.member.nickname,
            }
        }});
    }
  let username = args[0];
  if(!username){
    return message.channel.send({embed: {
      description: 'Please provide a username.',
      color: 0xFF0000,
      author: {
        name: message.member.nickname,
      }
    }});
  }
  let userid;
  try {
    userid = await roblox.getIdFromUsername(username);
  } catch (err) {
    return message.channel.send({embed: {
      description: 'That user does not exist.',
      color: 0xFF0000,
      author: {
        name: message.member.nickname,
      }
    }});
  }
  try {
    username = await roblox.getUsernameFromId(userid);
  } catch (err) {
    console.log(chalk.red('An error occured when running the deny-join command: ' + err));
    return message.channel.send({embed: {
      description: 'Oops! An unexpected error has occured. It has been logged to the bot console.',
      color: 0xFF0000,
      author: {
        name: message.member.nickname,
      }
    }});
  }
  let acceptJoinRequestResponse;
  try {
    acceptJoinRequestResponse = await roblox.handleJoinRequest(Number(process.env.groupId), userid, true);
  } catch (err) {
    return message.channel.send({embed: {
      description: 'That user does not have an active join request.',
      color: 0xFF0000,
      author: {
        name: message.member.nickname,
      }
    }});
  }
  message.channel.send({embed: {
    color: 0x00FF0F,
    description: `Accepted ${username}'s join request.`,
    author: {
      name: "Group Request Accepted",
    }
  }});
  if(process.env.logchannelid === 'false') return;
  let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
  logchannel.send({embed: {
    color: 0x00FF0F,
    description: `>>> :small_orange_diamond: ${message.member.nickname} has accepted ${username}'s join request.
    :small_orange_diamond: ${username} is now a Trainee.`,
    author: {
      name: "Group Acceptance Log",
    },
    footer: {
      text: 'Operation Managment'
    },
    timestamp: new Date(),
    thumbnail: {
      url: ``
    }
  }});
}
