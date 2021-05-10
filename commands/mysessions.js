const fetch = require("node-fetch");
const Discord = require("discord.js")
var Trello = require('trello-node-api')(process.env['apikey'], process.env['trellotoken']);
exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role =>["High Ranks", "Server Administrator", "Deputy Chief Operation Officer", "Chief Operation Officer", "Racing Host", "Racing Host Supervisor", "Other Executives"].includes(role.name))){
        return message.channel.send({embed: {
            color: 16733013,
            description: "You need to be `Racing Host+` to run this command.",
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
            }
        }})
    }
  var msg1
  let loadembed = new Discord.MessageEmbed()
    .setColor("#53fd01")
        .setTitle(`> :small_orange_diamond: Loading...`)
        message.channel.send(loadembed).then(msg => msg1 = msg)












        var t = new Date();
// Get mins
var th = t.getHours(); // get the hours of the time we wanna check
var tm = t.getMinutes(); //get the minutes of the time we wanna check
th = th + 1 // GMT to BST
console.log(tm)


if(tm.toString().length < 2) 
  tm = "0"+tm;

var final = th + ":" + tm
  // console.log(final)


  var datern = new Date()

var dd = datern.getDay(); // get the hours of the time we wanna check
	if (dd == 1) {
		dd = 'Monday';
	} else if (dd == 2) {
		dd = 'Tuesday';
	} else if (dd == 3) {
		dd = 'Wednesday';
	} else if (dd == 4) {
		dd = 'Thursday';
	} else if (dd == 5) {
		dd = 'Friday';
	} else if (dd == 6) {
		dd = 'Saturday';
	} else if (dd == 0) {
		dd = 'Sunday';
	}
var dw = datern.getDate()
var de = datern.getDate()
var dm = datern.getMonth()
var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

dm = months[dm];
dw = ordinal_suffix_of(dw)
console.log(dw)

var finaldate = dd + " " + de + dw + " " + dm
console.log(finaldate)
        var list = ""
await fetch(`https://api.trello.com/1/boards/VCX0Umx5/lists`)
  .then(response => response.json())
  .then(data => list = data);
// here we look at all the lists on the board


var number1 = 0
var finallist;
for(var i = 0; i < list.length; i++) {
    var obj = list[i];
if(obj.name === finaldate) {
  console.log(finallist)
finallist = obj
}
}
var user;
await fetch(`https://api.blox.link/v1/user/${message.author.id}?guild=814232441510035518`)
  .then(response => response.json())
  .then(data => user = data);
var name;
    await fetch(`https://users.roblox.com/v1/users/${user.primaryAccount}`)
  .then(response => response.json())
  .then(data => name = data);
    let embed = new Discord.MessageEmbed()
        .setTitle("Upcoming sessions today")
         .setColor("#53fd01")
         .setThumbnail("https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png")
        await Trello.board.searchCards('VCX0Umx5').then(async function (response) {
     for(var k in await response) {
      if(response[k].idList === finallist.id) {

        await fetch(`https://api.trello.com/1/cards/${response[k].id}/?fields=name&customFieldItems=true`)
  .then(response => response.json())
  .then(data => {
    try {
      if(data.customFieldItems[1].value.text !== name.name) return
     var now = final.replace(':','') - 30
    if(data.name.split(' ')[0].replace(':','') > now) {
    embed.addField(`${data.name}`, `${data.customFieldItems[1].value.text}`)
          number1 = number1 + 1
    }
    } catch(err) {

    }

  })
      }

  }

})
if(number1 == 0) {
   let nosessions = new Discord.MessageEmbed()
   .setTitle("You aren't hosting any sessions today!")
   .setColor("#53fd01")
   .setDescription("You aren't hosting any more sessions today.")
   .setThumbnail("https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png")
    msg1.edit(nosessions)
} else {
    msg1.edit(embed)
}

}



function ordinal_suffix_of(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}




