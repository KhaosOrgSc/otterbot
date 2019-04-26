

var name = 'version';
var pkginfo;

module.exports = {
    name: name,
    initialize: function (config, discordClient) {
        pkginfo = require('pkginfo')(module, 'version');
    },
    canHandle: function (command) {
        return (name === command);
    },
    handle: function (args, message) {
        if (args.length == 1) {
            message.channel.send("You're running OtterBot v." + module.exports.version);
        } else if (args.length == 2 && args[1] === 'help') {
            showHelp(message);
            return;
        }
    }
}

function showHelp(message) {
    message.channel.send(`Its a version command, what else do you want? Just type \'version\'`)
}