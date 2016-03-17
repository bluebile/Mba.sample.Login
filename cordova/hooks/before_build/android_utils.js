#!/usr/bin/env node

var cordova_util = require(process.cwd() + '/../node_modules/cordova/node_modules/cordova-lib/src/cordova/util'),
    projectRoot = cordova_util.isCordova(process.cwd()),
    projectXml = cordova_util.projectConfig(projectRoot),
    ConfigParser = require(process.cwd() + '/../node_modules/cordova/node_modules/cordova-lib/src/configparser/ConfigParser'),
    fs = require('fs'), rootdir = process.argv[2], file = null,  path = require('path'), code = '',
    activityName = null, activity,
    screenOrientation = '				this.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);';

var cfg = new ConfigParser(projectXml);

if ((process.env.CORDOVA_PLATFORMS.toLowerCase().indexOf('android') == -1)) {
    return;
}

if (cfg.getPreference('androidTheme')) {
    file = fs.readFileSync(path.join(rootdir, '/platforms/android/AndroidManifest.xml'));
    file = file.toString().replace(/android:theme="(.*?)"/,'android:theme="@android:style/' + cfg.getPreference('androidTheme') + '"');
    fs.writeFile(path.join(rootdir, '/platforms/android/AndroidManifest.xml'), file);
}
activityName = cfg.doc.getroot().attrib['android-activityName'];
activity = path.join(rootdir, '/platforms/android/src/' + cfg.packageName().replace(/\./g,'/') + '/' + activityName + '.java');
file = fs.readFileSync(activity);
if (cfg.getPreference('Orientation')) {
    if (file.toString().match(/.*setRequestedOrientation.*/) != null) {
        return;
    }
    code = file.toString().match(/(loadUrl.*)/)[1];
    code += '\n';
    if (cfg.getPreference('Orientation') != 'portrait') {
        screenOrientation = '				this.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);';
    }

    code += screenOrientation;
    file = file.toString().replace(/(loadUrl.*)/, code);

} else {
    file.toString().replace(/\n.*SCREEN_ORIENTATION.*\);/, '');
}

fs.writeFile(activity, file);