var gulp = require("gulp");
var convertEncoding = require('gulp-convert-encoding');

function copyFiles(settings) {
    var task = gulp.src(settings.libs, { base: settings.baseName })

    if(settings.convertTo !== undefined){
        task = task.pipe(convertEncoding({to: settings.convertTo}));
    }

    task = task.pipe(gulp.dest(settings.dest));

    return task;
}
module.exports = copyFiles;