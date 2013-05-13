module.exports = function(grunt) {

	// karma setup
  var browsers;
  (function() {
    try {
      var config = grunt.file.readJSON('local.json');
      if (config.browsers) {
        browsers = config.browsers;
      }
    } catch (e) {
      var os = require('os');
      browsers = ['Chrome', 'Firefox'];
      //browsers = ['Chrome'];
      if (os.type() === 'Darwin') {
        browsers.push('ChromeCanary');
      }
      if (os.type() === 'Windows_NT') {
        browsers.push('IE');
      }
    }
  })();

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/kendo.forms.js',
        dest: 'build/kendo.forms.min.js'
      }
    },
    karma: {
      options: {
        configFile: 'conf/karma.conf.js',
        keepalive: true
      },
      browserstack: {
        browsers: ["BrowserStack:IE:Win"]
      },
      buildbot: {
        browsers: browsers,
        reporters: ['crbot'],
        logLevel: 'OFF'
      },
      toolkit: {
        browsers: browsers
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma-0.9.1');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
	grunt.registerTask('minify', ['uglify']);
	grunt.registerTask('test', ['karma:toolkit']);
	grunt.registerTask('test-buildbot', ['karma:buildbot']);
};