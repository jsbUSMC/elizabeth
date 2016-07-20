"use strict";

var gulp = require("gulp");
var util = require("gulp-util");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var gzip = require("gulp-gzip");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var bourbon = require("node-bourbon").includePaths;
var neat = require("node-neat").includePaths;

// compile scss
gulp.task("styles", function() {
  gulp.src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: bourbon,
      includePaths: neat
    }))
    .pipe(autoprefixer())
    .pipe(concat("all.css"))
    .pipe(rename("all.min.css"))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"))
});