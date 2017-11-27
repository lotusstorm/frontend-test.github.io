const gulp         = require('gulp');
const less         = require('gulp-less');
const browserSync  = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
// const rename       = require('gulp-rename');
const pug          = require('gulp-pug');
const sourcemaps   = require('gulp-sourcemaps');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const imagemin     = require('gulp-imagemin');
const cssmin       = require('gulp-clean-css');
const gulpIf       = require('gulp-if');

const isProdaction = process.env.NODE_ENV == 'prodaction';

// Автоперезагрузка при изменении файлов в папке `dist`:
// Принцип: меняем файлы в `/src`, они обрабатываются и переносятся в `dist` и срабатывает автоперезагрузка.
// Это таск нужен только при локальной разработке.
gulp.task('livereload', () => {
    browserSync.create();

    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        files: [
            'dist/**/*.*'
        ]
    });
});

gulp.task('styles', () => {
    gulp.src('src/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulpIf(isProdaction, cssmin()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('img', () => {
    gulp.src('src/img/**/*.*')
        .pipe(gulpIf(isProdaction, imagemin()))
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('js', () => {
    gulp.src(['src/**/*.js', '!src/_assets/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulpIf(isProdaction, uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', () => {
    gulp.src(['src/*.pug', '!src/template.pug' ])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./dist'));
});

// Отслеживание изменений в файлах, нужно только при локальной разработке
gulp.task('watch', () => {
    gulp.watch('src/**/*.less', ['styles']);
    gulp.watch('src/**/*.pug', ['html']);
    gulp.watch('src/img/**/*.*', ['img']);
    gulp.watch('src/**/*.*', ['js']);
});

gulp.task('default', ['styles', 'html', 'img', 'js', 'livereload', 'watch']);
gulp.task('prod', ['styles', 'html', 'img', 'js']);
