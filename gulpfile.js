const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass")),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  browserSync = require("browser-sync").create(),
  autoprefixer = require("gulp-autoprefixer"),
  clean = require("gulp-clean");

function scripts() {
  return src("app/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
  watch(["app/scss/style.scss"], styles);
  watch(["app/js/main.js"], scripts);
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function build() {
  return src(
    [
      "app/css/style.min.css",
      "app/img/*.*",
      "app/icons/*.*",
      "app/fonts/*.*",
      "app/js/main.min.js",
      "app/**/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.build = build;

exports.build = series(cleanDist, build);
exports.default = parallel(styles, scripts, watching);
