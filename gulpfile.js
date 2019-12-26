const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
var concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {VIDEO_PATH, FONTS_PATH, IMG_PATH, CSS_PATH, DIST_PATH, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task( 'clean', () => {
  return src( `${DIST_PATH}/**/*`, { read: false })
    .pipe( rm() )
});

task("copy:html", () => {
  return src('*.html')
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
});

task("copy:img", () => {
  return src( `${IMG_PATH}/**/*`)
  .pipe(dest(`${DIST_PATH}/img`))
  .pipe(reload({stream: true}));
});

task("copy:fonts", () => {
  return src(`${FONTS_PATH}/*`).pipe(dest(`${DIST_PATH}/fonts`))
  .pipe(reload({stream: true}));
});

task("copy:video", () => {
  return src(`${VIDEO_PATH}/*`).pipe(dest(`${DIST_PATH}/video`))
  .pipe(reload({stream: true}));
});

task("styles", () => {
  return src([
    `${CSS_PATH}/main.scss`
  ])
  .pipe(gulpif(env === "dev", sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem())
  .pipe(gulpif(env === 'dev',
    autoprefixer({
    cascade: false
  })))
  .pipe(gulpif(env === 'prod', gcmq()))
  .pipe(gulpif(env === 'prod', cleanCSS()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(`${DIST_PATH}/css/`))
  .pipe(reload({stream: true}));
});

const libs = [
  `${JS_LIBS}`,
  
]

task('scripts', () => {
  return src([
    ...JS_LIBS,
    'js/main.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest(`${DIST_PATH}/js`))
  .pipe(reload({stream: true}));
});

// task("icons", () => {
//   return src("img/icons/sprite.svg")
//   .pipe(svgSprite({
//     mode: {
//       symbol: {
//         sprite: "../sprite2.svg"
//       }
//     }
//   }))
// });

task('server', function() {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
});

task("watch", () => {
  watch('./CSS_PATH/**/*.scss', series('styles'));
watch('./*.html', series('copy:html'));
watch('./js/*.js', series('scripts'));
watch('./img/**/*', series('copy:img'));
watch('./fonts/*', series('copy:fonts'));
watch('./video/*', series('copy:video'));
});


task(
  'default', 
  series(
    "clean",
    parallel("copy:html", "copy:img", "copy:fonts", "copy:video", "styles", "scripts"),
    parallel("watch", "server")
  )
);

task(
  'build', 
  series(
    "clean",
    parallel("copy:html", "copy:img", "copy:fonts", "copy:video", "styles", "scripts"),
  )
);
