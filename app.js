const Discord = require("discord.js");
const client = new Discord.Client()

const config = require("./config.json");

var commands = require('./commands/commands.js');
var tasks = require('./tasks/tasks.js');

client.on("ready", () => {
    commands.initialize(config.modules.commands, client);
    tasks.initialize(config.modules.tasks, client);

    console.log('--------------------------------');
    console.log(`Bot has started.`);
});

client.on('message', message => {
    if (message.content.indexOf(config.prefix) !== 0) return;

    var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args[0];

    if (command === "help") {
        showHelp(message, commands);
        return;
    }

    var handler = commands.findHandler(command);
    if (handler) {
        handler.handle(args, message);
    }
});

function showHelp(message) {
    var response = "Hello! I know about the following commands!\n";
    response += "Try \"" + config.prefix + " <command> help\" for more detailed help.\n";
    config.modules.commands.forEach(function (item) { 
        response += "   " + item.name + "\n";
    });

    message.channel.send(response);
}

client.login(config.token);
