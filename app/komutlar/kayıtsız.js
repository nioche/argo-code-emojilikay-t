const { MessageEmbed } = require('discord.js')
const rol = require("../roller.json")
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
let kayıtsız = message.guild.roles.cache.find(r => r.id == rol.kayıtsızRolleri)
if(!message.member.roles.cache.has(rol.kayıtcıRolleri) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed()
.setColor('BLUE').setAuthor(message.author.tag, message.authot.avatarURL({ dynamic: true })))
.setDescription(`${message.author}, Bu Komutu Kullanamazsın.`).setTimestamp().then(m => m.delete({timeout: 5000}))
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.channel.send(new MessageEmbed() .setColor('BLACK').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`${message.author}, Bir Kullanıcı Belirtmelisin.`)).setTimestamp().then(m => m.delete({timeout: 5000}))
  member.setNickname(`${rol.unTag} İsim Yaş`)
  member.roles.add(kayıtsız)
  member.roles.cache.forEach(r => {
  member.roles.remove(r.id)
  })
  
  message.channel.send(new MessageEmbed()
  .setColor('GRAY').setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setDescription(`${member}, Adlı Kullanıcıya ${kayıtsız} Rolü Verildi.`)
  .setTimestamp()
  ).then(m => m.delete({timeout: 7000}))
}
exports.conf = {
  enabled: true,
  guild0nly: true,
  aliases: ["kayıtsız","unregister"],
  PermLeve: 0
};
exports.help = {
  name: "kayıtsız",
  description: "kayıtsız",
  usage: "kayıtsız"
};




