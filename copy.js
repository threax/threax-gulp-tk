var gulp = require("gulp");

function copyFiles(settings) {
    return gulp.src(settings.libs, { base: settings.baseName })
        .pipe(gulp.dest(settings.dest));
}
module.exports = copyFiles;