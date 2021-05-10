require('dotenv').config();
exports.run = async (client, message, args) => {
    message.channel.send(`||<@${message.author.id}>||`);
     message.channel.send({embed: {
        color: 0x00FF0F,
        description: `>>> __**Here are my commands:**__\n \n` 

        +`__**All Ranks**__ \n \n`
        + `:small_orange_diamond:\`${process.env.prefix}help\` - Shows this list of commands.\n`
        + `:small_orange_diamond:\`${process.env.prefix}resign\` - Resign from your position in the department.\n`
        +`\n __**Middle Ranks**__ \n\n`
        + `:small_orange_diamond:\`${process.env.prefix}mysessions\` - Check your booked sessions today.\n`
            + `:small_orange_diamond:\`${process.env.prefix}upcomingsessions\` - Check the next sessions today, and see who's hosting them.\n`
             +`\n __**Operation Managers**__ \n\n`
        + `:small_orange_diamond:\`${process.env.prefix}shout <message>\` - Posts a group shout.\n`
        + `:small_orange_diamond:\`${process.env.prefix}acceptjoin <user>\` - Accepts the user to the roblox group.\n`
        + `:small_orange_diamond:\`${process.env.prefix}promoteracer <user>\` - Ranks user up one racer rank.\n`
        + `:small_orange_diamond:\`${process.env.prefix}fire <user>\` - Kicks the user from the roblox group.\n`
        + `:small_orange_diamond:\`${process.env.prefix}suspend <user>\` - Suspends the user. \n`
        + `:small_orange_diamond:\`${process.env.prefix}trainee <user>\` - Ranks user to Trainee.\n`
        + `:small_orange_diamond:\`${process.env.prefix}tm <user>\` - Ranks user to Track Marshal.\n`
        + `:small_orange_diamond:\`${process.env.prefix}rh <user>\` - Ranks user to Racing Host.\n`
        + `:small_orange_diamond:\`${process.env.prefix}rhs <user>\` - Ranks user to Racing Host Supervisor \n`
             +`\n __**Head of Operation+**__ \n\n`
             + `:small_orange_diamond:\`${process.env.prefix}dm <@user>\` - Sends a direct message to the user.\n`
              + `:small_orange_diamond:\`${process.env.prefix}demoteracer <user>\` - Ranks user down one racer rank.\n`,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        footer: {
            text: 'Operation Management'
        },
        timestamp: new Date(),
        thumbnail: {
            url: `https://t3.rbxcdn.com/3cf1f1f2306de0d5672759d9292e835b`
        }
    }});
}