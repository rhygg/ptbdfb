const { Command, CommandOptions, CommandPermissions, CommandResponse } = require('axoncore');

class Pong extends Command {
    /**
     * @param {import('axoncore').Module} module
     */
    constructor(module) {
        super(module);

        this.label = 'pong';
        this.aliases = ['pong'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['Rhydderchc'],
            name: 'ping pong',
            description: 'Ping the bot.',
            usage: 'ping pong',
            examples: ['ping pong'],
        };

        /**
         * @type {CommandOptions}
         */
        this.options = new CommandOptions(this, {
            argsMin: 0,
            cooldown: 10000,
            guildOnly: false,
            hidden: true,
            sendPermissionMessage: true,
        } );

        /**
         * @type {CommandPermissions}
         */
        this.permissions = new CommandPermissions(this, {
            author: {
                needed: ['MANAGE_GUILD'],
            },
            staff: {
                bypass: [...this.axon.staff.owners, ...this.axon.staff.admins],
            },
        } );
    }

    /**
     * @param {import('axoncore').CommandEnvironment} env
     */
    async execute( { msg } ) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'BADABOUM!');
        if (!mess) {
            return new CommandResponse( { success: false } );
        }

        const diff = (Date.now() - start);

        this.editMessage(mess, `BADABOUM! \`${diff}ms\``);
        return new CommandResponse( { success: true } );
    }
}

module.exports = Pong;
