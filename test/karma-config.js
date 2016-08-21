module.exports = function(config){
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath : '../',

        // list of files / patterns to load in the browser
        files : [
            'www/lib/ionic/js/ionic.bundle.js',
            'www/lib/angular-mocks/angular-mocks.js',
            'www/lib/angular-http-auth/src/http-auth-interceptor.js',
            'www/lib/extern/jquery-1.11.1.js',
            'www/lib/extern/prototype.js',
            'www/lib/extern/date.js',
            'www/lib/dygraph/dygraph-combined.js',
            'www/lib/chartsDG/chartsDG.min.js',
            'www/js/**/*.js',
            'www/*.js',
            'test/unit/**/*.js'
        ],
        
        reporters: ['progress', 'html'],
        
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch : true,

        // frameworks to use
        frameworks: ['jasmine'],

        // start these browsers
        browsers : ['PhantomJS','Chrome'],

        plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-html-reporter'
        ],

        htmlReporter : {
            outputDir: 'test/report/',
            templatePath: 'test/template_test.html'
        }

    });
};