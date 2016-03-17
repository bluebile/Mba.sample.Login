#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    et = require('elementtree'),
    plist = require('plist'),
    rootdir;

var platformConfig = (function() {
    var configXmlData;

    return {
        parseConfig: function(platform) {
            var configData = {};
            var configFiles = this.getFilesByTarget(platform),
                type = 'configFile';

            _.each(configFiles, function(configFile, key) {
                var keyParts = key.split('|');
                var target = keyParts[0];
                var parent = keyParts[1];
                var items = configData[target] || [];

                _.each(configFile.getchildren(), function(element) {
                    items.push({
                        parent: parent,
                        type: type,
                        destination: element.tag,
                        data: element
                    });
                });

                configData[target] = items;
            });

            return configData;
        },

        getConfig: function() {
            if (!configXmlData) {
                var contents = fs.readFileSync(path.join(rootdir, 'config.xml'), 'utf-8');
                if (contents) {
                    contents = contents.substring(contents.indexOf('<'));
                }
                configXmlData = new et.ElementTree(et.XML(contents));
            }

            return configXmlData;
        },

        getFilesByTarget: function(platform) {
            var configFileData = this.getConfig().findall('platform[@name=\'' + platform + '\']/config-file');

            return _.indexBy(configFileData, function(item) {
                var parent = item.attrib.parent;
                if (!parent || parent === '/*' || parent === '*/') {
                    parent = './';
                }
                return item.attrib.target + '|' + parent;
            });
        },

        toXmlString: function(data) {
            var tag = data.tag;
            var el = '<' + tag + '>';

            if (data.text && data.text.trim()) {
                el += data.text.trim();
            } else {
                _.each(data.getchildren(), function(child) {
                    el += platformConfig.toXmlString(child);
                });
            }

            el += '</' + tag + '>';
            return el;
        },

        updatePlatformConfig: function(platform) {
            var configData = this.parseConfig(platform),
                platformPath = path.join(rootdir, 'platforms', platform);

            _.each(configData, function(configItems, targetFileName) {
                var projectName, targetFile;

                if (platform === 'ios' && targetFileName.indexOf("Info.plist") > -1) {
                    projectName = platformConfig.getConfig().findtext('name');
                    targetFile = path.join(platformPath, projectName, projectName + '-Info.plist');
                    platformConfig.updateIosPlist(targetFile, configItems);
                }
            });
        },

        updateIosPlist: function(targetFile, configItems) {
            var infoPlist = plist.parse(fs.readFileSync(targetFile, 'utf-8')),
                tempInfoPlist;

            _.each(configItems, function(item) {
                var key = item.parent;
                var plistXml = '<plist><dict><key>' + key + '</key>';
                plistXml += platformConfig.toXmlString(item.data) + '</dict></plist>';

                var configPlistObj = plist.parse(plistXml);
                infoPlist[key] = configPlistObj[key];
            });

            tempInfoPlist = plist.build(infoPlist);
            tempInfoPlist = tempInfoPlist.replace(/<string>[\s\r\n]*<\/string>/g, '<string></string>');
            fs.writeFileSync(targetFile, tempInfoPlist, 'utf-8');
        }
    };
})();

(function() {
    if (rootdir = path.resolve(__dirname, '../../')) {
        var platforms = _.filter(fs.readdirSync('platforms'), function(file) {
            return fs.statSync(path.resolve('platforms', file)).isDirectory();
        });

        _.each(platforms, function(platform) {
            try {
                platform = platform.trim().toLowerCase();
                platformConfig.updatePlatformConfig(platform);
            } catch (e) {
                process.stdout.write(e);
            }
        });
    }
})();
