const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
module.exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.has(ayarlar.kayıtcıRolleri) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed().setColor('RANDOM')
.setDescription(`Bu Komutu Kullanmak İçin Yetkin Yetersiz`).setFooter(`Cross was here!`).setTimestamp())
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let data = datab.fetch(`isimlergösterme.${member.id}.toplama`);
    if(!data) return message.channel.send(new MessageEmbed().setDescription(`${member}, Kullanıcısının Eski İsim Geçmişi Bulunmamakta`).setColor('RANDOM').setTimestamp())
  let isimleriyazdır = data.filter(member => member.userID === member.id).map((cross, index) => `\`${index + 1}.\` • \`${cross.İsim}\` (<@&${cross.Cinsiyet ? cross.Cinsiyet : cross.Cinsiyet}>) `).splice(0,30)
message.channel.send(new MessageEmbed().setColor('RANDOM').setFooter('Cross was here!').setTimestamp()
.setDescription(`${member}, Kullanıcısının Veri Tabanındaki İsimleri: \n
${isimleriyazdır.join("\n")}`)).then(m => m.delete({timeout: 10000}));
   
} 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimler"],
  PermLevel: 0
};

 

exports.help = {
  name: "isimler",
  description: "isimler",
  usage: "isimler"
};// CODED BY CROSS 