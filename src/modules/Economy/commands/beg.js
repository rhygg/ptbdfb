const { Command, CommandOptions, CommandResponse } = require('axoncore');
const db = require('../../../database/dbUtils');
const Util = require('../../../utility');
var randomnumber = require('random-number');

class Beg extends Command {
    /**
     * @param {import('axoncore').Module} module
     */
    constructor(module) {
        super(module);

        this.label = 'beg';
        this.aliases = [];

        this.hasSubcmd = true;

        this.info = {
            owners: ['Rhydderchc'],
            name: 'beg',
            description: 'Beg for money from someone random!',
            usage: 'beg',
            examples: ['beg'],
        };

        /**
         * @type {CommandOptions}
         */
        this.options = new CommandOptions(this, {
            argsMin: 0,
            guildOnly: false,
        } );
    }

    /**
     * @param {import('axoncore').CommandEnvironment} env
     */
    async execute( { msg, args } ) {
        try {
                 let user = msg.author;

                 let Reward = Util.getRandomInt(1, 50);

                 const member = msg.guild.members.cache.random(1)[0];
                 let message = `A generous member from your server, **${member.user.username}** threw **${Util.moneyFormat(Reward)}** at you`;
                 db.add(`${user.id}_balance`, Util.NotNumberCheck(Reward));

                 return msg.channel.send({
                     embed: {
                         title: "You begging?",
                         description: message,
                         color: "BLURPLE",
                         footer: {
                             text: "Requested by " + msg.author.tag,
                             icon_url: msg.author.displayAvatarURL()
                         },
                         timestamp: new Date()
                     }
                 });
             }
             catch (err) {
                 console.log(err);
                 return msg.reply(`Oh no, an error occurred. \`${err}\``);
             }
    }
}

module.exports = Beg;
