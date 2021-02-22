const { Module } = require('axoncore');

const commands = require('./commands/index');
const listeners = require('./listeners/index');

class Memery extends Module {
    /**
     * @param {import('axoncore').AxonClient} client
     * @param {import('axoncore').ModuleData} data
     */
    constructor(client, data = {} ) {
        super(client, data);

        this.label = 'Memery';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'Memery',
            description: 'A Module containing tons and tons of meme commands, just to keep your server entertained!',
        };
    }

    init() {
        return { commands, listeners };
    }
}

module.exports = Memery;
