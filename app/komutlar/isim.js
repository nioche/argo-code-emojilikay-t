const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
const rol = require("../roller.json")
module.exports.run = async (client, message, args) => {
  const hataembed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor('RANDOM').setDescription(`${message.author}, Bu Komutu Kullanamazsın!`).setTimestamp()
  if(!message.member.roles.cache.has(rol.kayıtcıRolleri) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(hataembed)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send(new MessageEmbed()
        .setColor('RANDOM').setDescription(`${message.author}, Bir Kullanıcı Belirt!`).setTimestamp())
    const cross = message.guild.member(member)
    
  let nick = args.slice(1).join(' ');
  if(!nick) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${message.author}, Bir İsim Belirt!`).setColor('RANDOM'))
   
  
  if(cross.user.username.includes(rol.tag)) {
cross.setNickname(`${rol.tag} ${nick}`)
} else {
  cross.setNickname(`${rol.unTag} ${nick}`)
}
const embedd = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setColor('RANDOM').setTimestamp()
.setDescription(`${cross}, Kullanıcısının İsmi Başarıyla "${nick}" Olarak Değiştirildi`)
message.channel.send(embedd).then(m => m.delete({timeout: 70000}))
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["i"],
  PermLevel: 0
};

 

exports.help = {
  name: "i",
  description: "i",
  usage: "i"
};// CODED BY CROSS 