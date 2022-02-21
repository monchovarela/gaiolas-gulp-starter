const gulp = require('gulp');

// Javascript
const babel = require('gulp-babel');
const minify = require('gulp-minify');

// Nunjucks
const render = require('gulp-nunjucks-render');
const htmlmin = require('gulp-htmlmin');
const data = require('gulp-data');
const yaml = require('gulp-yaml');
const fs = require('fs');

// Sass
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));

// Clean
const clean = require('gulp-clean');

// Browser sync
const browserSync = require('browser-sync').create();

// Folders
const src = `${__dirname}/src`;
const dist = `${__dirname}/public`;

/**
 * Name: clean
 * Pipe: gulp-clean
 * Desc: Clean public folder
 */
gulp.task('clean', function () {
  return gulp
    .src([dist], {
      read: true,
      allowEmpty: true,
    })
    .pipe(
      clean({
        force: true,
      })
    );
});
/**
 * Name: cleanJson
 * Pipe: gulp-clean
 * Desc: Clean json file on public task
 */
gulp.task('cleanJson', function () {
  return gulp
    .src([`${src}/config/data.json`], {
      read: true,
      allowEmpty: true,
    })
    .pipe(
      clean({
        force: true,
      })
    );
});

/**
 * Name: javascript
 * Pipe: gulp-babel,gulp-minify,gulp-sourcemaps
 * Desc: Minify and create sourcemaps
 */
gulp.task('javascript', function () {
  return gulp
    .src(`${src}/javascript/*.js`)
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(minify({ ext: { min: '.min.js' } }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dist}/js`))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

/**
 * Name: sass
 * Pipe: gulp-sass,gulp-autoprefixer,gulp-csso,gulp-sourcemaps
 * Desc: prefix,minify and create sourcemaps
 */
gulp.task('sass', function () {
  return gulp
    .src(`${src}/sass/*.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      csso({
        restructure: false,
        sourceMap: true,
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${dist}/css`))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

/**
 * Name: yaml
 * Pipe: gulp-yaml
 * Desc: Convert Yaml to Json
 */
gulp.task('yaml', function (done) {
  gulp
    .src(`${src}/config/data.yaml`)
    .pipe(yaml({ space: 2 }))
    .pipe(gulp.dest(`${src}/config/`));
  done();
});

/**
 * Name: nunjucks
 * Pipe: gulp-data,gulp-nunjucks-render,gulp-htmlmin
 * Desc: Render html files with Nunjucks and compress
 */
gulp.task('nunjucks', function () {
  return gulp
    .src(`${src}/pages/*.njk`)
    .pipe(
      data(function () {
        return JSON.parse(fs.readFileSync(`${src}/config/data.json`));
      })
    )
    .pipe(render({ path: [`${src}/templates`], watch: true }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(dist))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

/**
 * Name: Watch files
 * Watch: css,js,nunjucks
 * Desc: Watch css,js & nunjucks
 */
gulp.task('watch', function (done) {
  gulp.watch(
    [`${src}/sass/**/*.scss`, `${src}/sass/styles.scss`],
    gulp.series('sass')
  );
  gulp.watch(`${src}/javascript/index.js`, gulp.series('javascript'));
  gulp.watch(`${src}/config/data.yaml`, gulp.series('yaml'));
  gulp.watch(
    [`${src}/pages/*.njk`, `${src}/templates`, `${src}/config/*.json`],
    gulp.series('nunjucks')
  );
  browserSync.reload();
  done();
});

/**
 * Name: Sync browser
 * Desc: When detect changes browser reload
 */
gulp.task('browserSync', function () {
  return browserSync.init({
    watch: true,
    open: false,
    notify: false,
    logFileChanges: false,
    logLevel: 'info',
    injectChanges: true,
    reloadOnRestart: true,
    server: {
      baseDir: './public',
    },
    files: ['./public'],
  });
});

/**
 * Name: Dev
 * Series: clean,js,css,nunjucks,watch,serve
 * Desc: Run gulp with live-serverls
 */
gulp.task(
  'default',
  gulp.series(
    'yaml',
    'clean',
    'javascript',
    'sass',
    'nunjucks',
    'watch',
    'browserSync'
  ),
  function () {
    console.log('Build and serve ready!');
  }
);

/**
 * Name: Clean folders
 * Series: clean,js,css,nunjucks
 * Desc: Render tasks without live-server
 */
gulp.task(
  'public',
  gulp.series('clean', 'yaml', 'javascript', 'sass', 'nunjucks', 'cleanJson'),
  function () {
    console.log('Build only success!');
  }
);
