const { Command, CommandOptions, CommandResponse } = require('axoncore');
const got = require('got');
const Discord = require('discord.js');

class Dank extends Command {
    /**
     * @param {import('axoncore').Module} module
     */
    constructor(module) {
        super(module);

        this.label = 'dank';
        this.aliases = [
            "dankmeme"
        ];

        this.hasSubcmd = true;

        this.info = {
            owners: ['Rhydderchc'],
            name: 'dank',
            description: 'Gives you a random meme from r/dank',
            usage: 'dank',
            examples: ['dank'],
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
        got('https://www.reddit.com/r/memes/random/.json')
        		.then(response => {
        			const [list] = JSON.parse(response.body);
        			const [post] = list.data.children;

        			const permalink = post.data.permalink;
        			const memeUrl = `https://reddit.com${permalink}`;
        			const memeImage = post.data.url;
        			const memeTitle = post.data.title;
        			const memeUpvotes = post.data.ups;
        			const memeNumComments = post.data.num_comments;
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${memeTitle}`)
		        .setURL(`${memeUrl}`)
			    .setColor('BLURPLE')
			 .setImage(memeImage)
			 .setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

			msg.channel.send(embed);
		}).catch(console.error)
    }
}

module.exports = Dank;
