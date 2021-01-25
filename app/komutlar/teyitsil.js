const Discord = require("discord.js");
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
const rol = require('../roller.json')
const kdb = new datab.table("kullanici")

   module.exports.run = async (client, message, args) => {
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
 
 if (!message.member.roles.cache.has(rol.kayıtcıRolleri) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setDescription(`${message.author}, Bu Komutu Kullanmak İçin Gerekli Yetkiye Sahip Değilsin!`).setFooter('Cross was here!')
        .setTimestamp())  
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  
    if(!member) return message.channel.send(new Discord.MessageEmbed()
.setDescription(`${message.author}, Bir Kullanıcı Belirtmelisin!`).setTimestamp()
.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
.setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 7000}));
    
     
  
  
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
//-------------------------------------DATA BASE------------------------------------------\\
  
  let erkek1 = kdb.fetch(`yetkili.${member.id}.erkek`) 
  let kadin1 = await kdb.fetch(`yetkili.${member.id}.kadin`) 
  let kayıtlar1 = await kdb.fetch(`yetkili.${member.id}.toplam`);  
  

//-------------------------------------DATA BASE------------------------------------------\\
  
   
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
/*if(erkek1 === null) return message.channel.send (new Discord.MessageEmbed().setDescription(`${member}, Kullanıcısının Kayıt Verisi Bulunamadı`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(kadin1 === null) return message.channel.send (new Discord.MessageEmbed().setDescription(`${member}, Kullanıcısının Kayıt Verisi Bulunamadı`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(kayıtlar1 === null) return message.channel.send (new Discord.MessageEmbed().setDescription(`${member}, Kullanıcısının Kayıt Verisi Bulunamadı`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(erkek1 === undefined) return message.channel.send (new Discord.MessageEmbed().setDescription(`${member}, Kullanıcısının Kayıt Verisi Bulunamadı`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(kadin1 === undefined) return message.channel.send (new Discord.MessageEmbed().setDescription(`${member}, Kullanıcısının Kayıt Verisi Bulunamadı`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
if(kayıtlar1 === undefined) return message.channel.send (new Discord.MessageEmbed().setDescription(`${member}, Kullanıcısının Kayıt Verisi Bulunamadı`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('0xd85555').setTimestamp()).then(x => x.delete({timeout: 10000}));
   */ 
   //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
  
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   if (member) {
   let e1 = kdb.delete(`yetkili.${member.id}.toplam`)
   let k1 = kdb.delete(`yetkili.${member.id}.kadin`)
   let k2 = kdb.delete(`yetkili.${member.id}.kadın`)
   let t1 = kdb.delete(`yetkili.${member.id}.erkek`)|| [];
   message.channel.send(new Discord.MessageEmbed()
.setDescription(`${member}, Adlı Kullanıcının Kayıt Verileri Temizlendi!`)
.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
.setColor('BLACK').setTimestamp()).then(x => x.delete({timeout: 10000}));
     
  
 
}
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
}
  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["teyitsil", "teyitsıfırla", "teyit-sıfırla"],
  PermLevel: 0
};

 

exports.help = {
  name: "kayıtsıfırla",
  description: "teyitsil",
  usage: "teyitsil"
};