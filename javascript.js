var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps");

var copy = require('./copy.js');

//Minification
function compileJavascript(settings) {
    if (settings.minify && settings.concat) {
        minifyConcatJs(settings);
        concatJs(settings);
    }
    else if (settings.minify) {
        minifyEachJs(settings);
    }
    else if (settings.concat) {
        concatJs(settings);
    }
    else {
        copy(settings);
    }
}
module.exports = compileJavascript;

function minifyConcatJs(settings) {
    return gulp.src(settings.libs, { base: settings.base })
        .pipe(sourcemaps.init())
        .pipe(concat(settings.output + '.js'))
        .pipe(uglify())
        .pipe(rename(settings.output + '.min.js'))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: settings.sourceRoot }))
        .pipe(gulp.dest(settings.dest));
};

function minifyEachJs(settings) {
    gulp.src(settings.libs, { base: settings.base })
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js";
        }))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: settings.sourceRoot }))
        .pipe(gulp.dest(settings.dest));
};

function concatJs(settings) {
    return gulp.src(settings.libs, { base: settings.base })
        .pipe(sourcemaps.init())
        .pipe(concat(settings.output + '.js'))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: settings.sourceRoot }))
        .pipe(gulp.dest(settings.dest));
};