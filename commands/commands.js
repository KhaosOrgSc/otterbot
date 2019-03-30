var commands = [];

module.exports = {
    initialize: function (config, discordClient) {
        console.log('Initializing commands...');
        for (let i = 0; i < config.length; ++i) {
            console.log(`   ${config[i].name}`);
            var cmd = require(`./${config[i].name}/command`);
            cmd.initialize(config[i], discordClient);
            commands.push(cmd);
        }
    },
    findHandler: function(command) {
        for (let i = 0; i < commands.length; ++i) {
            if (commands[i].canHandle(command)) {
                return commands[i];
            }
        }

        // command not found.
    }
}