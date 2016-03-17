#!/usr/bin/env node

var exec = require('child_process').exec,
    fs = require('fs');

if (process.env.CORDOVA_PLUGINS.indexOf('sqlite') != -1 && !fs.existsSync('../vendor/ux/Mba.ux.SqlNative')) {
    exec('./node_modules/.bin/bower install --save Mba.ux.SqlNative', {cwd: '../'});
} else if (process.env.CORDOVA_PLUGINS.indexOf('pushwoosh') != -1 && !fs.existsSync('../vendor/ux/Mba.ux.Pushwoosh')) {
    exec('./node_modules/.bin/bower install --save Mba.ux.Pushwoosh', {cwd: '../'});
} else if (process.env.CORDOVA_PLUGINS.indexOf('geolocation') != -1 && !fs.existsSync('../vendor/ux/Mba.ux.Map')) {
    exec('./node_modules/.bin/bower install --save Mba.ux.Map', {cwd: '../'});
} else if (process.env.CORDOVA_PLUGINS.indexOf('exitios') != -1 && !fs.existsSync('../vendor/ux/Mba.ux.UpdateApp')) {
    exec('./node_modules/.bin/bower install --save Mba.ux.UpdateApp', {cwd: '../'});
} else if (process.env.CORDOVA_PLUGINS.indexOf('actionsheet') != -1 &&
    !fs.existsSync('../vendor/ux/Mba.ux.ActionSheet')) {
    exec('./node_modules/.bin/bower install --save Mba.ux.ActionSheet', {cwd: '../'});
}
