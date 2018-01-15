module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
      'local_modules/node_modules/angular/angular.js',
      'local_modules/node_modules/angular-route/angular-route.js',
      'local_modules/node_modules/angular-animate/angular-animate.min.js',
            'local_modules/node_modules/angular-mocks/angular-mocks.js',
        'local_modules/node_modules/angular-chart.js/node_modules/chart.js/dist/Chart.min.js',
        'local_modules/node_modules/angular-chart.js/dist/angular-chart.min.js',
      

      'view*/**/*.js'
    ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};