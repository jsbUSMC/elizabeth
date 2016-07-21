"use strict";

var gulp = require("gulp");
var util = require("gulp-util");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var gzip = require("gulp-gzip");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");

var config = {
  bsScss: './node_modules/bootstrap/scss',
  faScss: './src/font-awesome/scss'
};

// compile scss
gulp.task("styles", function() {
  return gulp.src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [config.bsScss, config.faScss]
    }))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: null}))
    .pipe(autoprefixer({browsers: ["last 1 version"]}))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: ".min"}))
    .pipe(minifyCss())
    .pipe(gulp.dest("dist/css"));
});

// compile js
gulp.task("scripts", function() {
  gulp.src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(rename("all.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", ["styles"]);
    gulp.watch("src/js/**/*.js", ["scripts"]);
});

gulp.task("default", ["watch"]);