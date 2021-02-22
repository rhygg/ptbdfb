const { Listener } = require('axoncore');

class GuildCreate extends Listener {
    /**
     * @param {import('axoncore').Module} module
     * @param {import('axoncore').ListenerData} data
     */
    constructor(module, data = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'guildCreate';
        /** Event name (Function name) */
        this.label = 'guildCreate';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Guild Create event',
        };
    }

    /**
     * @param {import('discord.js').Guild} guild
     * @param {import('axoncore').GuildConfig} guildConfig
     */
    execute(guild, guildConfig) { // eslint-disable-line 
        console.log(`Guild Created: ${guild.name} [${guild.id}]`);
        return Promise.resolve();
    }
}

module.exports = GuildCreate;
