//var dockerHubAPI = require('docker-hub-api');
var dockerHubAPI = require('../../modules/dockerhub-api-ext/api.js');
const Discord = require("discord.js");
var discordClient;
var config;

module.exports = {
    initialize: function (cfg, client) {
        discordClient = client;
        config = cfg;
        init(config);
    }, 

    start: function() {
        run();
    }
}

function init() {
    dockerHubAPI.setLoginToken(config.loginToken);

    dockerHubAPI.loggedInUser().then(function (info) {
        var id = info.id;
        var username = info.username;
        var isAdmin = info.is_admin;

        console.log(' ID: ' + id + ' Username: ' + username + ' isAdmin: ' + isAdmin);
        send("Logged into DockerHub.\n" +
            "Listening for updates to " + config.imageuser + '/' + config.imagename + ' every ' + config.interval + " minutes.");
    }).catch(console.error);
}

function run() {
    var lastUpdated;
    setInterval(function() {
            dockerHubAPI.auditHistory(config.imageuser, config.imagename).then(function (info) {
                var mostRecent = findMostRecentBuild(info, config.tagFilter);

                if (mostRecent === undefined)
                    return;

                var update = new Date(mostRecent.created);

                if (lastUpdated === undefined) {
                        lastUpdated = update;
                        return;
                };

                if (update > lastUpdated) {
                    lastUpdated = update;
                    const embed = new Discord.RichEmbed()
                        .setColor(0x00AE86)
                        .setTitle(':new: ' +
                            config.imageuser +
                            '/' +
                            config.imagename +
                            ' ' +
                            mostRecent.build_tag +
                            ' is available.')
                        .addField('DockerHub Page',
                            `https://cloud.docker.com/repository/registry-1.docker.io/${config.imageuser}/${config.imagename}/builds/${mostRecent.uuid}`);

                    send(embed);
                }

            })
                .catch(console.error);
        },
        config.interval * 60 * 1000);
}

function send(msg) {
    var server = config.destServer;
    var channel = config.destChannel;
    
    discordClient.guilds.get(server).channels.get(channel).send(msg);
}

function findMostRecentBuild(auditData, filter) {
    var objects = auditData.objects;
    var filterRegex = new RegExp(filter);
    for (let i = 0; i < objects.length; ++i) {
        if (objects[i].action.startsWith('Build in') &&
            filterRegex.test(objects[i].build_tag) &&
            objects[i].state === 'Success')
            return objects[i];
    }
}
