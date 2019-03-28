var HashMap = require('hashmap');
const emoji = new HashMap();
emoji.set("tired", ["https://cdn.discordapp.com/attachments/468033427598344203/558571167678726154/458659_key2x.png"]);
emoji.set("love", ["https://cdn.discordapp.com/attachments/468033427598344203/558570393183715328/6562741_key2x.png"]);
emoji.set("tea", ["https://cdn.discordapp.com/attachments/468033427598344203/557850712273584138/458674_key2x.png"]);
emoji.set("morning", ["https://cdn.discordapp.com/attachments/468033427598344203/556814081906966557/11530032_key2x.png"]);
emoji.set("drool", ["https://cdn.discordapp.com/attachments/510599531180589056/557555106778841088/458681_key2x.png"]);
emoji.set("cry", ["https://cdn.discordapp.com/attachments/468033427598344203/556054027872501760/2160636_key2x.png"]);
emoji.set("hungry", ["https://cdn.discordapp.com/attachments/468033427598344203/555437990332071946/Hunga.png"]);
emoji.set("fire", ["https://cdn.discordapp.com/attachments/468033427598344203/554252251192098816/68525_key2x.png"]);

function showHelp(message) {
    var response = "I know about the following emoji!\n";
    emoji.forEach(function (value, key) {
        response += "   " + key + "\n";
    });

    message.channel.send(response);
}

var name = 'emoji';
module.exports = {
    name: name,
    canHandle: function(command) {
        return emoji.has(command) || name === command;
    },
    handle: function (args, message) {
        if (args.length == 2 && args[1] === 'help') {
            showHelp(message);
            return;
        }

        var token = args[0];
        var images = emoji.get(token);
        if (images) {
            var url = images[Math.floor(Math.random() * images.length)];
            message.channel.sendFile(url, "")
        } else {
            message.channel.send("ZOINK! Thats not a command. Need help? Try \"help\" !");
        }
    }
}