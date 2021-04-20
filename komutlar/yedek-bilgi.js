const Discord = require('discord.js');
const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send('<a:783700473419923476:831443318655025192> Bu Sunucudan Bir Yedek Oluşturmak İçin **MESAJLARI YÖNET** yetkiniz olmalıdır.');
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send('<a:783700473419923476:831443318655025192> Please specify a valid backup ID!');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('Sunucu Yedeği', backup.data.iconURL)
            .addField('Sunucu Adı', backup.data.name)
            .addField('Boyutu', backup.size + ' kb')
            .addField('Tarihinde Oluşturuldu', formattedDate)
            .setFooter('Yedekleme ID: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'Sunucu Yedeği Bulunamadı!')
            return message.channel.send('<a:783700473419923476:831443318655025192> Yedeklenen ID bulunamadı '+backupID+'!');
        else
            return message.channel.send('<a:783700473419923476:831443318655025192> Bir Hata Oluştu : '+(typeof err === 'string') ? err : JSON.stringify(err));

    });

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['backup-info', 'backupinfo', 'infobackup', 'yedekbilgi'],
    permLevel: 3
  };
  
  exports.help = {
    name: 'yedek-bilgi',
    description: '. ',
    usage: ''
  };
