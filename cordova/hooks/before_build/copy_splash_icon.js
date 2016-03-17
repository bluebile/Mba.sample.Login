#!/usr/bin/env node

//
// This hook copies various resource files
// from our version control system directories
// into the appropriate platform specific location
//


// configure all the files to copy.
// Key of object is the source file,
// value is the destination location.
// It's fine to put all platforms' icons
// and splash screen files here, even if
// we don't build for all platforms
// on each developer's box.

var cordova_util = require(process.cwd() + '/../node_modules/cordova/node_modules/cordova-lib/src/cordova/util'),
    projectRoot = cordova_util.isCordova(process.cwd()),
    projectXml = cordova_util.projectConfig(projectRoot),
    ConfigParser = require(process.cwd() + '/../node_modules/cordova/node_modules/cordova-lib/src/configparser/ConfigParser');

var cfg = new ConfigParser(projectXml);

var filestocopy = [{
    "config/android/res/drawable/pw_notification.png": "platforms/android/res/drawable/pw_notification.png"
}, {
    "config/android/res/drawable/icon.png": "platforms/android/res/drawable/icon.png"
}, {
    "config/android/res/drawable-hdpi/icon.png": "platforms/android/res/drawable-hdpi/icon.png"
}, {
    "config/android/res/drawable-ldpi/icon.png": "platforms/android/res/drawable-ldpi/icon.png"
}, {
    "config/android/res/drawable-mdpi/icon.png": "platforms/android/res/drawable-mdpi/icon.png"
}, {
    "config/android/res/drawable-xhdpi/icon.png": "platforms/android/res/drawable-xhdpi/icon.png"
}, {
    "config/android/res/drawable-xxhdpi/icon.png": "platforms/android/res/drawable-xxhdpi/icon.png"
}, {
    "config/android/res/drawable-xxxhdpi/icon.png": "platforms/android/res/drawable-xxxhdpi/icon.png"
}, {
    "config/android/res/drawable/screen.png": "platforms/android/res/drawable/screen.png"
}, {
    "config/android/res/drawable-port-hdpi/screen.png": "platforms/android/res/drawable-port-hdpi/screen.png"
}, {
    "config/android/res/drawable-port-ldpi/screen.png": "platforms/android/res/drawable-port-ldpi/screen.png"
}, {
    "config/android/res/drawable-port-mdpi/screen.png": "platforms/android/res/drawable-port-mdpi/screen.png"
}, {
    "config/android/res/drawable-port-xhdpi/screen.png": "platforms/android/res/drawable-port-xhdpi/screen.png"
}, {
    "config/android/res/drawable-port-xxhdpi/screen.png": "platforms/android/res/drawable-port-xxhdpi/screen.png"
}, {
    "config/android/res/drawable-port-xxxhdpi/screen.png": "platforms/android/res/drawable-port-xxxhdpi/screen.png"
}, {
    "config/android/res/drawable-land-hdpi/screen.png": "platforms/android/res/drawable-land-hdpi/screen.png"
}, {
    "config/android/res/drawable-land-ldpi/screen.png": "platforms/android/res/drawable-land-ldpi/screen.png"
}, {
    "config/android/res/drawable-land-mdpi/screen.png": "platforms/android/res/drawable-land-mdpi/screen.png"
}, {
    "config/android/res/drawable-land-xhdpi/screen.png": "platforms/android/res/drawable-land-xhdpi/screen.png"
}, {
    "config/android/res/drawable-land-xxhdpi/screen.png": "platforms/android/res/drawable-land-xxhdpi/screen.png"
}, {
    "config/android/res/drawable-land-xxxhdpi/screen.png": "platforms/android/res/drawable-land-xxxhdpi/screen.png"
}, {
    "config/android/res/drawable-port-hdpi/screen.9.png": "platforms/android/res/drawable-port-hdpi/screen.9.png"
}, {
    "config/android/res/drawable-port-ldpi/screen.9.png": "platforms/android/res/drawable-port-ldpi/screen.9.png"
}, {
    "config/android/res/drawable-port-mdpi/screen.9.png": "platforms/android/res/drawable-port-mdpi/screen.9.png"
}, {
    "config/android/res/drawable-port-xhdpi/screen.9.png": "platforms/android/res/drawable-port-xhdpi/screen.9.png"
}, {
    "config/android/res/drawable-port-xxhdpi/screen.9.png": "platforms/android/res/drawable-port-xxhdpi/screen.9.png"
}, {
    "config/android/res/drawable-port-xxxhdpi/screen.9.png": "platforms/android/res/drawable-port-xxxhdpi/screen.9.png"
}, {
    "config/android/res/drawable-port-hdpi/screen.9.png": "platforms/android/res/drawable-port-hdpi/screen.9.png"
}, {
    "config/android/res/drawable-land-ldpi/screen.9.png": "platforms/android/res/drawable-land-ldpi/screen.9.png"
}, {
    "config/android/res/drawable-land-hdpi/screen.9.png": "platforms/android/res/drawable-land-hdpi/screen.9.png"
}, {
    "config/android/res/drawable-land-mdpi/screen.9.png": "platforms/android/res/drawable-land-mdpi/screen.9.png"
}, {
    "config/android/res/drawable-land-xhdpi/screen.9.png": "platforms/android/res/drawable-land-xhdpi/screen.9.png"
}, {
    "config/android/res/drawable-land-xxhdpi/screen.9.png": "platforms/android/res/drawable-land-xxhdpi/screen.9.png"
}, {
    "config/android/res/drawable-land-xxxhdpi/screen.9.png": "platforms/android/res/drawable-land-xxxhdpi/screen.9.png"
}, {
    "config/ios/Resources/icons/icon.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon.png"
}, {
    "config/ios/Resources/icons/icon@2x.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon@2x.png"
}, {
    "config/ios/Resources/icons/icon-40.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-40.png"
}, {
    "config/ios/Resources/icons/icon-40@2x.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-40@2x.png"
}, {
    "config/ios/Resources/icons/icon-50.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-50.png"
}, {
    "config/ios/Resources/icons/icon-50@2x.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-50@2x.png"
}, {
    "config/ios/Resources/icons/icon-60.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-60.png"
}, {
    "config/ios/Resources/icons/icon-60@2x.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-60@2x.png"
}, {
    "config/ios/Resources/icons/icon-60@3x.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-60@3x.png"
}, {
    "config/ios/Resources/icons/icon-72.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-72.png"
}, {
    "config/ios/Resources/icons/icon-72@2x.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-72@2x.png"
}, {
    "config/ios/Resources/icons/icon-76.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-76.png"
}, {
    "config/ios/Resources/icons/icon-76@2x.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-76@2x.png"
}, {
    "config/ios/Resources/icons/icon-small.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-small.png"
}, {
    "config/ios/Resources/icons/icon-small@2x.png": "platforms/ios/" + cfg.name() + "/Resources/icons/icon-small@2x.png"
}, {
    "config/ios/Resources/icons/icon-small@3x.png" : "platforms/ios/" + cfg.name() + "/Resources/icons/icon-small@3x.png"
}, {
    "config/ios/Resources/splash/Default@2x~iphone.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default@2x~iphone.png"
}, {
    "config/ios/Resources/splash/Default-568h@2x~iphone.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default-568h@2x~iphone.png"
}, {
    "config/ios/Resources/splash/Default-Landscape-568h@2x~iphone.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default-Landscape-568h@2x~iphone.png"
}, {
    "config/ios/Resources/splash/Default~iphone.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default~iphone.png"
}, {
    "config/ios/Resources/splash/Default-Portrait~ipad.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default-Portrait~ipad.png"
}, {
    "config/ios/Resources/splash/Default-Portrait@2x~ipad.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default-Portrait@2x~ipad.png"
}, {
    "config/ios/Resources/splash/Default-Landscape~iphone.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default-Landscape~iphone.png"
}, {
    "config/ios/Resources/splash/Default-Landscape@2x~iphone.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default-Landscape@2x~iphone.png"
}, {
    "config/ios/Resources/splash/Default-Landscape~ipad.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default-Landscape~ipad.png"
}, {
    "config/ios/Resources/splash/Default-Landscape@2x~ipad.png": "platforms/ios/" + cfg.name() + "/Resources/splash/Default-Landscape@2x~ipad.png"
}, {
    "config/ios/Resources/splash/Default-667h.png" : "platforms/ios/" + cfg.name() + "/Resources/splash/Default-667h.png"
}, {
    "config/ios/Resources/splash/Default-736h.png" : "platforms/ios/" + cfg.name() + "/Resources/splash/Default-736h.png"
}, {
    "config/ios/Resources/splash/Default-Landscape-736h.png" : "platforms/ios/" + cfg.name() + "/Resources/splash/Default-Landscape-736h.png"
}, {
    "config/wp8/screen.screen-1080p.jpg": "platforms/wp8/screen.screen-1080p.jpg"
}, {
    "config/wp8/screen.screen-720p.jpg": "platforms/wp8/screen.screen-720p.jpg"
}, {
    "config/wp8/screen.screen-wxga.jpg": "platforms/wp8/screen.screen-wxga.jpg"
}, {
    "config/wp8/screen.screen-wvga.jpg": "platforms/wp8/screen.screen-wvga.jpg"
}, {
    "config/wp8/Background.png": "platforms/wp8/Background.png"
}, {
    "config/wp8/ApplicationIcon.png": "platforms/wp8/ApplicationIcon.png"
}, {
    "config/wp8/Assets/BadgeLogo.png" : "platforms/wp8/Assets/BadgeLogo.png"
}, {
    "config/wp8/Assets/Logo.png" : "platforms/wp8/Assets/Logo.png"
}, {
    "config/wp8/SplashScreenImage.jpg" : "platforms/wp8/SplashScreenImage.jpg"
}, {
    "config/wp8/Assets/SplashScreen.png" : "platforms/wp8/Assets/SplashScreen.png"
}, {
    "config/wp8/Assets/SquareTile150x150.png" : "platforms/wp8/Assets/SquareTile150x150.png"
}, {
    "config/wp8/Assets/SquareTile71x71.png" : "platforms/wp8/Assets/SquareTile71x71.png"
}, {
    "config/wp8/Assets/StoreLogo.png" : "platforms/wp8/Assets/StoreLogo.png"
}, {
    "config/wp8/Assets/WideLogo.png" : "platforms/wp8/Assets/WideLogo.png"
}, {
    "config/blackberry10/icon-90.png": "platforms/blackberry10/www/res/icon-90.png"
}, {
    "config/blackberry10/icon-96.png": "platforms/blackberry10/www/res/icon-96.png"
}, {
    "config/blackberry10/icon-96.png": "platforms/blackberry10/www/res/icon-110.png"
}, {
    "config/blackberry10/icon-96.png": "platforms/blackberry10/www/res/icon-144.png"
}, {
    "config/blackberry10/splash-600x1024.png": "platforms/blackberry10/www/res/splash-600x1024.png"
}, {
    "config/blackberry10/splash-768x1280.png": "platforms/blackberry10/www/res/splash-768x1280.png"
}];

var fs = require('fs'),
    path = require('path'),
    rootdir = process.argv[2];

filestocopy.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
        var val = obj[key],
            srcfile = path.join(rootdir, key),
            destfile = path.join(rootdir, val),
            destdir = path.dirname(destfile);

        try {
            fs.unlinkSync(destfile);
            if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                fs.createReadStream(srcfile).pipe(
                    fs.createWriteStream(destfile));
            }
        } catch (e) {
            //console.log(e.toString());

            if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                fs.createReadStream(srcfile).pipe(
                    fs.createWriteStream(destfile));
            }
        }
    });
});
