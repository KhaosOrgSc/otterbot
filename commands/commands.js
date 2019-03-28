var emoji = require('./emoji/command')
var items = [
    emoji
]

module.exports = {
    items: items,
    findHandler: function(command) {
        for (let i = 0; i < items.length; ++i) {
            if (items[i].canHandle(command)) {
                return items[i];
            }
        }

        // command not found.
    }
}