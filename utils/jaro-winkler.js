// Get a user using an approximate name using the Jaro-Winkler Distance algorithim and return the user.
// This is best used with "message.guild.members.cache.find(user => user.displayName === leven(message, args))"
// 
// Arguments: 
// message is a simple message object. This is passed to every command in this bot.
// args is the user's argument. This assumes that every argument following a command is of a single name. Passed to every command.

const jw = require('jaro-winkler')

const jaro_winkler = (message, args) => {
    const max = (score_func, arr) => {
    let max_score = null;
    let max_item = null;
    arr.forEach((item, idx) => {
        const score = score_func(item);
        if (max_score == null || score > max_score) {
        max_score = score;
        max_item = idx;
        }
    });
    return max_item;
    }

    const name = args.join(' ')
    console.log(name)
    var userList = Array.from(message.guild.members.cache.mapValues(user => user.displayName))
    var result = max(x => jw(x, name, {caseSensitive: false}), userList.map(x => x[1]))
    console.log(result)
    var result = userList[result][1]
    console.log(result)
    return result;
}
exports.jaro_winkler = jaro_winkler;