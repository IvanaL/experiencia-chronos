'use strict';
// Plugins
const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  minify = require('gulp-minify'),
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync').create();
  //php = require('gulp-connect-php');


// Paths
const path = {
  files : {
    srcPath : './src/*.*',
    distPath : 'dist/'
  },
  styles : {
    srcScssPath : './src/scss/**/*.scss',
    distCssPath : 'dist/css/'
  },
  scripts : {
    srcJsPath : './src/js/**/*.js',
    distJsPath : 'dist/js/'
  },
  images : {
    srcImgPath : './src/images/*',
    distImgPath : 'dist/images/'
  },
  fonts : {
    srcFontsPath : './src/fonts/**/*',
    distFontsPath : 'dist/fonts/'
  }
}


// ::::: GULP TASKS :::::

// Compile Sass  & Livereload
sass.compiler = require('node-sass');
gulp.task('sass', function(){
  console.log('Compiling Sass...');
  return gulp.src(path.styles.srcScssPath)
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest(path.styles.distCssPath))
          .pipe(browserSync.reload({stream : true}));
});

// Minify, Copy images & Livereload
gulp.task('images', function() {

  return gulp.src(path.images.srcImgPath)
          .pipe(imagemin({
            verbose : true
          }))
          .pipe(gulp.dest(path.images.distImgPath))
          .pipe(browserSync.reload({stream : true}));
});

// Concat & minify JS
gulp.task('js', function(){
  // Minificating & concatenating JS files...
  console.log('Minifying Scripts...');
  return gulp.src(path.scripts.srcJsPath)
          .pipe(minify())
          .pipe(gulp.dest(path.scripts.distJsPath))
          .pipe(browserSync.reload({stream : true}));
});

// Move fonts to dist
gulp.task('fonts', function() {
  return gulp.src(path.fonts.srcFontsPath)
          .pipe(gulp.dest(path.fonts.distFontsPath))
          .pipe(browserSync.reload({stream : true}));
});

// Copy HTML & Livereload
gulp.task('copy', function(){
  console.log('Copying HTML files...');

   return gulp.src(path.files.srcPath)
          .pipe(gulp.dest(path.files.distPath))
          .pipe(browserSync.reload({stream : true}));
});

// Php runner
/*gulp.task('php', function(){
    php.server({base:'./src/*.*', port:8010, keepalive:true});
});*/

// Server & Watchers
gulp.task('serve', gulp.series('sass', 'copy', 'js', 'images', 'fonts', function(){

  browserSync.init({
    server : path.files.distPath
    //baseDir: "./src/*.*",
    //open:true,
    //notify:false
  });

  gulp.watch(path.styles.srcScssPath, gulp.series('sass'));
  gulp.watch(path.files.srcPath, gulp.series('copy'));
  gulp.watch(path.images.srcImgPath, gulp.series('images'));
  gulp.watch(path.scripts.srcJsPath, gulp.series('js'));
  gulp.watch(path.fonts.srcFontsPath, gulp.series('fonts'));
  //gulp.watch('./*.php', browserSync.reload);
}));