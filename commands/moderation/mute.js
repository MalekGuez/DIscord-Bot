const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Mute a specified user.',
    category: 'moderation',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: false,
    examples: ['mute @user 10m reason'],
    options: [
        {
            name: "target",
            description: "Provide a user.",
            type: "USER",
            required: true
        },
        {
            name: "duration",
            description: "Provide a custom time. (15m, 30m, 1h, 1d)",
            type: "STRING",
            required: true
        },
        {
            name: "reason",
            description: "Provide a reason.",
            type: "STRING",
            required: false
        }

    ],
    runInteraction: async (client, interaction) => {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "No reason specified";
        const duration = interaction.options.getString("duration") || "30m";
        const convertedTime = ms(duration);
        
        if(!convertedTime) return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription("⛔ The duration time must be valid (ex: 1s, 1m, 1d).")]});

        if(!target.moderatable) return interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription("⛔ You cannot mute this person.")]});

        target.timeout(convertedTime, reason);
        
        client.channels.cache.get(`1000493461876789300`).send({embeds: [new MessageEmbed().setColor('GREEN').setDescription(`✅ ${target} has been muted for ${duration} for : ${reason}\n\n ||${target.id}||`)]});

        interaction.reply({content: '✅', fetchReply: true}).then((msg) => msg.delete()).catch(console.error);
    }
}