const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const plumber = require('gulp-plumber');
const babelify = require('babelify');
const browserify = require('gulp-browserify');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  })
});

gulp.task('css', () => {
  return gulp.src('src/sass/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
});

gulp.task('js', () => {
  return gulp.src('src/js/main.js')
    .pipe(plumber())
    .pipe(browserify({
        debug: true,
        transform: [babelify.configure({
          presets: ['es2015']
        })]
      }))
    .pipe(rename({
      suffix: ".prod"
    }))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch('src/index.html').on('change', browserSync.reload);
  gulp.watch(['src/js/**/*.js', '!src/js/main.prod.js'], ['js']);
})

gulp.task('default', ['watch']);

// gulp.task('buildCss', ['css'], () => {
//   return gulp.src('src/main.css')
//     .pipe(plumber())
// })

gulp.task('clean', () => {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'css'], () => {
  const bCss = gulp.src('src/css/main.min.css')
    .pipe(plumber())
    .pipe(gulp.dest('dist/css'))

  const bFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

  const bImg = gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))

  const bJs = gulp.src('src/js/main.prod.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

  const bHtml = gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
});
