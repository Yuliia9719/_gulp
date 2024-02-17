const { src, dest, watch, task } = require("gulp");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const PATH = {
  scssRootfile: "./assets/scss/style.scss",
  scssAllFiles: "./assets/scss/**/*.scss",
  cssFolder: "./assets/css",
  htmlFolder: "./",
  htmlAllFiles: "./**/*.html",
  jsFolder: "./assets/js",
  jsAllFiles: "./assets/js/**/*.js"
};
function scss() {
  return src(PATH.scssRootfile)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(PATH.cssFolder))
    .pipe(browserSync.stream());
}

function scssMin() {
  return src(PATH.scssRootfile)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(PATH.cssFolder));
}

function syncBrowser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

async function sync() {
  browserSync.reload();
}
function watchFiles() {
  syncBrowser();
  watch(PATH.scssAllFiles, scss);
  watch(PATH.htmlAllFiles, sync);
  watch(PATH.jsAllFiles, sync);
}

task("min", scssMin);
task("scss", scss);
task("watch", watchFiles);
