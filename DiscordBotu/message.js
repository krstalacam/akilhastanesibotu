const Discord = require('discord.js');
const client = new Discord.Client();

const userCooldowns = new Map();

const messagechannelId = '1122504188883107850';

client.on('message', async (message) => {
    if (!message.author.bot && message.channel.id === messagechannelId) {
      const content = message.content.toLowerCase();
      const authorId = message.author.id;

      const himessage = ['selam'];
      const hianswer = ['selamm', 'selam kankii', 'selamm baby'];
      let userHiCooldown = userCooldowns.get(authorId)?.hiCooldown;

      const gecemessage1 = ['iyi', 'ıyı', 'ii'];
      const gecemessage2 = ['gclr', 'gecel', 'gecel'];
      const geceanswer1 = ['iyi ', 'ii', 'güzel', 'tatlış'];
      const geceanswer2 = ['geceler', 'uykular', 'rüyalar'];
      let userGeceCooldown = userCooldowns.get(authorId)?.geceCooldown;

        if (himessage.some(word => content.includes(word))) {
          if (!userHiCooldown || userHiCooldown < Date.now()) {
              userHiCooldown =  Date.now() + ((Math.floor(Math.random() * (20 - 2 + 1)) + 2)*60*1000);
              userCooldowns.set(authorId, { hiCooldown: userHiCooldown });
              const randomAnswer1 = hianswer[Math.floor(Math.random() * hianswer.length)];
              message.channel.send(randomAnswer1);}}

        else if (gecemessage1.some(word => content.includes(word)) && gecemessage2.some(word => content.includes(word))) {
          if (!userGeceCooldown || userGeceCooldown < Date.now()) {
              userGeceCooldown = Date.now() + ((Math.floor(Math.random() * (20 - 2 + 1)) + 2)*60*1000);
              userCooldowns.set(authorId, { geceCooldown: userGeceCooldown });
              const randomAnswer1 = geceanswer1[Math.floor(Math.random() * geceanswer1.length)];
              const randomAnswer2 = geceanswer2[Math.floor(Math.random() * geceanswer2.length)];
              message.channel.send(randomAnswer1 + ' ' + randomAnswer2); }}





}});

client.login('MTEyMjIwNTI3OTM4ODQ1NDk4Mw.GjDT4G.Ms4d5J5t6TBVG-CZABOSpeYNxistRJMa0pZ3ek');
