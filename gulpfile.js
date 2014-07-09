var gulp = require('gulp');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglify');
var bower = require ('gulp-bower-files');
var clean = require ('gulp-clean');
var Q = require('q');
var exec = require('child_process').exec;
var editJson = require('gulp-json-editor');
var runSequence = require('gulp-run-sequence');
var glob = require('glob');
var zip = require('gulp-zip');

function tag () {
    var q = Q.defer();
    exec('git describe --tags --always --dirty', function (err, stdout, stderr) {
        if (err) {
            q.reject(err);
            return;
        }

        q.resolve(stdout.replace(/\n/, ''));
    });
    return q.promise;
}

function version () {
    return tag().then(function (tag) {
        return tag.replace(/-(\d+)/, '.$1')
        .replace(/-g[0-9a-f]+/, '')
        .replace(/-dirty/, '');
    });
}
gulp.task('default', ['build']);

gulp.task('copy', ['copy-manifest', 'copy-src', 'copy-html', 'copy-vendor']);

gulp.task('copy-manifest', function () {
    return gulp.src('src/manifest.json')
    .pipe(gulp.dest('app'));
});

gulp.task('copy-src', function () {
    return gulp.src('src/*.js')
    .pipe(gulp.dest('app/js'));
});

gulp.task('copy-html', function () {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('app'));
});

gulp.task('copy-vendor', function () {
    return gulp.src('vendor/*.js')
    .pipe(gulp.dest('app/vendor'));
});

gulp.task('bower', function () {
    return (function () {
        return bower().pipe(uglify({preserveComments:'some'}))
        .pipe(flatten())
        .pipe(gulp.dest('app/vendor'));
    }());
});

gulp.task('clean', function () {
    return gulp.src('app')
    .pipe(clean());
});

gulp.task('manifest', function () {
    return version().then(function (version) {
        return gulp.src('src/manifest.json')
        .pipe(editJson({ version: version }))
        .pipe(gulp.dest('app/'));
    });
});

gulp.task('build', function () {
    runSequence('bower', 'copy', 'manifest');
});

gulp.task('zip', ['build'], function () {
    return version().then(function (version) {
        return gulp.src('app/**/*')
        .pipe(zip('force-metacpan' + version + '.zip'))
        .pipe(gulp.dest('build'));
    });
});

