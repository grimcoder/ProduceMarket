/**
 * Created by taras.kovtun on 8/6/2015.
 */

path = require('path'),
    fs = require('fs')

var Utils = function () {
    var Utils = {
        'saveToFile': function (obj, filenam) {
            fs.writeFile(path.join(__dirname, '../data/', filenam), JSON.stringify(obj), function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        },

        'readFromFile': function (filenam) {
            var str = fs.readFileSync(path.join(__dirname, '../data/', filenam) + ".json", 'utf8');
            var obj = JSON.parse(str);
            return obj;
        }
    }

    return Utils;
}

module.exports = Utils;