var tasks = [];

module.exports = {
    initialize: function (config, discordClient) {
        console.log('Initializing tasks...');
        for (let i = 0; i < config.length; ++i) {
            console.log(`   ${config[i].name}`);
            var task = require(`./${config[i].name}/task`);
            task.initialize(config[i], discordClient);
            task.start();
            tasks.push(task);
        }
    }
}