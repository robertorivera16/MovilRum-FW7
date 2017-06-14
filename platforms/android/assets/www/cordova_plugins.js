cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.teamnemitoff.phonedialer.phonedialer",
        "file": "plugins/com.teamnemitoff.phonedialer/www/dialer.js",
        "pluginId": "com.teamnemitoff.phonedialer",
        "merges": [
            "phonedialer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.teamnemitoff.phonedialer": "0.3.1",
    "cordova-plugin-whitelist": "1.3.2"
};
// BOTTOM OF METADATA
});