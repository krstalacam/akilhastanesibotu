const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} aktif.`);
});

client.on('message', msg => {
    if (msg.content === 'sa') {
        msg.channel.send('hoş geldin');
    }
});

const axios = require('axios');
require('dotenv').config();



const dolarchannelId = '1122188344802148404';
const prefix = '&';

const commands = [
  {
    name: 'dolar',
    description: 'Dolar kurunu gösterir.',
    execute: async (message) => {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const exchangeRate = response.data.rates.TRY;
        message.delete();
        const embed = new Discord.MessageEmbed()
          .setColor('#4dba24')
          .setTitle('')
          .setDescription('1 Dolar = '+ exchangeRate +' Türk Lirası');
          message.channel.send(embed);


    },
  },
  // Diğer komutları buraya ekleyebilirsiniz
  {
    name: '',
    description: 'Sık kullanılanları gösterir.',
    execute: async (message) => {

          const commandList = commands
        .filter((cmd) => cmd.name === 'dolar')
        .map((cmd) => `**${prefix}${cmd.name}**: ${cmd.description}`)
        .join('\n');

      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Sık Kullanılan Komutlar')
        .setDescription(commandList);

      message.channel.send(embed);
      message.delete();
    },
  },
  // Diğer komutları buraya ekleyebilirsiniz


];

client.on('mesAsage', async (message) => {
  if (message.channel.id === dolarchannelId && message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.find((cmd) => cmd.name === commandName);

    if (!command) {
    message.author.send('Geçersiz komut. Kullanılabilir komutları görmek için "/help" yazabilirsiniz.')
    message.delete();
  }
  else
    await command.execute(message, args);


  }
});


// /help komutunu eklemek için
commands.push({
  name: 'help',
  description: 'Kullanılabilir komutları gösterir.',
  execute: (message) => {
    const commandList = commands.map((cmd) => `**${prefix}${cmd.name}**: ${cmd.description}`).join('\n');
    message.author.send(`Kullanılabilir Komutlar:\n${commandList}`);
    message.delete();

  },
});




client.login('MTEyMjIwNTI3OTM4ODQ1NDk4Mw.Gnm8HC.XSC2NavQJI9wExSWeQlQpYz49vvek5Be1hBeuc');
