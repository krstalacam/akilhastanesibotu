const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});


require('./dolar.js');
require('./message.js');




client.login('MTEyMjIwNTI3OTM4ODQ1NDk4Mw.GZ7lg8.WxRMW5O1fC7mXS-AJ4ry36N6BANstesS9-g9k8');
