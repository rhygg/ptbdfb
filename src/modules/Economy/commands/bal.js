const { Command, CommandOptions, CommandResponse } = require('axoncore');
const db = require('../../../database/dbUtils');
const Util = require('../../../utility');

class Bal extends Command {
    /**
     * @param {import('axoncore').Module} module
     */
    constructor(module) {
        super(module);

        this.label = 'bal';
        this.aliases = [

            'balance'
        ];

        this.hasSubcmd = true;

        this.info = {
            owners: ['Rhydderchc'],
            name: 'bal',
            description: 'See your balance.',
            usage: 'bal',
            examples: ['bal'],
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
     if (msg.mentions.members.first()) {
       user = msg.mentions.members.first().user;
     }

     let HasVault = await db.has(`${user.id}_vault`);
     if (!HasVault) {
       db.set(`${user.id}_vault`, 0)
     }


     let Balance = Util.NotNumberCheck(await db.get(`${user.id}_balance`));
     let Vault = Util.NotNumberCheck(await db.get(`${user.id}_vault`));

     let message = `**Wallet**: ${Util.moneyFormat(Balance)}\n`;

     if (msg.mentions.members.first()) {
       let Length = Vault.toString().length;
       let Dollars = "";
       for (let i = 0; i < Length; i++) {
         Dollars += "$";
       }

       message += `**Vault**: ${Dollars}`;
     }
     else {
       message += `**Vault**: ${Util.moneyFormat(Vault)}\n`;
     }

     return msg.channel.send({
       embed: {
         title: `${user.username} Balance`,
         description: message,
         color: "BLURPLE",
         footer: {
           text: "Requested by " + msg.author.tag,
           icon_url: msg.author.displayAvatarURL()
         },
         timestamp: new Date()
       }
     });
   } catch (err) {
     console.log(err);
     return msg.reply(`Oh no, an error occurred. \`${err}\``);
   }
    }
}

module.exports = Bal;
