const Discord = require("discord.js");
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
const rol = require('../roller.json')

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
    
     
  
  

  
  let isimler = datab.fetch(`isimlergösterme.${member.id}.toplama`) 
   
  

//-------------------------------------DATA BASE------------------------------------------\\
  
   
   
    
  
  
  
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
   if (member) {
   let i2 = datab.delete(`isimlergösterme.${member.id}.toplama`)
   let i1 = datab.delete(`isimlergösterme.${member.id}.toplama`)|| [];
   message.channel.send(new Discord.MessageEmbed()
.setDescription(`${member}, Adlı Kullanıcının İsim Verileri Temizlendi!`)
.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
.setColor('BLACK').setTimestamp()).then(x => x.delete({timeout: 10000}));
     
  
 
}
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
  
  
}
  

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimsil", "isimler-sıfırla", "isim-sıfırla"],
  PermLevel: 0
};

 

exports.help = {
  name: "isimsil",
  description: "isimlersıfırla",
  usage: "isimsıfırla"
};