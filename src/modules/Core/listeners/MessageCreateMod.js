const { Listener } = require('axoncore');

class MessageCreateMod extends Listener {
    /**
     * @param {import('axoncore').Module} module
     * @param {import('axoncore').ListenerData} data
     */
    constructor(module, data = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'message';
        /** Event name (Function name) */
        this.label = 'messageCreateMod';

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
        if (guildConfig) {
            console.log(`Prefix: ${guildConfig.prefixes}`);
        }
        return Promise.resolve();
    }
}

module.exports = MessageCreateMod;
