const Discord = require("discord.js");
const db = require('quick.db');
const rol = require("../roller.json")
const ayar = require("../ayarlar.json")
const kdb = new db.table("kullanici")

exports.run = (client, message, args) => {
    let footer = ayar.footer
    const sunucu = message.member.guild
    if (!message.member.roles.cache.has(rol.kayıtcıRolleri) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM').setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setDescription(`${message.author}, Bu Komutu Kullanmak İçin Gerekli Yetkiye Sahip Değilsin!`).setFooter('Cross was here!')
        .setTimestamp())
    let erkek1 = message.guild.roles.cache.find(r => r.id == rol.erkek1)
    let kız1 = message.guild.roles.cache.find(r => r.id == rol.kız1)
    let tagrol = message.guild.roles.cache.find(r => r.id == rol.tagRol)

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM').setDescription(`${message.author}, Bir Kullanıcı Belirt!`).setTimestamp())
    const cross = message.guild.member(member)
let nick = args.slice(1).join(' ');
    
    if(!nick) return message.channel.send(new Discord.MessageEmbed()
        .setColor('GREEN').setDescription(`Geçerli Bir İsim Ve Yaş Belirtmelisin!`).setFooter(footer).setTimestamp())
  

if(db.fetch(`taglıAlım.${message.guild.id}`)) {
  if(!member.user.username.includes(rol.tag) && !member.roles.cache.has(rol.vipRolu) && !member.roles.cache.has(rol.boosterRol)) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${member}, Adlı Kullanıcı Tagımızı Almadıgı İcin Kayıt Tamamlanamadı!`))
   
   }
  
  
if(!cross.user.username.includes(rol.tag)) {
  cross.setNickname(`${rol.unTag} ${nick}`)
  
} else {
  cross.setNickname(`${rol.tag} ${nick}`)
  cross.roles.add(tagrol)
}

const isim = new Discord.MessageEmbed()
        .setDescription(`${member} Adlı Kullanıcının İsmi "${nick}" Olarak Güncellendi \n
 Cinsiyet Belirlemek İçin Emojilere Basabilirsin.`)
        .setFooter("Cross was here").setTimestamp()
        .setColor("GOLD")
    message.channel.send(isim).then(async mesaj => {
        await mesaj.react('♂')
        await mesaj.react('♀')

        const erkekemoji = (reaction, user) => reaction.emoji.name === '♂' && user.id === message.author.id;
        const kadinemoji = (reaction, user) => reaction.emoji.name === '♀' && user.id === message.author.id;

        const erkek = mesaj.createReactionCollector(erkekemoji, { time: 15000 });
        const kadin = mesaj.createReactionCollector(kadinemoji, { time: 15000 });

        erkek.on('collect', async cross2 => {
            mesaj.reactions.removeAll()

             cross.roles.add(rol.erkek1)
           cross.roles.add(rol.erkek3)
           cross.roles.add(rol.erkek2)
            cross.roles.remove(rol.kayıtsızRolleri)

            const erkekEmbed = new Discord.MessageEmbed()
                .setColor('BLUE').setDescription(`${cross}, Kullanıcısına ${erkek1} Rolü Verildi.`)
            mesaj.edit(erkekEmbed).then(m => m.delete({timeout: 10000}))
            await mesaj.react("802189317941231647")
db.add(`isimler.${cross.id}.toplam1`, 1 );
kdb.add(`yetkili.${message.author.id}.erkek`, 1);
kdb.add(`yetkili.${message.author.id}.toplam`, 1)  
db.add(`kayıtNo.${sunucu.name}`, 1)
          db.push(`isimlergösterme.${cross.id}.toplama`, {İsim: nick, Yetkili: message.author.id , Cinsiyet: rol.erkek1});
        })

        kadin.on('collect', async cross2 => {
            mesaj.reactions.removeAll()
            cross.roles.add(rol.kız1)
           cross.roles.add(rol.kız3)
           cross.roles.add(rol.kız2)
            cross.roles.remove(rol.kayıtsızRolleri)

            const kadinEmbed = new Discord.MessageEmbed()
                .setColor('PURPLE').setDescription(`${cross}, Kullanıcısına ${kız1} Rolü Verildi.`)
            mesaj.edit(kadinEmbed).then(m => m.delete({timeout: 10000}))
            await mesaj.react("802189317941231647")
db.add(`isimler.${cross.id}.toplam1`, 1 );
kdb.add(`yetkili.${message.author.id}.kadın`, 1); 
kdb.add(`yetkili.${message.author.id}.toplam`, 1)  
db.add(`kayıtNo.${sunucu.name}`, 1)

    
await db.push(`isimlergösterme.${cross.id}.toplama`, {İsim: nick,Yetkili: message.author.id ,Cinsiyet: rol.kız1,});
  
        })
    })

    //------------------------------------------------ROL-VERME-----------------------------------------------\\     STG

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["isim", "nick"],
    permLevel: 0
};
exports.help = {
    name: "kayıt",
    description: "kayıt",
    usage: "kayıt"
};