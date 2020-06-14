const { Command } = require('discord.js-commando');
const discord = require('discord.js');
const config = require('../../config.json')


module.exports = class Ban extends Command {
    constructor(client) {
		super(client, {
			name: 'ban',
			group: 'admin',
			memberName: 'ban',
            description: "Bans a user. If a reason is **NOT** given, 'No reason given' is the reason",
            userPermissions: ['BAN_MEMBERS'],            
            args: [
                {
                    type: "user",
                    prompt: "",
                    key: "user"
                },
                {
                    type: "string",
                    label: "reason",
                    prompt: "",
                    key: "string",
                    default: "No reason given"
                }],
                
                argsPromptLimit: 0
		});
	}
    run(message, { user, string }) {
        message.guild.member(user).ban({reason: string})
        message.say(`**${user.tag}** has been banned.`)

        let embed = new discord.MessageEmbed()
        .setColor('#a30000')
        .setAuthor(`${user.tag} was banned by ${message.author.tag}`, user.avatarURL({type: 'png'}))
        .addField('Banned Time', message.createdAt)
        .addField('Banned Reason', string)
        .setFooter('Banned user ID: ' + user.id);
        message.guild.channels.cache.get(config['Channels']['Log']).send({embed: embed})
    }
};