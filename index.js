const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const prefix = '?';
let commandlist = [];
const client = new Discord.Client();
client.commands = new Discord.Collection();
var Trello = require('trello-node-api')(
	process.env['apikey'],
	process.env['trellotoken']
); // this'll allow us to connect to the trello using my info
const schedule = require('node-schedule');
const roblox = require('noblox.js');

roblox.setCookie(process.env.cookie).catch(async err => {
	console.log(chalk.red('Issue with logging into roblox: ' + err));
});
fs.readdir('./commands', async (err, files) => {
	if (err) {
		return console.log(
			chalk.red(
				'An error occured when checking the commands folder for commands to load: ' +
					err
			)
		);
	}
	files.forEach(async file => {
		if (!file.endsWith('.js')) return;
		let commandFile = require(`./commands/${file}`);
		commandlist.push({
			file: commandFile,
			name: file.split('.')[0]
		});
	});
});
client.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).split(' ');
	const commandName = args[0].toLowerCase();
	args.shift();
	const command = commandlist.findIndex(cmd => cmd.name === commandName);
	if (command == -1) return;
	commandlist[command].file.run(client, message, args);
});

const job = schedule.scheduleJob('*/10 * * * *', async function() {
	var card = '';
	var today = new Date();
	var t = new Date();
	t.setMinutes(today.getMinutes() + 10);

	// Get mins
	var th = t.getHours(); // get the hours of the time we wanna check
	var tm = t.getMinutes(); //get the minutes of the time we wanna check
	th = th + 1; // GMT to BST
	console.log(tm);

	if (tm.toString().length < 2)
		// if its a single digit (18:1) for example, we change it to (18:01)
		tm = '0' + tm;

	if (th.toString().length < 2)
		// if its a single digit (18:1) for example, we change it to (18:01)
		th = '0' + th;
	var final = th + ':' + tm;
	// console.log(final)

	var datern = new Date();

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
	var dw = datern.getDate();
	var dm = datern.getMonth();
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	dm = months[dm];
	dw = ordinal_suffix_of(dw);

	var finaldate = dd + ' ' + dw + ' ' + dm;
	console.log(finaldate);

	// This is so we can check the correct list, as we dont want it to check yesterdays or tommorows list


	// here we look at all the lists on the board


	// here we find the list and store the id, so we can lookup cards in it
console.log("bbbbbbbbbbbbbbbbbb")
	// 606ed19a8c29164e64f20273
  var carddata;
await fetch(`https://gkxapi.bloxtech.tech/sessions/get?today=****%20$****%20$****&hour=****&minute=****&key=************************`)
  .then(response => response.json())
  .then(data => {
console.log(data)
carddata = data
  });
  var nextdate = final
		// if their isnt a card we dont countinue
    if(!carddata.sessions[0]) return
		if(carddata.sessions[0].StartTime !== nextdate) return

			// if theres a host
			var userid = '';
			const list = client.guilds.cache.get('814232441510035518');
			await list.members.fetch().then(col =>
				col.forEach(mem => {
					if (mem.nickname == null) return;
					if (
						mem.nickname.includes(carddata.sessions[0].Host)
					) {
						userid = mem.id;
						console.log(mem.id);
					}
				})
			);
if(carddata.sessions[0].Host !== 'Unknown') {
  console.log("a")
			let userembed = new Discord.MessageEmbed()
				.setColor('#53fd01')
				.setTitle(`> __**Reminder!**__`)
				.setThumbnail(
					'https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png'
				)
				.setDescription(` :small_orange_diamond: <@${userid}> is hosting the next session. (${carddata.sessions[0].StartTime})
        :small_orange_diamond: Please make sure to join the game soon. 
        :small_orange_diamond: If you are not there 5 mins before it starts somone will take over. \n \n __**Links:**__ \n **[Game](https://www.roblox.com/games/649197432/Go-Karting-Xtreme-BETA)** \n **[Trello](https://trello.com/b/VCX0Umx5/session-schedule)**`);
        			let dmembed = new Discord.MessageEmbed()
				.setColor('#53fd01')
				.setTitle(`> __**Reminder!**__`)
				.setThumbnail(
					'https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png'
				)
				.setDescription(` :small_orange_diamond: Your session is being hosted  next . (${carddata.sessions[0].StartTime})
        :small_orange_diamond: Please make sure to join the game soon. 
        :small_orange_diamond: If you are not there 5 mins before it starts someone will take over. \n \n __**Links:**__ \n **[Game](https://www.roblox.com/games/649197432/Go-Karting-Xtreme-BETA)** \n **[Trello](https://trello.com/b/VCX0Umx5/session-schedule)**`);
console.log(carddata.sessions[0].Host)
			client.channels.cache
				.get(`839524483308322826`)
				.send(`|| <@${userid}> ||`, userembed);
        let user = client.users.cache.get(userid)
        user.send(dmembed)
} else if(carddata.sessions[0].Host === 'Unknown') {
			



			let neededembed = new Discord.MessageEmbed()
				.setColor('#53fd01')
				.setTitle(`> __**Host Needed!**__`)
				.setThumbnail(
					'https://cdn.discordapp.com/icons/814232441510035518/f4bfed94c02e1da3cc35b514234a62ee.png'
				)
				.setDescription(
					`A host is needed for the ${
						carddata.sessions[0].StartTime
					} BST session! \n \n __**Links:**__ \n **[Game](https://www.roblox.com/games/649197432/Go-Karting-Xtreme-BETA)** \n **[Trello](https://trello.com/b/VCX0Umx5/session-schedule)**`
				);
			client.channels.cache
				.get(`839524483308322826`)
				.send(`|| <@&840918473252405269> ||`, neededembed);
		}

	// we check every 15 minutes if a session is due
});

/*for (i = 0; i < trellocardsinlist; i++) { 
  if trellocard[i].name.includes(final) {
card = trellocard[i]
  }
 }
 
*/

client.on('error', () => {
	client.login(process.env['token']);
});
client.login(process.env['token']);

/*async function yes() {
    let response;
    try {
        response = await Trello.board.search('VCX0Umx5');
    } catch (error) {
        if (error) {
            console.log('error ', error);
        }
    }
}
yes() */

function ordinal_suffix_of(i) {
	var j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + 'st';
	}
	if (j == 2 && k != 12) {
		return i + 'nd';
	}
	if (j == 3 && k != 13) {
		return i + 'rd';
	}
	return i + 'th';
}

//Uptime robot thingy

const express = require('express');
const app = express();

app.get('/', (request, response) => {
	response.sendStatus(200);
});

let listener = app.listen('3000');
	var today = new Date();
	var t = new Date();
  	t.setMinutes(today.getMinutes() + 10);
	var th = t.getHours(); // get the hours of the time we wanna check
	var tm = t.getMinutes(); //get the minutes of the time we wanna check
	th = th + 1; // GMT to BST
	console.log(tm);

	if (tm.toString().length < 2)
		// if its a single digit (18:1) for example, we change it to (18:01)
		tm = '0' + tm;

	var final = th + ':' + tm;
	// console.log(final)

	var datern = new Date();

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
	var dw = datern.getDate();
	var dm = datern.getMonth();
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	dm = months[dm];
	dw = ordinal_suffix_of(dw);
	var finaldate = dd + ' ' + dw + ' ' + dm;
async function test() {
await fetch(`https://*****..bloxtech.tech//******//get?today=${dd}%20${dw}%20${dm}&hour=${th}&minute=${tm}&key==*************************5`)
  .then(response => response.json())
  .then(data => {
    console.log(`https://*****.bloxtech.tech/******/get?today=${dd}%20${dw}%20${dm}&hour=${th}&minute=${tm}&key=*************************5`)
console.log(data)
console.log(data.sessions[0])
  });

  
}
test()
