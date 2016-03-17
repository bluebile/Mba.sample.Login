#!/usr/bin/env node

var fs   = require('fs'),
    shellJS = require('shelljs'),
    glob = require('glob'),
    json = require('../bower.json'), file,scriptsCurrent = [],
    appJsContent, appJsonContent, requiresCurrent = [], matches = [], strRequires, regex, pluginJson, addRequire = false,
    plugins;

shellJS.exec('./sencha app refresh');

var dependencies = {};

var valuesConstructor = {
    libsGetValue: function(value, dependency)
    {
        return {origin: process.cwd() + '/vendor/ux/' + dependency + '/' + value, dest: value.toString()};
    }
};

function grouper(dependency)
{
    var keys = ['requires', 'cordova', 'libs'],
        pluginJson = fs.readFileSync('./vendor/ux/' + dependency + '/bower.json'),
        nameFn = null, value;

    pluginJson = JSON.parse(pluginJson.toString());

    for (var key = 0, length = keys.length; key < length; key++) {

        if (!dependencies[keys[key]]) {
            dependencies[keys[key]] = [];
        }

        value = null;
        switch (true) {
            case keys[key] in pluginJson:
                value = pluginJson[keys[key]];

                if (typeof value === 'string') {
                    value = [value];
                } else if (typeof value === 'object' && !('length' in value)) {

                    // @todo problema por causa da chave cordova como objeto deve ser a chave na proxima release do componentes
                    for (var i in value) {
                        if (typeof value[i] === 'string') {
                            value = [value[i]];
                            break;
                        }
                        value = value[i];
                        break;
                    }
                }
                break;
            case keys[key] === 'requires':
                value = [dependency];
                break;
        }

        if (value === null) {
            continue;
        }

        nameFn = (keys[key] + 'GetValue');

        if (nameFn in valuesConstructor) {
            value = valuesConstructor[nameFn](value, dependency);
        }

        dependencies[keys[key]] = dependencies[keys[key]].concat(value);
    }

    return value;
}

for (dependency in json.dependencies) {
    if (dependency.indexOf('Mba.ux') === -1) {
        continue;
    }

    grouper(dependency);
}

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

    for (var j = 0; j < dependencies.requires.length; j++) {
        regex = new RegExp(dependencies.requires[j], 'g');
        if (!regex.test(strRequires)) {
            addRequire = true;
            requiresCurrent.push('\'' + dependencies.requires[j] +'\'');
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

if (dependencies.libs.length > 0) {

    console.log("Adicionando dependenciais APP.JSON");

    fs.readFile('app.json',  function (err, data) {
        appJsonContent = data.toString();

        matches = /"js":(\s*?\[((?:.|\s)*?)\])/g.exec(appJsonContent);

        var scripts = eval('(' + matches[1] + ')');
        var element = {};

        for (var iLibs = 0, length = dependencies.libs.length; iLibs < length; iLibs++) {
            if (JSON.stringify(scripts).indexOf(dependencies.libs[iLibs].dest) == -1) {
                element.path   = dependencies.libs[iLibs].dest;
                element.remote = true;
                scripts.unshift(element);
                fs.createReadStream(dependencies.libs[iLibs].origin).pipe(fs.createWriteStream(dependencies.libs[iLibs].dest));
            }
        }

        scriptsCurrent="\t\t";

        for (var i = 0; i < scripts.length ; i++) {
            //console.log("path:" + scripts[i].path);
            scriptsCurrent = scriptsCurrent+(JSON.stringify(scripts[i])+",\n\t\t");
        };
        appJsonContent = appJsonContent.replace(/"js":\s*?\[(.|\s)*?\]/g, "\"js\": [\n" + scriptsCurrent.slice(0, scriptsCurrent.lastIndexOf(",")) + "\n\t]");
        fs.writeFile('app.json', appJsonContent);
    });
}

for (var iPlugins = 0, length = dependencies.cordova.length; iPlugins < length; iPlugins++) {
    shellJS.cd('cordova');
    console.log('Adicionando plugin do cordova.');
    shellJS.exec('../node_modules/.bin/cordova plugin add ' + dependencies.cordova[iPlugins] + ' --save');
    shellJS.cd('..');
}

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
