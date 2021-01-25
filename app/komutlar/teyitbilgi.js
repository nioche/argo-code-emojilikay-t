const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
const datab = require('quick.db')
const rol = require("../roller.json")
const kdb = new datab.table("kullanici")
module.exports.run = async (client, message, args) => {
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  if(!message.member.roles.cache.has(rol.kayıtcıRolleri) && (!message.member.hasPermission("ADMINISTRATOR")))  return message.channel.send(new Discord.MessageEmbed().setDescription(`**Gerekli yetikiye sahip değilsin.**`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 5000}));
 
  let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    

  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
  
    if(!kullanıcı) {

    let erkek = kdb.fetch(`yetkili.${message.author.id}.erkek`);
    let kadın = kdb.fetch(`yetkili.${message.author.id}.kadın`);
    let kayıtlar = kdb.fetch(`yetkili.${message.author.id}.toplam`);  
    

    if(erkek === null) erkek = "0"
    if(erkek === undefined) erkek = "0"
    if(kadın === null) kadın = "0"
    if(kadın === undefined) kadın = "0"
    if(kayıtlar === null) kayıtlar = "0"
    if(kayıtlar === undefined) kayıtlar = "0"

    const kayıtlar2 = new Discord.MessageEmbed()
 .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setColor('#2f0000')
.setDescription(`${message.author}, Toplam **${kayıtlar}** Kayıtın Var. (**${erkek}** Erkek, **${kadın}** Kadın)`)
    .setFooter(`Cross was here!`).setTimestamp()
    message.channel.send(kayıtlar2).then(m => m.delete({timeout: 15000}))
    
      
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

};


  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
if(kullanıcı) {
let erkek1 = await kdb.fetch(`yetkili.${kullanıcı.id}.erkek`) 
let kadin1 = await kdb.fetch(`yetkili.${kullanıcı.id}.kadın`) 
let kayıtlar1 = await kdb.fetch(`yetkili.${kullanıcı.id}.toplam`);  
    

if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
if(erkek1 === null) erkek1 = "0"
if(erkek1 === undefined) erkek1 = "0"
if(kadin1 === null) kadin1 = "0"
if(kadin1 === undefined) kadin1 = "0"
    const kayıtlar3 = new Discord.MessageEmbed()
 .setAuthor(kullanıcı.tag, kullanıcı.avatarURL({dynamic: true}))
  .setColor('#00096c')
.setDescription(`${kullanıcı}, Kullanıcısının Toplam **${kayıtlar1}** Kayıtı Var. (**${erkek1}** Erkek, **${kadin1}** Kadın)`)
    .setFooter(`Cross was here!`).setTimestamp()
    message.channel.send(kayıtlar3).then(m => m.delete({timeout: 15000}))
  
  }
  
  
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["teyitbilgi", "kayıtsay", "teyitsay"],
    permLvl: 0,
}

exports.help = {
      name: "teyitbilgi"
  
}