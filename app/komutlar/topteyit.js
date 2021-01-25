const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require("../ayarlar.json")
const moment = require("moment");
const ms = require('ms')
const rol = require('../roller.json')
const kdb = new db.table("kullanici")

   module.exports.run = async (client, message, args) => {
 let embed = new Discord.MessageEmbed().setThumbnail(message.guild.iconURL({dynamic: true})).setColor("RANDOM").setTimestamp();
  let data = await kdb.get("yetkili") || {};
  let arr = Object.keys(data);
  let listedMembers = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kadın || 0)) - Number((data[a].erkek || 0) + (data[a].kadın || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} Toplam **${client.sayilariCevir((data[value].erkek || 0) + (data[value].kadın || 0))}** (**${client.sayilariCevir((data[value].erkek || 0))}** Erkek **${client.sayilariCevir((data[value].kadın || 0))}** Kadın)`).splice(0, 30);
  message.channel.send(embed.setDescription(`${listedMembers.join("\n") || "Teyit veritabanı bulunamadı!"}`)).catch();
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["topteyit", "tt", "top-teyit"],
  PermLevel: 0
};

 

exports.help = {
  name: "topteyit",
  description: "tt",
  usage: "tt"
};