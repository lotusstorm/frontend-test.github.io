const gulp         = require('gulp');
const less         = require('gulp-less');
const browserSync  = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require('gulp-rename');
const ejs          = require('gulp-ejs');
const gutil        = require('gulp-util');
const sourcemaps   = require('gulp-sourcemaps');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const imagemin     = require('gulp-imagemin');
const cssmin       = require('gulp-clean-css');
const gulpIf       = require('gulp-if');
const data         = require('./src/data');

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
    gulp.src('src/less/main.less')
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
    gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulpIf(isProdaction, uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', () => {
    gulp.src('src/index.ejs')
        .pipe(ejs(data).on('error', gutil.log))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('fonts', () => {
    gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

// Отслеживание изменений в файлах, нужно только при локальной разработке
gulp.task('watch', () => {
    gulp.watch('src/less/*.less', ['styles']);
    gulp.watch('src/**/*.ejs', ['html']);
    gulp.watch('src/img/**/*.*', ['img']);
    gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', ['livereload', 'watch', 'styles', 'html', 'img', 'js', 'fonts']);
gulp.task('prod', ['styles', 'html', 'img', 'js', 'fonts']);
