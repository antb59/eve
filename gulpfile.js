// pour la gestion de la sortie standard (couleur,mise en forme...) : 
// https://www.npmjs.org/package/chalk
// pour l'execution de commande shell :
// https://www.npmjs.org/package/shelljs


var gulp = require('gulp');
var gutil = require('gulp-util');
var taskListing = require('gulp-task-listing');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var server = require('gulp-express');
var sh = require('shelljs');
var batch = require('gulp-batch');
var argv = require('yargs').argv;
var request = require('request');
var fs = require('fs');
var protractor = require("gulp-protractor").protractor;


var paths = {
    sass: ['scss/**/*.scss'],
    server: ['www'],
    test: [
        'www/lib/angular-mocks/angular-mocks.js',
        'www/lib/angular-http-auth/http-auth-interceptor.js',
        'www/lib/extern/jquery-1.11.1.js',
        'www/js/**/*.js',
        'www/*.js',
        'test/unit/**/*.js',
    ]
};

/******************* Default commands *******************/
gulp.task('default', ['server','watch']);
/********************************************************/

/********************* Help commands ********************/
gulp.task('help', taskListing);
/********************************************************/

/********************* End commands *********************/
function endFailure() {
    gutil.beep();
    gutil.beep();
    gutil.beep();
    gutil.beep();
    gutil.beep();
    gutil.beep();
};

function endSuccess() {
    gutil.beep();
};
/********************************************************/


/**************** Lauching Server commands **************/
gulp.task('server',function(){
    server.run(['server.js']);   
});
/********************************************************/

/******************* Cleaning commands ******************/
gulp.task('clean',function(){
    return gulp.src('platforms/*', {read: false})
    .pipe(clean({force: true})); 
});
/********************************************************/

/***************** Building SASS commands ***************/
gulp.task('sass', function(done) {
    gulp.src('./scss/themes/*.scss')
    .pipe(sass())
    .pipe(rename({ prefix: 'main_', suffix: '_theme' }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(server.notify())
    .on('end', done);
});
/********************************************************/


/**************** Launching TEST commands ***************/
/*var testOptions = {
    browsers: {
        all: ['PhantomJS','Chrome'],
        silent: ['PhantomJS']
    },
    reporters: {
        all: ['progress','html'],
        silent: ['progress']
    }
}

function launchUnitTest(browsers,reporters) {
    return gulp.src(paths.test)
    .pipe(karma({
        configFile: './test/karma-config.js',
        action: 'run',
        browsers: browsers,
        reporters: reporters
    })).on('error', function(err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
    })
};

gulp.task('test', ['unit-test-all-browser','e2e-test']);

gulp.task('unit-test-all-browser', function(done) {
    return launchUnitTest(testOptions.browsers.all,testOptions.reporters.all);
});

gulp.task('unit-test-silent-browser', function(done) {
    return launchUnitTest(testOptions.browsers.silent,testOptions.reporters.silent);
});

gulp.task('install-e2e-test', function() {
    var env = argv.env;
    gutil.log(gutil.colors.cyan("Executing Selenium installation script"));
    var commandSeleniumInstall = sh.exec("node node_modules/protractor/bin/webdriver-manager update --proxy http://proxy-internet.localnet:3128", {silent:false});
    if (commandSeleniumInstall.code != 0) {
        gutil.log(gutil.colors.red("Error while executing Selenium installation script"));
        gutil.log(gutil.colors.red(commandSeleniumInstall.output));
        exit(1);
    } else {
        gutil.log(gutil.colors.green("Selenium installation script ended successfully"));
    }
});*/

//gulp.task('e2e-test', function() {
//    var testFiles = argv.testFiles || "**/*_spec.js";
//    return gulp.src(["test/e2e/" + testFiles])
//    .pipe(protractor({
//        configFile: "test/e2e/protractor.config.js",
//        args: ['--baseUrl', 'http://localhost:8100/']
//    })) 
//    .on('error', function(e) { throw e })
//});
/********************************************************/

/**************** Launching WATCH commands **************/
gulp.task('watch', function() {
    gutil.log(gutil.colors.white("WATCHING SCSS FILES"));
    gulp.watch("scss/**/*.scss", ['sass']);
});
/********************************************************/


/************** Building Application commands ***********/
gulp.task('build',  ['build-config-files']);

gulp.task('build-config-files', function() {
    var env = argv.env;
    if ((env != "DEV") && (env != "INTEG") && (env != "QLF") && (env != "PROD")) {
        gutil.log(gutil.colors.red("You need to specify the environment by adding '--env [DEV|INTEG|QLF|PROD]'"));
        gutil.log(gutil.colors.red("Exemple '--env DEV'"));
        throw "Environment not specified";
    }
    var srcFile = 'config/applicationConfig_' + env+ '.js';
    var destFilename = 'applicationConfig.js';
    var destDir = 'www';

    return gulp.src(srcFile)
    .pipe(rename(destFilename))
    .pipe(gulp.dest(destDir));
});

