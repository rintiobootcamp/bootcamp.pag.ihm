 var gulp = require('gulp');

 var browserSync = require('browser-sync');

 gulp.task('serve',['browserSync'], function () {
     gulp.watch('src/**.js',browserSync.reload);
     gulp.watch('src/**.html',browserSync.reload);
 });

 gulp.task('browserSync', function () {
     browserSync({
         server:{
             baseDir:''
         }
     })
});