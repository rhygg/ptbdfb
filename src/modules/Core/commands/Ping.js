const { Command, CommandOptions, CommandResponse } = require('axoncore');

const Pong = require('./Ping_Pong');

class Ping extends Command {
    /**
     * @param {import('axoncore').Module} module
     */
    constructor(module) {
        super(module);

        this.label = 'ping';
        this.aliases = [
            'ping',
            'pang',
            'pung',
        ];

        this.hasSubcmd = true;

        this.info = {
            owners: ['Rhydderchc'],
            name: 'ping',
            description: 'Ping the bot.',
            usage: 'ping',
            examples: ['ping'],
        };

        /**
         * @type {CommandOptions}
         */
        this.options = new CommandOptions(this, {
            argsMin: 0,
            guildOnly: false,
        } );
    }

    init() {
        return [Pong];
    }

    /**
     * @param {import('axoncore').CommandEnvironment} env
     */
    async execute( { msg } ) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'Pong! ');
        if (!mess) {
            return new CommandResponse( { success: false } );
        }

        const diff = (Date.now() - start);
        this.editMessage(mess, `Pong! \`${diff}ms\``);

        return new CommandResponse( { success: true } );
    }
}

module.exports = Ping;
