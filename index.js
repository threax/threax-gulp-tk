var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps");
var less = require('gulp-less');
var uglifycss = require('gulp-uglifycss');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

function copyFiles(settings) {
    gulp.src(settings.libs, { base: settings.baseName })
        .pipe(gulp.dest(settings.dest));
}
exports.copyFiles = copyFiles;

//Minification
function minifyConcat(settings) {
    minifyJs(settings);
    concatJs(settings);
}
exports.minifyConcat = minifyConcat;

function minifyJs(settings) {
    return gulp.src(settings.libs, { base: settings.base })
        .pipe(sourcemaps.init())
        .pipe(concat(settings.output + '.js'))
        .pipe(uglify())
        .pipe(rename(settings.output + '.min.js'))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: settings.sourceRoot }))
        .pipe(gulp.dest(settings.dest));
};
exports.minifyJs = minifyJs;

function concatJs(settings) {
    return gulp.src(settings.libs, { base: settings.base })
        .pipe(sourcemaps.init())
        .pipe(concat(settings.output + '.js'))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: settings.sourceRoot }))
        .pipe(gulp.dest(settings.dest));
};
exports.concatJs = concatJs;

function compileLess(settings) {
    return gulp.src(settings.files, { base: settings.baseName })
           .pipe(plumber(function (error) {
               gutil.log(gutil.colors.red(error.message));
               gutil.beep();
               this.emit('end');
           }))
           .pipe(less({
               paths: settings.importPaths
           }))
           .pipe(uglifycss({
               "maxLineLen": 80,
               "uglyComments": true
           }))
           .pipe(gulp.dest(settings.dest));
}
exports.compileLess = compileLess;