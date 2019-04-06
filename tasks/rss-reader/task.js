const Discord = require('discord.js');
const Parser = require('rss-parser');
const fs = require('fs');

var discordClient;
var config;
var lastUpdated;
var parser;
var newsDb;
var timestampPath;

module.exports = {
    initialize: function (cfg, client) {
        discordClient = client;
        config = cfg;
        init();
    },

    start: function () {
        run();
    }
}

function init() {
    parser = new Parser();
    var Datastore = require('nedb');
    var sharedDir = '/shared/data';
    if (config.sharedDir)
        sharedDir = config.sharedDir;

    newsDb = new Datastore({ filename: sharedDir + '/rss-reader.news', autoload: true });

    timestampPath = sharedDir + '/rss.timestamp';

    fs.access(timestampPath,
        fs.constants.F_OK,
        function(err) {
            if (err) {
                lastUpdated = new Date('1970-01-01Z00:00:00:000');
                updateTimestamp(lastUpdated);
            } else {
                fs.readFile(timestampPath,
                    {},
                    function(err, data) {
                        lastUpdated = new Date(data);
                    });
            }
        });
}

function run() {
    setInterval(function () {
        processRssData();
    }, config.interval * 60 * 1000);

    processRssData();
};

function updateTimestamp(timestamp) {
    lastUpdated = timestamp;
    fs.writeFile(timestampPath, timestamp.toISOString(), function (err) {
        if (err) {
            return console.log(err);
        }
    }); 
}

function loadDb(items) {
    items.forEach(function(entry) {
        if ( !('rsi' === entry.categories[0]))
            return;

        var content = entry.contentSnippet;
        if (content.length > 1020)
            content = content.substring(0, 1020) + "...";
        var title = entry.title;
        var creator = entry.creator;
        var pubDate = new Date(entry.pubDate);
        var url = entry.link;

        newsDb.find({ title: title },
            function(err, documents) {
                if (documents === undefined || documents.length == 0) {
                    console.log(`Did not find existing ${title} by ${creator} @ ${pubDate}. Inserting.`)
                    newsDb.insert({
                            title: title,
                            content: content,
                            creator: creator,
                            pubDate: pubDate,
                            url: url
                        },
                        function(err) {
                            console.log(err);
                        });
                } else {
                    // update
                    newsDb.find({ title: title, pubDate: pubDate },
                        function(err, documents) {
                            if (documents != undefined && documents.length > 0)
                                return;
                            console.log(`Found updated ${title} by ${creator} @ ${pubDate}. Updating content.`)
                            newsDb.update({ title: title },
                                {
                                    $set: {
                                        content: content,
                                        creator: creator,
                                        pubDate: pubDate,
                                        url: url
                                    }
                                },
                                {},
                                function(err) {
                                    console.log(err);
                                });

                        });

                }
            });
    });
}

function processRssData() {
    parser.parseURL(config.feedUrl,
        function(err, feed) {
            if (err != null) {
                console.log(err);
                return;
            }

            loadDb(feed.items);

            console.log(`Checking for news posted since ${lastUpdated}`);
            newsDb.find({ pubDate: { $gt: lastUpdated } },
                function(err, documents) {
                    documents.forEach(function(item) {
                        const embed = new Discord.RichEmbed()
                            .setColor(0x00AE86)
                            .setTitle(':newspaper: ' + item.title)
                            .setURL(item.url)
                            .addField(item.creator + ' @ ' + item.pubDate, item.content);

                        console.log(`Posting ${item.title} by ${item.creator} @ ${item.pubDate}`)
                        send(embed);
                    })
                })

            updateTimestamp(new Date());
        });
}

function send(msg) {
    var server = config.destServer;
    var channel = config.destChannel;

    discordClient.guilds.get(server).channels.get(channel).send(msg);
};