var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync')

gulp.task('pug', function () {
    return gulp.src( 'src/pug/**/*.pug' )
        .pipe( pug({pretty: true}) )
        .pipe( gulp.dest( './src/' ) )
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function(){
    return gulp.src('src/styles/**/*.+(sass|scss)')
        .pipe(sass())
        .pipe(gulp.dest('src/styles/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('sassServer', function(){
    return gulp.src('src/public/**/*.+(sass|scss)')
        .pipe(sass())
        .pipe(gulp.dest('server/public'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('coffee', function(){
    gulp.src('src/scripts/**/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('src/scripts'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('coffeeServer', function(){
    gulp.src('server/**/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('server'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'src/'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync' ,'coffee', 'sass', 'pug', 'coffeeServer'], function(){
    gulp.watch('src/styles/**/*.+(sass|scss)', ['sass']);
    gulp.watch('src/pug/**/*.pug', ['pug']);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/scripts/**/*.js', browserSync.reload);
    gulp.watch('src/scripts/**/*.coffee', ['coffee']);
    gulp.watch('server/**/*.coffee', ['coffeeServer']);
});

gulp.task('watchServer', ['coffeeServer', 'sassServer'], function(){
    gulp.watch('server/public/styles/**/*.+(sass|scss)', ['sassServer']);
    gulp.watch('server/**/*.coffee', ['coffeeServer']);
});
