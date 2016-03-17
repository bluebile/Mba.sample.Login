#!/usr/bin/env node

var fs   = require('fs'),
    shellJS = require('shelljs'),
    glob = require('glob'),
    json = require('../bower.json'),
    finalScss = '', file, importSencha,
    appJsContent, requiresCurrent = [], matches = [], strRequires, regex, pluginJson, addRequire = false,
    plugins, pluginJson;


shellJS.exec('./sencha app refresh');

fs.readFile('app.js',  function (err, data) {
    if (err) throw err;

    appJsContent = data.toString();

    matches = /requires:\s*?\[((?:.|\s)*?)\]/g.exec(appJsContent);

    if (matches[1].trim()) {
        strRequires     = matches[1];
        requiresCurrent = strRequires.split(',');
        for (var i = 0; i < requiresCurrent.length; i++) {
            requiresCurrent[i] = requiresCurrent[i].trim();
        }
    }

    for (dependency in json.dependencies) {
        if (dependency.indexOf('Mba.ux') === -1) {
            continue;
        }

        pluginJson = fs.readFileSync('./vendor/ux/' + dependency + '/bower.json');
        pluginJson = JSON.parse(pluginJson.toString());
        if (pluginJson.cordova) {
            plugins = pluginJson.cordova.id_or_url_plugin;
            if (typeof pluginJson.cordova.id_or_url_plugin === 'string') {
                plugins = [pluginJson.cordova.id_or_url_plugin];
            }
            shellJS.cd('cordova');
            for (var iPlugins = 0; iPlugins < plugins.length; iPlugins++) {
                console.log('Adicionando plugin do cordova.');
                shellJS.exec('../node_modules/.bin/cordova plugin add ' + plugins[iPlugins] + ' --save');
            }
            shellJS.cd('..');
        }

        if (pluginJson.requires) {
            dependency = pluginJson.requires;
        }
        if (typeof dependency === 'string') {
            dependency = [dependency];
        }
        for (var j = 0; j < dependency.length; j++) {
            regex = new RegExp(dependency[j], 'g');
            if (!regex.test(strRequires)) {
                addRequire = true;
                requiresCurrent.push('\'' + dependency[j] +'\'');
            }
        }
    }

    if (!addRequire) {
        //cópia dos arquivos sass dos plugins
        writeScss();
        return;
    }

    requiresCurrent[0] = "\t\t" + requiresCurrent[0];
    requiresCurrent = requiresCurrent.join(",\n\t\t");
    appJsContent = appJsContent.replace(/requires:\s*?\[(.|\s)*?\]/g, "requires: [\n" + requiresCurrent + "\n\t]");
    fs.writeFile('app.js', appJsContent);

    //cópia dos arquivos sass dos plugins
    writeScss();

});

function writeScss() {
    var finalScss = '', file, importSencha, glob = require('glob'), sassContent;
    glob('vendor/ux/**/*.scss', function (er, files) {
        for (var idx=0 ; idx < files.length ; idx++) {
            file = fs.readFileSync(files[idx]);
            finalScss += file.toString() + '\n';
        }
        file = fs.readFileSync('resources/sass/app.scss');
        sassContent = file.toString();
        if (sassContent.indexOf('_mba.scss') == -1) {
            importSencha = sassContent.match(/@import\s'sencha-touch(.+)\/.+;/)[0];
            importSencha += '\n' + '@import \'_mba.scss\';';
            sassContent = sassContent.replace(/@import\s'sencha-touch(.+)\/.+;/,importSencha);
            fs.writeFile('resources/sass/app.scss', sassContent);
        }
        fs.writeFile('resources/sass/_mba.scss', finalScss);
    });
}
