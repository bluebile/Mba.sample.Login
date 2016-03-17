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

// no need to configure below


if (process.env.CORDOVA_PLATFORMS.toLowerCase().indexOf('android') != -1) {
    var fs = require('fs'),
        rootdir = process.argv[2];
    fs.mkdir(rootdir + '/platforms/android/res/drawable-xxhdpi');
    fs.mkdir(rootdir + '/platforms/android/res/drawable-xxxhdpi');

    fs.mkdir(rootdir + '/platforms/android/res/drawable-land-xxhdpi');
    fs.mkdir(rootdir + '/platforms/android/res/drawable-port-xxhdpi');

    fs.mkdir(rootdir + '/platforms/android/res/drawable-land-xxxhdpi');
    fs.mkdir(rootdir + '/platforms/android/res/drawable-port-xxxhdpi');
}