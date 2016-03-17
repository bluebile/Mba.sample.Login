var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs   = require('gulp-jscs'),
    jscpd = require('gulp-jscpd'),
    complexity = require('gulp-complexity'),
    minimist = require('minimist'),
    fs = require('fs'),
    knownOptions, options, configCS, configCPD;

knownOptions = {
    string: [ 'target', 'reporter-lint', 'reporter-cs', 'output-cpd' ],
    default: { "target": 'app/**/*.js', "reporter-lint": 'default' }
};

function escapeAttrValue(attrValue) {
    return String(attrValue)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

configCS = {
    configPath: '.jscsrc'
};
configCPD = {
    verbose: true
};

options = minimist(process.argv.slice(2), knownOptions);

if (options['reporter-cs']) {
    configCS.reporter = options['reporter-cs'];

    if (options['cs-file']) {
        var fileContent = [];
        configCS.reporter = function(errorCollection) {
            fileContent.push('<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="4.3">');
            errorCollection.forEach(function (errors) {
                fileContent.push('    <file name="' + escapeAttrValue(errors.getFilename()) + '">');
                errors.getErrorList().forEach(function (error) {
                    fileContent.push(
                        '        <error ' +
                        'line="' + error.line + '" ' +
                        'column="' + (error.column + 1) + '" ' +
                        'severity="error" ' +
                        'message="' + escapeAttrValue(error.message) + '" ' +
                        'source="jscs" />'
                    );
                });
                fileContent.push('    </file>');
            });
            fileContent.push('</checkstyle>');
            fs.writeFile(options['cs-file'], fileContent.join('\n'));
        }
    }
}

if (options['output-cpd']) {
    configCPD.output = options['output-cpd'];
}

gulp.task('lint', function() {
    return gulp.src(options.target)
        .pipe(jshint())
        .pipe(jshint.reporter(options['reporter-lint']));
});

gulp.task('cs', function(cb) {
    return gulp.src(options.target)
        .pipe(jscs())
        .pipe(jscs.reporter(configCS.reporter));

    cb();
});

gulp.task('cpd', function(cb) {
    return gulp.src(options.target)
        .pipe(jscpd(configCPD));
    cb();
});

gulp.task('pmd', function(cb) {
    return gulp.src(options.target)
        .pipe(complexity());

    cb();
});
