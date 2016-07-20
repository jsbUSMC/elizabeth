"use strict";

var gulp = require("gulp");
var util = require("gulp-util");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var uglify = require("gulp-uglify");
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