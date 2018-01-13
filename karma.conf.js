// Karma configuration
// Generated on Fri Jan 12 2018 08:26:06 GMT+0100 (CET)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            // 'test/index.html',
            { pattern: 'test/jquery.js', included: true, watched: false },
            { pattern: 'src/justFlipIt.js', included: true, watched: false },
            { pattern: 'test/test.js', included: true, watched: false }
        ],


        plugins: [
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-chrome-launcher'),
            require('karma-mocha-reporter')
        ],

        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // reporters: ['progress'],
        reporters: ['mocha'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['PhantomJS'],
        // browsers: ['Chrome'], // You may use 'ChromeCanary', 'Chromium' or any other supported browser
        // browsers: ['ChromeHeadless'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            },
            Chrome_local_headless: {
                base: 'ChromeHeadless'
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });

    if (process.env.TRAVIS) {
        config.browsers = ['Chrome_travis_ci'];
    }
    else {config.browsers = ['Chrome_local_headless']}
};

