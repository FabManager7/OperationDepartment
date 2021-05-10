const fetch = require("node-fetch");
const Discord = require("discord.js")
var Trello = require('trello-node-api')(process.env['apikey'], process.env['trellotoken']);
exports.run = async (client, message, args) => {
var unordered;


var t = new Date();
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
if(dd == 0) {
  dd = "Monday"
} else if(dd == 1) {
  dd = "Tuesday"
} else if(dd == 3) {
  dd = "Wednesday"
}else if(dd == 4) {
  dd = "Thursday"
} else if(dd == 5) {
  dd = "Friday"
}else if(dd == 6) {
  dd = "Saturday"
} else if(dd == 0) {
  dd = "Sunday"
}
var dw = datern.getDate()
var dm = datern.getMonth()
var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
dm = months[dm];
dw = ordinal_suffix_of(dw)
var finaldate = dd + " " + dw + " " + dm

await fetch(`https://api.blox.link/v1/user/${message.author.id}?guild=814232441510035518`)
  .then(response => response.json())
  .then(data => user = data);
var name;
    await fetch(`https://users.roblox.com/v1/users/${user.primaryAccount}`)
  .then(response => response.json())
  .then(data => name = data);
var done = false;

 await fetch(`https://api.trello.com/1/boards/LDw7izA9/cards/?fields=name&customFieldItems=true`).then(response => response.json())
  .then(data => unordered = data);




unordered.sort(GetSortOrder("idShort"))
console.log(unordered)













       }



function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
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
