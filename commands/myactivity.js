const fetch = require("node-fetch");
const Discord = require("discord.js")
var Trello = require('trello-node-api')(process.env['apikey'], process.env['trellotoken']);
exports.run = async (client, message, args) => {

  var user;
await fetch(`https://api.blox.link/v1/user/${message.author.id}?guild=814232441510035518`)
  .then(response => response.json())
  .then(data => user = data);
var name;
    await fetch(`https://users.roblox.com/v1/users/${user.primaryAccount}`)
  .then(response => response.json())
  .then(data => name = data);
var done = false;
   await Trello.board.searchCards('LDw7izA9').then(async function (response) {
     for(var k in await response) {
       if(response[k].name === name.name) {
      console.log(response[k])
done = true
      await fetch(`https://api.trello.com/1/cards/${response[k].id}/?fields=name&customFieldItems=true`).then(response => response.json())
  .then(data => {
     if(message.member.roles.cache.some(role =>["High Ranks", "Server Administrator", "Deputy Chief Operation Officer", "Chief Operation Officer"].includes(role.name))){
                let embed1 = new Discord.MessageEmbed()
         .setTitle(`> __**No card found for ${name.name}**__`)
         .setColor("#53fd01")
         .setDescription(`:small_orange_diamond: No card has been found linked to your profile, this usually means your a new staff member. Your exempt from requirements if you don't have a card.`)
         .setThumbnail("https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png")
         console.log("a")
    console.log("b")
    var attended
    var hosted
    try {
      attended = data.customFieldItems[0].value.number
    } catch(err) {
      attended = 0
    }
    try {
      hosted = data.customFieldItems[1].value.number
    } catch(err) {
      hosted = 0
    }
     var reqs
    try {
      console.log(data)
      console.log(data.customFieldItems)
      if(data.customFieldItems[0].value.checked === "true") {
        reqs = "You have met your requirements. 🥳🎉"
         attended = data.customFieldItems[1].value.number
         hosted =  data.customFieldItems[2].value.number
               if(message.member.roles.cache.has('837015915744329738'))  reqs = "You are exempt from requirements as your on inactivity this month."
         
      } else if(data.customFieldItems[0].value.checked === "false") {
        reqs = "You have not met your requirements yet."
              if(message.member.roles.cache.has('837015915744329738'))  reqs = "You are exempt from requirements as your on inactivity this month."
      }
    } catch(err) {
      console.log(err)
      reqs = "You have not met your requirements yet."
            if(message.member.roles.cache.has('837015915744329738'))  reqs = "You are exempt from requirements as your on inactivity this month."
    }
  if(reqs === undefined) {
    reqs = "You have not met your requirements yet."
          if(message.member.roles.cache.has('837015915744329738'))  reqs = "You are exempt from requirements as your on inactivity this month."
  }
     let embed2 = new Discord.MessageEmbed()
        .setTitle(`> __**${name.name}'s Activity!**__`)
         .setColor("#53fd01")
         .setDescription(`:small_orange_diamond: **${attended}** attended  session(s). \n:small_orange_diamond: **${hosted}** hosted session(s). \n${reqs}`)
         .setThumbnail("https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png")
         message.channel.send(embed2)
    
    
   
        }

         else if(message.member.roles.cache.some(role =>["Track Marshal"].includes(role.name))){

         console.log("a")
    console.log("b")
    console.log(data.customFieldItems)
    var attended
    try {
      attended = data.customFieldItems[0].value.number
    } catch(err) {
      attended = 0
    }
      var reqs
    try {
      console.log(data)
      console.log(data.customFieldItems)
      if(data.customFieldItems[0].value.checked === "true") {
        reqs = "You have met your requirements. 🥳🎉"
         attended = data.customFieldItems[1].value.number
               if(message.member.roles.cache.has('837015915744329738'))  reqs = "You are exempt from requirements as your on inactivity this month."
      } else if(data.customFieldItems[0].value.checked === "false") {
        reqs = "You have not met your requirements yet."
              if(message.member.roles.cache.has('837015915744329738'))  reqs = "You are exempt from requirements as your on inactivity this month."
      }
    } catch(err) {
      console.log(err)
      reqs = "You have not met your requirements yet."
            if(message.member.roles.cache.has('837015915744329738'))  reqs = "You are exempt from requirements as your on inactivity this month."
    }
  if(reqs === undefined) {
    reqs = "You have not met your requirements yet."
          if(message.member.roles.cache.has('837015915744329738'))  reqs = "You are exempt from requirements as your on inactivity this month."
  }
  
     let embed2 = new Discord.MessageEmbed()
        .setTitle(`> __**${name.name}'s Activity!**__`)
         .setColor("#53fd01")
         .setDescription(`:small_orange_diamond: **${attended}** attended  session(s). \n${reqs}`)
         .setThumbnail("https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png")
         message.channel.send(embed2)
    
    
   
        }
  })
       }
      }
     })
               let embed1 = new Discord.MessageEmbed()
         .setTitle(`> __**No card found for ${name.name}**__`)
         .setColor("#53fd01")
         .setDescription(`:small_orange_diamond: No card has been found linked to your profile, this usually means your a new staff member. Your exempt from requirements if you don't have a card.`)
         .setThumbnail("https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png")
         console.log("a")
    if(done == false) return message.channel.send(embed1)
   }


