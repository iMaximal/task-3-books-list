const gulp = require('gulp')
const path = require('path')
const rename = require('gulp-rename')
const named = require('vinyl-named')
const plumber = require('gulp-plumber')
const uglify = require('gulp-uglify')
const gulpif = require('gulp-if')
const debug = require('gulp-debug')
const rev = require('gulp-rev')
const stylus = require('gulp-stylus')
const revReplace = require('gulp-rev-replace')
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack/webpack.config')

const environment = process.env.NODE_ENV || 'development'
const DEBUG = environment !== 'production'

gulp.task('clean-js', function () {
    return gulp.src('public/js/*.js', {read: false})
        .pipe(clean())
})

gulp.task('react', () => {
    return gulp.src('src/js/index.js')
        .pipe(named())
        .pipe(debug({title: 'after named:'}))
        .pipe(plumber())
        .pipe(debug({title: 'after plumber:'}))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(debug({title: 'after webpack:'}))
        .pipe(gulpif(!DEBUG, uglify()))
        .pipe(rename('bootstrap.js'))
        .pipe(gulp.dest(path.join('public', 'js')))
})

gulp.task('assets', () => {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('public'))
})

gulp.task('stylus', () => {
    return gulp.src('src/stylus/style.styl')
        .pipe(plumber())
        .pipe(stylus({
            compress: !DEBUG
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.join('public', 'css')))
        .pipe(gulpif(!DEBUG, rev.manifest('stylus.json')))
        .pipe(gulpif(!DEBUG, gulp.dest('manifest')))
})

gulp.task('dist', ['clean-js', 'react', 'assets', 'stylus'], () => {
    return gulp.src('src/index.html')
        .pipe(gulpif(!DEBUG, revReplace({
            manifest: gulp.src('manifest/react.json'),
        })))
        .pipe(gulpif(!DEBUG, revReplace({
            manifest: gulp.src('manifest/stylus.json'),
        })))
        .pipe(gulp.dest('public'))
})

gulp.task('watch', () => {
    gulp.watch('src/assets/**/*', ['assets'])
    gulp.watch('src/index.html', ['public'])
    gulp.watch('src/js/**/*', ['react'])
    gulp.watch('src/**/*.styl', ['stylus'])
})

gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(require('gulp-eslint')())
        .pipe(require('gulp-eslint').failAfterError())
})

gulp.task('dev', ['dist', 'watch'], () => {
    require('gulp-nodemon')({
        script: './index.js',
        ignore: [
            'public/',
            'node_modules/',
            'src/',
            'test/'
        ]
    })
})
