/* eslint-disable no-unused-vars */
const nodeUtil = require('util');

const {
    Command,
    CommandPermissions,
    CommandOptions,
    CommandResponse,
    AxonEnums,
    Collection,
    Embed,
    Prompt,
    MessageCollector,
    Stack,
    Queue,
    FunctionQueue,
    AutoQueue,
    AsyncQueue,
} = require('axoncore');

class Eval extends Command {
    /**
     * @param {import('axoncore').Module} module
     */
    constructor(module) {
        super(module);

        this.label = 'eval';
        this.aliases = ['eval', 'e'];

        this.info = {
            owners: ['KhaaZ'],
            name: 'eval',
            description: 'Eval js code.',
            usage: 'eval [js code]',
            examples: ['eval 1 + 1'],
        };

        /**
         * @type {CommandOptions}
         */
        this.options = new CommandOptions(this, {
            argsMin: 1,
            cooldown: null,
        } );
        
        /**
         * @type {CommandPermissions}
         */
        this.permissions = new CommandPermissions(this, {
            staff: {
                needed: this.axon.staff.owners,
                bypass: this.axon.staff.owners,
            },
        } );
    }

    /**
     * @param {import('axoncore').CommandEnvironment} env
     */
    async execute(env) {
        const { msg, args, guildConfig } = env;
        let evalString;
        try {
            // eslint-disable-next-line no-eval
            evalString = await eval(args.join(' ') );

            if (typeof evalString === 'object') {
                evalString = nodeUtil.inspect(evalString, { depth: 0, showHidden: true } );
            } else {
                evalString = String(evalString);
            }
        } catch (err) {
            this.logger.debug(err.stack);
            return this.sendError(msg.channel, err.message ? err.message : `Error: ${err}`);
        }

        evalString = this.cleanUpToken(evalString);

        if (evalString.length === 0) {
            return this.sendError(msg.channel, 'Nothing to evaluate.');
        }

        const splitEvaled = evalString.match(/[\s\S]{1,1900}[\n\r]/g) || [evalString];
        
        if (splitEvaled.length > 3) {
            this.sendMessage(msg.channel, `Cut the response! [3/${splitEvaled.length} | ${evalString.length} chars]`);
        }
        
        for (let i = 0; i < 3; i++) {
            if (!splitEvaled[i] ) {
                break;
            }
            this.sendCode(msg.channel, splitEvaled[i] );
        }
        return new CommandResponse( {
            success: true,
        } );
    }

    /**
     * @param {String} evalString
     */
    cleanUpToken(evalString) {
        return evalString.replace(new RegExp(this.bot.token, 'g'), 'Khaaz Baguette');
    }

    /**
     * @param {import('discord.js').TextChannel | import('discord.js').NewsChannel | import('discord.js').DMChannel} channel
     * @param {String} content
     * @param {String} lang
     */
    sendCode(channel, content, lang = 'js') {
        return this.sendMessage(channel, `\`\`\`${lang}\n${content}\`\`\``);
    }
}

module.exports = Eval;
