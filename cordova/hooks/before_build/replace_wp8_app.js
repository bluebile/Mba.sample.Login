#!/usr/bin/env node

var fs = require('fs');

var cordova_util = require(process.cwd() + '/../node_modules/cordova/node_modules/cordova-lib/src/cordova/util'),
    projectRoot = cordova_util.isCordova(process.cwd()),
    projectXml = cordova_util.projectConfig(projectRoot),
    ConfigParser = require(process.cwd() + '/../node_modules/cordova/node_modules/cordova-lib/src/configparser/ConfigParser');

var cfg = new ConfigParser(projectXml);

if (process.env.CORDOVA_PLATFORMS.toLowerCase().indexOf('wp8') != -1) {
    var regex = /\s.*<ItemGroup>\s.*Newtonsoft.*[\s\S]*?<\/ItemGroup>/g;
    var fileContent = fs.readFileSync('platforms/wp8/' + cfg.name().replace(' ','_') + '.csproj').toString();

    var matches = fileContent.match(regex);

    for (var i = 1, length = matches.length; i < length; i++) {
        fileContent = fileContent.replace(matches[i], '');
    }

    fs.writeFile('platforms/wp8/' + cfg.name().replace(' ','_') + '.csproj', fileContent);
}