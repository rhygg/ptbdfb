const { Module } = require('axoncore');

const commands = require('./commands/index');
const listeners = require('./listeners/index');

class Economy extends Module {
    /**
     * @param {import('axoncore').AxonClient} client
     * @param {import('axoncore').ModuleData} data
     */
    constructor(client, data = {} ) {
        super(client, data);

        this.label = 'Economy';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'Economy',
            description: 'A Module containing tons of fun economy commands!',
        };
    }

    init() {
        return { commands, listeners };
    }
}

module.exports = Economy;
