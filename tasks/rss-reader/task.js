const Discord = require("discord.js");
const Parser = require('rss-parser');

var discordClient;
var config;
var lastUpdated;
var parser;

module.exports = {
    initialize: function (cfg, client) {
        discordClient = client;
        config = cfg;
        init(config);
    },

    start: function () {
        run();
    }
}

function init() {
    parser = new Parser();
}

function run() {
    var lastUpdated;
    setInterval(function () {
        processRssData(-1);
    }, config.interval * 60 * 1000);

    send('Showing the most recent ' + config.initialUpdates + ' update(s).');
    processRssData(config.initialUpdates);
};

function processRssData(maxUpdates) {
    parser.parseURL(config.feedUrl,
        function (err, feed) {
            if (err != null) {
                console.log(err);
                return;
            }

            var currentBatchMostRecent = new Date(197, 01, 01, 0, 0, 0, 0);
            var count = 0;
            feed.items.forEach(function (entry) {
                if (maxUpdates > 0 && count >= maxUpdates)
                    return;
                count++;

                var entryUpdate = new Date(entry.pubDate);
                if (entryUpdate === undefined)
                    return;

                if (lastUpdated === undefined || entryUpdate > lastUpdated) {
                    if (entryUpdate > currentBatchMostRecent)
                        currentBatchMostRecent = entryUpdate;

                    var content = entry.contentSnippet;
                    if (content.length > 1020)
                        content = content.substring(0, 1020) + "...";

                    const embed = new Discord.RichEmbed()
                        .setColor(0x00AE86)
                        .setTitle(':newspaper: ' + entry.title)
                        .setURL(entry.link)
                        .addField(entry.creator + ' @ ' + entry.pubDate,
                            content);

                    send(embed);
                }
            });
            lastUpdated = currentBatchMostRecent;
        });
}

function send(msg) {
    var server = config.destServer;
    var channel = config.destChannel;

    discordClient.guilds.get(server).channels.get(channel).send(msg);
};