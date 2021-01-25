const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const rol = require('./roller.json');
const db = require('quick.db')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment') 
require('./util/eventLoader')(client);
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${  files.undefined} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if (!message.guild) {
      return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 5;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('ready', () => {
  console.log(client.user.username)
})

client.login(ayarlar.token)
/// KOMUTLAR

client.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


client.on("guildMemberAdd", member => {
  member.roles.add(rol.kayıtsızRolleri); 
});

   


client.on("guildMemberAdd", member => {
 let date = moment(member.user.createdAt)
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
      
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
      
    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
        
      
    string = string.trim();

    let guild = member.client.guilds.cache.get(rol.guildID)
    let log = guild.channels.cache.get(rol.hgkanal);
    let endAt = member.user.createdAt
    let gün = moment(new Date(endAt).toISOString()).format('DD')
    let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    let kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
    log.send(`
${member} Aramıza Hoşgeldin

Hesabın **${kuruluş} (${string})** önce oluşturulmuş.

Sunucu kurallarımız <#${rol.kurallar}> kanalında yazıyor okumayı unutmayın. Unutma kayıt işlemi kuralları okuduğunu varsayarak gerçekleştirilecek.
      
<@&${rol.kayıtcıRolleri}> Seninle ilgilenicektir.

Seninle birlikte **${member.guild.memberCount}** üyeye ulaştık! İyi Eğlenceler. :tada::tada:
`)
});
    

client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(20, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") || x == " ") {
   let rol = member.guild.roles.cache.find(r => r.id == "801844240740122686") //Şüpheli rolünün IDsini girin.
   let kayıtsız = member.guild.roles.cache.find(r => r.id == '801844240337862706')
   member.roles.add(rol)
   member.roles.remove(kayıtsız)
member.send(`
Selam ${member} !
Hesabın 7 Gün Gibi Kısa Bir Süreden Önce Oluşturulduğu İçin Şüpheli Hesap Rolünü Verdim Bir Yanlışlık Olduğunu Düşünüyorsan Üst Yetkililerle İletişime Geçebilirsin!`)
setTimeout(() => {
  member.roles.remove(kayıtsız);
}, 1000)
   } else {
     
   }
});   




client.on("message", async message => {
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(ayarlar.prefix)) return;
  if (message.author.id !== ayarlar.sahip && message.author.id !== message.guild.owner.id) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let embed = new Discord.MessageEmbed().setColor("#00ffdd").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setFooter(`${client.users.cache.has(ayarlar.sahip) ? client.users.cache.get(ayarlar.sahip).tag : "Cross"} was here!`).setTimestamp();
  
  // Eval
  if (command === "eval" && message.author.id === ayarlar.sahip) {
    if (!args[0]) return message.channel.send(`Kod belirtilmedi`);
      let code = args.join(' ');
      function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
      message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };
  } });