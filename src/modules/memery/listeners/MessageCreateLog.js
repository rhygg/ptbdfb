const { Listener } = require('axoncore');

class MessageCreateLog extends Listener {
    /**
     * @param {import('axoncore').Module} module
     * @param {import('axoncore').ListenerData} data
     */
    constructor(module, data = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'message';
        /** Event name (Function name) */
        this.label = 'messageCreateLog';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    /**
     * @param {import('discord.js').Message} message
     * @param {import('axoncore').GuildConfig} guildConfig
     */
    execute(message, guildConfig) { // eslint-disable-line
        if (!message.channel.guild) {
            return Promise.resolve();
        }
        console.log(`Msg ${message.channel.guild.id}`);
        return Promise.resolve();
    }
}

module.exports = MessageCreateLog;
