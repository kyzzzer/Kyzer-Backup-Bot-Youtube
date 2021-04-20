const backup = require('discord-backup');
const config = require('../config.json');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send('<a:783700473419923476:831443318655025192> Bu Sunucudan Bir Yedek Oluşturmak İçin **MESAJLARI YÖNET** yetkiniz olmalıdır.');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('<a:onaylandi:831443319661395978> Sunucu Yedeği Oluşturuldu! İşte IDniz: `'+backupData.id+'`! Kullanımı `'+config.prefix+' Yedek Yükleme '+backupData.id+'` yüklemeyi farklı bir sunucuda yapmak için!');
 //darkfire code tarafından yapılmıştır!
    }).catch(() => {

        return message.channel.send('<a:783700473419923476:831443318655025192> Başarısız! Lütfen Botun Yönetici Olup Olmadığını Kontrol edin!'); //darkfire code tarafından yapılmıştır!
 //darkfire code tarafından yapılmıştır!
    }); //darkfire code tarafından yapılmıştır!
 //darkfire code tarafından yapılmıştır!
}; //darkfire code tarafından yapılmıştır!
