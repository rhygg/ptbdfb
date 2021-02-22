const { Command, CommandOptions, CommandResponse } = require('axoncore');
const db = require('../../../database/dbUtils');
var rAnimal = require("random-animal-name");
const fs = require('fs');
const Util = require('../../../utility');
let BodyPart = [`knee`, `thumb`, `hip`, `finger`, `buttocks`, `groin`, `lower leg`, `ribs`, `elbow`, `back`, `pinky finger`, `breast`, `ankle`, `neck`, `calves`, `toes`, `forearm`, `chest`, `big toe`, `mouth`, `wrist`, `scalp`, `shoulder blade`, `chin`, `ear`, `kidney`, `hand`, `humerus`, `upper arm`, `waist`, `bottom`, `jaw`, `forehead`, `feet`, `hair`, `eyelashes`, `legs`, `teeth`, `face`, `heel`, `throat`, `collar bone`, `index finger`, `cheek`, `testes`, `eyelid`, `arm`, `fingernail`, `foot`, `nipple`, `teeth`, `shin`, `thigh`, `ear lobe`, `abdomen`, `spine`, `fist`, `shoulder`, `belly`, `toenail`, `palm`, `lips`, `nose`, `gums`]

class Search extends Command {
    /**
     * @param {import('axoncore').Module} module
     */
    constructor(module) {
        super(module);

        this.label = 'search';
        this.aliases = [];

        this.hasSubcmd = true;

        this.info = {
            owners: ['Rhydderchc'],
            name: 'search',
            description: 'Search for money!',
            usage: 'search',
            examples: ['search'],
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
    async execute( { msg } ) {
        try {
            let rawdata = await fs.readFileSync(__dirname+'/helpers/helpers.json');
            let Game = JSON.parse(rawdata);

            let searchLocation = Game.data["searchLocation"];
            let RandomSearchLocation = [];

            RandomSearchLocation = Util.shuffle(searchLocation).slice(0,3);

            let Balance = parseInt(await db.get(`${msg.author.id}_balance`));

            let message = "Where do you want to search?\nPick from the list below and type it in chat.\n\n``" + RandomSearchLocation[0] + "`` ``" + RandomSearchLocation[1] + "`` ``" + RandomSearchLocation[2] + "``"
            msg.channel.send({
                embed: {
                    title: "Search!",
                    description: message,
                    color: "BLURPLE",
                    footer: {
                        text: "Requested by " + msg.author.tag,
                        icon_url: msg.author.displayAvatarURL()
                    },
                    timestamp: new Date()
                }
            }).then(() => {
                msg.channel.awaitMessages(response => (response.author.id == msg.author.id) && ((RandomSearchLocation.indexOf(response.content.toLowerCase())) > -1), {
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                }).then((collected) => {
                    let Chances = Math.round(Math.random() * 12);
                    let Endmsg = "";

                    let Lose = Math.round(Math.random() * (Balance / 100 * 10)) + 1;
                    if (Lose > Balance) {
                        Lose = Balance;
                    }

                    let Reward = Math.round(Math.random() * 1000) + 1;

                    switch (Chances) {
                        case 1:
                            db.subtract(`${msg.author.id}_balance`, Lose);
                            Endmsg = `You got caught! You paid a cop **${Util.moneyFormat(Lose)}** to stay out of prison. Next time don't try and break into things you dumb dumb.`;
                            break;
                        case 2:
                            const member = msg.guild.members.cache.random(1)[0].user;
                            db.add(`${msg.author.id}_balance`, Math.round(Reward / 2));
                            db.add(`${member.id}_balance`, Math.round(Reward / 2));
                            Endmsg = `You managed to find **${Util.moneyFormat(Reward)}. However, there was a withness ( ${member.username} ), so you gave him 50% to keep him quiet.`;
                            break;
                        case 3:
                            Endmsg = `You saw **${Util.moneyFormat(Reward)}** and tried to reach down to grab it, but you broke your **${BodyPart[Math.floor(Math.random() * BodyPart.length)]}** and went to the hospital. Luckily, you had insurance, so you didn't have to pay anything.`;
                            break;
                        case 4:
                            let RandomChance = Math.round(Math.random() * 100);
                            db.add(`${msg.author.id}_balance`, Math.round(Reward / 100 * (100 - RandomChance)));
                            Endmsg = `You managed to find **${Util.moneyFormat(Reward)}**. After grabbing it, all of a sudden a **${rAnimal()}** ran towards you and ate **${RandomChance}%** of the money you found.`;
                            break;
                        default:
                            db.add(`${msg.author.id}_balance`, Math.round(Reward));
                            Endmsg = `You managed to find **${Util.moneyFormat(Reward)}**. You quickly grabbed it and placed it in your pockets.`;
                            break;
                    }

                    return msg.channel.send({
                        embed: {
                            title: "You Searched!",
                            description: Endmsg,
                            color: "BLURPLE",
                            footer: {
                                text: "Requested by " + msg.author.tag,
                                icon_url: msg.author.displayAvatarURL()
                            },
                            timestamp: new Date()
                        }
                    });
                })
            }).catch((err) => {
                    return message.reply('Please choose a place you would like to search for next time!');
                });
            } catch (err) {
                console.log(err);
                return message.reply(`Oh no, an error occurred. Try again later!`);
            }
        }
    }



module.exports = Search;
