var dockerHubAPI = require('docker-hub-api');
const Discord = require("discord.js");

var config = require('../config.json').commands.dockerhub.imagenotify;
var discordClient;


module.exports = {
    initialize: function (discord) {
        discordClient = discord;
        init();
    }, 

    start: function() {
        run();
    }
}

function init() {
    dockerHubAPI.setLoginToken(config.loginToken);

    dockerHubAPI.loggedInUser().then(function (info) {
        var loginToken = info.token;
        var id = info.id;
        var username = info.username;
        var isAdmin = info.is_admin;

        console.log(' ID: ' + id + ' Username: ' + username + ' isAdmin: ' + isAdmin);
        sendMsg(discordClient, "Logged into DockerHub.\n" +
            "Listening for updates to " + config.imageuser + '/' + config.imagename + ' every ' + config.interval + " seconds.");
    }).catch(console.error);
}

function run() {
    var lastUpdated;
    setInterval(function() {
            dockerHubAPI.repository(config.imageuser, config.imagename).then(function(info) {
                    console.log(info);
                    var update = new Date(info.last_updated);

                if (lastUpdated === undefined) {
                        lastUpdated = update;
                        return;
                };

                if (update > lastUpdated) {
                    lastUpdated = update;
                    sendMsg(discordClient,
                            ':new: There is a new build of ' +
                            config.imageuser +
                            '/' +
                            config.imagename +
                            ' available on DockerHub.');
                    }
            
                })
                .catch(console.error);
        },
        config.interval * 1000);
}

function sendMsg(client, msg) {
    var server = config.destServer;
    var channel = config.destChannel;
    var imageuser = config.imageuser;
    var imagename = config.imagename;

    discordClient.guilds.get(server).channels.get(channel).send(msg);
}

