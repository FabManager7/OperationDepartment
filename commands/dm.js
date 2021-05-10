exports.run = async (client, message, args) => {
  let filter = (msg) => msg.author.id === message.author.id;
  if (
    message.member.roles.cache.some(role =>
      ["Server Administrator", "Deputy Chief Operation Officer", "Chief Operation Officer"].includes(role.name)
    )
  ) {
    let mention =
      (await message.mentions.members.first()) ||
      (await message.guild.members.cache.get(args[0]));
    const tosend = args.slice(1).join(" ");
    if (tosend) {
      if (mention) {
        await mention
          .send(`${tosend}`)
          .then(async () => {
            message.channel.send({
              embed: {
                color: 0x00FF0F,
                description: `>>> :small_orange_diamond: DM sent from ${message.member.nickname} to ${mention.nickname}.`,
                author: {
                  name: "DM Sent",
                }
              }
            });
            if (process.env.logchannelid === "false") return;
            let logchannel = await message.guild.channels.cache.get(
              process.env.logchannelid
            );
            logchannel.send({
              embed: {
                color: 0x00FF0F,
                description: `>>> :small_orange_diamond: ${message.member.nickname} sent a DM to ${mention.nickname}
                :small_orange_diamond: Message: \`${tosend}\``,
                author: {
                  name: `DM Log`,
                },
                footer: {
                  text: "Operation Managment"
                },
                timestamp: new Date()
              }
            });
          })
          .catch(async (err) => {
            return message.channel.send({
              embed: {
                color: 0xFF0000,
                description: ">>> :small_orange_diamond: That person does not have their DMs on!",
                author: {
                  name: "Error",
                }
              }
            });
          });
      } else {
        let findname = await message.guild.members.fetch({
          query: args[0],
          limit: 1
        });
        if (findname.first().id) {
          const msg = await message.channel.send({
            embed: {
              color: 0x00FF0F,
              description: `Do you want to send this DM to <@${
                findname.first().id
              }> (${findname.first().user.tag})?`,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              },
              footer: {
                text: `Options: no | yes`
              }
            }
          });
          message.channel
            .awaitMessages(filter, { max: 1, time: 60000 })
            .then(async collected => {
              if (collected.size === 0) {
                message.channel.send({
                  embed: {
                    description: `You took to long.`,
                    color: 0xFF0000,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }
                });
              } else {
              let answer = collected.first().content.toLowerCase();
              if (answer === "no") {
                return message.channel.send({
                  embed: {
                    color: 0xFF0000,
                    description: `Did not send a DM.`,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }
                });
              } else {
              if (answer === "yes") {
        await findname.first()
          .send(`**${message.member.displayName}:** ${tosend}`)
          .then(async () => {
            message.channel.send({
              embed: {
                color: 0x00FF0F,
                description: "Successfully sent DM!",
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
            if (process.env.logchannelid === "false") return;
            let logchannel = await message.guild.channels.cache.get(
              process.env.logchannelid
            );
            logchannel.send({
              embed: {
                color: 0x00FF0F,
                description: `<@${message.author.id}> (${message.author.tag}) sent a DM to <@${findname.first().id}> (${findname.first().user.tag}) saying: \`${tosend}\``,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                },
                footer: {
                  text: "DM Logs"
                },
                timestamp: new Date()
              }
            });
          })
          .catch(async (err) => {
            return message.channel.send({
              embed: {
                color: 0xFF0000,
                description: ">>> :small_orange_diamond: That person does not have their DMs on!",
                author: {
                  name: "Error",
                }
              }
            });
          });
              } else {
                return message.channel.send({embed: {
                  color: 0xFF0000,
                  description: 'That is not a valid option.',
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }})
              }
              }
            }
            });
        }
      }
    } else
      message.channel.send({
        embed: {
          color: 0xFF0000,
          description: ">>> :small_orange_diamond: You did not say what to send!",
          author: {
            name: "Error",
          }
        }
      });
  } else {
    message.channel.send({
      embed: {
        color: 0xFF0000,
        description: ">>> :small_orange_diamond: You need to be `DCOO+` to run this command.",
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }
};