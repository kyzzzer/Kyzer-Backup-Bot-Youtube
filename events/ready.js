module.exports = (client) => {
    console.log(`HAZIR! ${client.user.tag} Hizmet Veriyor ${client.channels.cache.size} kanallar ${client.guilds.cache.size} sunucular, Toplamda ${client.users.cache.size} Kullanıcı!`);
};
