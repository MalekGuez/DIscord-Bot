const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: 'unmute',
    description: 'Mute a specified user.',
    category: 'moderation',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: false,
    examples: ['unmute @user 10m reason'],
    options: [
        {
            name: "target",
            description: "Provide a user.",
            type: "USER",
            required: true
        }
    ],
    runInteraction: async (client, interaction) => {
        const target = interaction.options.getMember("target");   
        
  
        if(!target.isCommunicationDisabled()) return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription("⛔ This member isn't muted.")]});

        target.timeout(null);
        
        client.channels.cache.get(`1000493461876789300`).send({embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ ${target} has been unmuted`)]});


        interaction.reply({content: '✅', fetchReply: true}).then((msg) => msg.delete()).catch(console.error);
    }
}