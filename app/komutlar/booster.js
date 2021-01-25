const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
const rol = require("../roller.json")
module.exports.run = async (client, message, args) => {
if(!message.member.roles.cache.has("801844205567475822")) return message.react("802189318529482763")
  let reklam = ["discord.gg", ".gg", "gg"]
  let nick = args.slice(0).join(' ')
  if(!nick) return message.react("802189318529482763")
  if(reklam.some(s => nick.toLowerCase().includes(s))) {
    message.delete({timeout: 1})
    const ferzah = new MessageEmbed().setColor('RANDOM')
    .setDescription(`İsmine Reklam İçeren Bir Yazı Koyamazsınız!`)
    message.channel.send(ferzah)
    return
  }
  if(!message.member.user.username.includes(rol.tag)) {
  message.member.setNickname(`${rol.unTag} ${nick}`)
  } else if(message.member.user.username.includes(rol.tag)) {
    message.member.setNickname(`${rol.tag} ${nick}`)
  }
  message.react("802189317941231647")
  
  
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["booster","me"],
  PermLevel: 0
};

 

exports.help = {
  name: "booster",
  description: "me",
  usage: "me"
};// CODED BY CROSS 