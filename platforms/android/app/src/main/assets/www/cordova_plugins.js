cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-fetch.FetchPlugin",
      "file": "plugins/cordova-plugin-fetch/www/fetch.js",
      "pluginId": "cordova-plugin-fetch",
      "clobbers": [
        "cordovaFetch"
      ]
    },
    {
      "id": "cordova-plugin-restful.RESTful",
      "file": "plugins/cordova-plugin-restful/www/RESTful.js",
      "pluginId": "cordova-plugin-restful",
      "clobbers": [
        "cordova.plugins.RESTful"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-console": "1.1.0",
    "cordova-plugin-fetch": "0.1.0",
    "cordova-plugin-restful": "0.0.3",
    "cordova-plugin-whitelist": "1.3.4"
  };
});