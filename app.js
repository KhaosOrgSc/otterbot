const Discord = require("discord.js");
const client = new Discord.Client()

const config = require("./config.json");

var HashMap = require('hashmap');

var emoji = new HashMap();
emoji.set("tired", "https://cdn.discordapp.com/attachments/468033427598344203/558571167678726154/458659_key2x.png");
emoji.set("love", "https://cdn.discordapp.com/attachments/468033427598344203/558570393183715328/6562741_key2x.png");
emoji.set("tea", "https://cdn.discordapp.com/attachments/468033427598344203/557850712273584138/458674_key2x.png");
emoji.set("morning", "https://cdn.discordapp.com/attachments/468033427598344203/556814081906966557/11530032_key2x.png");
emoji.set("drool", "https://cdn.discordapp.com/attachments/510599531180589056/557555106778841088/458681_key2x.png");
emoji.set("cry", "https://cdn.discordapp.com/attachments/468033427598344203/556054027872501760/2160636_key2x.png");
emoji.set("hungry", ["https://i.imgur.com/9h9MJV0.png", "https://i.imgur.com/ArIZMPM.png", "https://i.imgur.com/B2z2nZ2.png", "https://i.imgur.com/24tFlBK.png", "https://i.imgur.com/TbIAa4N.png"]);
emoji.set("fire", "https://cdn.discordapp.com/attachments/468033427598344203/554252251192098816/68525_key2x.png");


client.on("ready", () => {
    console.log(`Bot has started.`);
});

client.on('message', message => {
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "help") {
        showHelp(message);
        return;
    }

    var url = emoji.get(command);
    if (url) {
        const embed = new Discord.RichEmbed().setImage(url)
        //message.channel.sendEmbed(embed)
        message.channel.sendFile(url, "")
    } else {
	    message.channel.send("ZOINK! Thats not a command. Need help? Try " + config.prefix + " help");
    }
});

function showHelp(message) {
    var response = "Hello! I know about the following commands!\n";
    emoji.forEach(function(value, key) {
        response += "   " + key + "\n";
    });

    message.channel.send(response);
}

client.login(config.token);
