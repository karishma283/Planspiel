cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-fetch/www/fetch.js",
        "id": "cordova-plugin-fetch.FetchPlugin",
        "pluginId": "cordova-plugin-fetch",
        "clobbers": [
            "cordovaFetch"
        ]
    },
    {
        "file": "plugins/cordova-plugin-restful/www/RESTful.js",
        "id": "cordova-plugin-restful.RESTful",
        "pluginId": "cordova-plugin-restful",
        "clobbers": [
            "cordova.plugins.RESTful"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-console": "1.1.0",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-fetch": "0.1.0",
    "cordova-plugin-restful": "0.0.3"
}
// BOTTOM OF METADATA
});