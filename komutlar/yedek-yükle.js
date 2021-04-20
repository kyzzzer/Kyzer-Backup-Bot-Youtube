const backup = require('discord-backup');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send('<a:783700473419923476:831443318655025192> Bu Sunucudan Bir Yedek Oluşturmak İçin **MESAJLARI YÖNET** yetkiniz olmalıdır.');
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send('<a:783700471759896576:831443318508224540> <a:784341652407451669:831443318650044437> Tüm sunucu kanalları, rolleri ve ayarları silinecektir. Devam etmek istiyor musun? "-Onayla" veya "iptal" yazın! ');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-onayla', 'iptal'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === '-onayla';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('<a:onaylandi:831443319661395978> Yedeklenen Sunucu Başarıyla Yüklendi!');
            
                }).catch((err) => {
            
                    if (err === 'Yedeklenen Sunucu Bulunamadı')
                        return message.channel.send('<a:783700473419923476:831443318655025192> Yedekleme ID Yanlış! '+backupID+'!');
                    else
                        return message.author.send('<a:783700473419923476:831443318655025192> Bir Hata Oluştu: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send('<a:onaylandi:831443319661395978> Başarıyla İptal Edildi!');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send('<a:783700473419923476:831443318655025192> Komut zaman aşımına uğradı! Lütfen tekrar deneyiniz .');
        })

    }).catch(() => {
        return message.channel.send('<a:783700473419923476:831443318655025192> Yedekleme IDsi Bulunamadı '+backupID+'!');
    });

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['loadbackup', 'backupload', 'yedekyükle'],
    permLevel: 3
  };
  
  exports.help = {
    name: 'yedek-yükle',
    description: '. ',
    usage: ''
  };
