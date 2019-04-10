const fs = require('fs');
const Datastore = require('nedb');

function showHelp(message) {
    var response = "I keep a watchful eye on chat!\n";
    response += "use \"seen <user>\" to find when they were last around.";

    message.channel.send(response);
}

var name = 'seen';
var lastSeenDb;

module.exports = {
    name: name,
    initialize: function(config, discordClient) {
        discordClient.on('message', message => {
            lastSeenDb.update({ _id: message.author.toString() },
                { $set: { timeStamp: new Date(), channel: message.channel.toString(), displayName: message.author.toString() } },
                {},
                function (err, numReplaced) {
                    if (err)
                        console.log("UPDATE ERROR: " + err);

                    if (numReplaced === 0) {
                        lastSeenDb.insert({
                                _id: message.author.toString(),
                                timeStamp: new Date(),
                                channel: message.channel.toString(),
                                displayName: message.author.toString()
                            },
                            function(err, doc) {
                                if (err)
                                    console.log("INSERT ERROR: " + err);
                            });
                    }
                });
            });

        var sharedDir = '/shared/data';
        if (config.sharedDir)
            sharedDir = config.sharedDir;

        lastSeenDb = new Datastore({ filename: sharedDir + '/seen.db', autoload: true });
    },
    canHandle: function(command) {
        return (name === command);
    },
    handle: function (args, message) {
        if (args.length == 2 && args[1] === 'help') {
            showHelp(message);
            return;
        }

        // Could do multiple but we'll leave it at just 1 for safety
        var member = message.mentions.members.first(1)
        if (!member) {
            message.channel.send("You know you need to ask about someone, right?")
            return;
        }

        lastSeenDb.findOne({ _id: member.toString() },
                function (err, doc) {
                    if (!doc) {
                        message.channel.send(`I have not seen ${member} recently...`);
                    } else {
                        message.channel.send(`I last saw ${doc.displayName} at ${doc.timeStamp} on ${doc.channel}`);
                    }
                });
    }
}
