const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});


require('./dolar.js');
require('./message.js');




client.login('MTEyMjIwNTI3OTM4ODQ1NDk4Mw.GjDT4G.Ms4d5J5t6TBVG-CZABOSpeYNxistRJMa0pZ3ek');
