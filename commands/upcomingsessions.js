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


if(tm.toString().length < 2) // if its a single digit (18:1) for example, we change it to (18:01)
  tm = "0"+tm;
	if (th.toString().length < 2)
		// if its a single digit (18:1) for example, we change it to (18:01)
		th = '0' + th;
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
var dm = datern.getMonth()
var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

dm = months[dm];
dw = ordinal_suffix_of(dw)


var finaldate = dd + " " + dw + " " + dm
console.log(finaldate)

var user;
await fetch(`https://api.blox.link/v1/user/${message.author.id}?guild=814232441510035518`)
  .then(response => response.json())
  .then(data => user = data);
var name;
    await fetch(`https://users.roblox.com/v1/users/${user.primaryAccount}`)
  .then(response => response.json())
  .then(data => name = data);

var number1 = 0



    let embed = new Discord.MessageEmbed()
        .setTitle("Today's Upcoming Sessions")
         .setColor("#53fd01")
         .setThumbnail("https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png")
    if(th == 24) {
      th = 00
    }
  
console.log(`https://gkxapi.bloxtech.tech/sessions/get?today=${dd}%20${dw}%20${dm}&hour=${th}&minute=${tm}&key=1ec214f9-80fe-49f8-8cd7-5954aff83315`)
console.log(dd + dw + dm + th + tm)
        await fetch(`https://gkxapi.bloxtech.tech/sessions/get?today=${dd}%20${dw}%20${dm}&hour=${th}&minute=${tm}&key=1ec214f9-80fe-49f8-8cd7-5954aff83315`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
     for (x in data.sessions) {
       console.log(data)
        console.log(data[x])
        console.log(data.sessions[x])
        console.log(data.sessions[x].Host)
        console.log(data.sessions[x].StartTime)
        if(data.sessions[x].Host !== "Unknown") {
          if(data.sessions[x].Host === name.name) {
 embed.addField(`> 🔸__**${data.sessions[x].StartTime}**__`, `**${data.sessions[x].Host}**`)
    number1 = number1 + 1
          } else if(data.sessions[x].Host !== name.name) {
             embed.addField(`> 🔸__**${data.sessions[x].StartTime}**__`, `${data.sessions[x].Host}`)
                number1 = number1 + 1
          }
        } else if(data.sessions[x].Host === "Unknown") {
         embed.addField(`> 🔸__**${data.sessions[x].StartTime}**__`, `No Host`)
          number1 = number1 + 1
        }
      }
    
      

    

  
      })

  
if(number1 == 0) {
   let nosessions = new Discord.MessageEmbed()
   .setTitle("No sessions today!")
   .setColor("#53fd01")
   .setDescription("There are no sessions left today.")
   .setThumbnail("https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png")
    msg1.edit(nosessions)
} else {
    msg1.edit(embed)
}

}





function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

