const Discord = require('discord.js');
const client = new Discord.Client();


require('dotenv').config();


const axios = require('axios');
const puppeteer = require('puppeteer');

const dolarchannelId = '1122923489402302464';
const prefix = '$';

const commands = [
  {
    name: 'dolar',
    description: 'Dolar kurunu gösterir.',
    execute: async (message) => {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();

      await page.goto('https://www.google.com/finance/quote/USD-TRY?sa=X&ved=2ahUKEwjfzOTbl97_AhVdQvEDHaq5B3UQmY0JegQIBhAc');

      const exchangeRateElement = await page.$('.YMlKec.fxKbKc');
      const exchangeRate = await page.evaluate(element => element.textContent, exchangeRateElement);
      await browser.close();

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

        message.delete();
        message.channel.send(embed);
    },
  },
  // Diğer komutları buraya ekleyebilirsiniz


];

client.on('message', async (message) => {
  if (message.channel.id === dolarchannelId && message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.find((cmd) => cmd.name === commandName);

    if (!command) {
    message.author.send('Geçersiz komut. Kullanılabilir komutları görmek için "&help" yazabilirsiniz.')
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


client.login('MTEyMjIwNTI3OTM4ODQ1NDk4Mw.GZ7lg8.WxRMW5O1fC7mXS-AJ4ry36N6BANstesS9-g9k8');
