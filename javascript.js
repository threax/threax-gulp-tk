var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps");

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
exports.minifyEachJs = minifyEachJs;

function concatJs(settings) {
    return gulp.src(settings.libs, { base: settings.base })
        .pipe(sourcemaps.init())
        .pipe(concat(settings.output + '.js'))
        .pipe(sourcemaps.write(".", { includeContent: false, sourceRoot: settings.sourceRoot }))
        .pipe(gulp.dest(settings.dest));
};
exports.concatJs = concatJs;