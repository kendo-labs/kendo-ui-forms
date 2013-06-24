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
      browsers = ['Chrome', 'Firefox', 'Opera'];
      if (os.type() === 'Darwin') {
        browsers.push('ChromeCanary');
        // Karma doesn't shut down Safari automatically, so commenting this out
        // for my sanity, for now.
        // browsers.push('Safari');
      }
      if (os.type() === 'Windows_NT') {
        browsers.push('IE');
      }
    }
  })();

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/kendo.forms.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/kendo.forms.min.js': ['<%= concat.dist.dest %>']
        }
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
      forms: {
        browsers: browsers
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'spec/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['minify', 'test'],
        options: {
          nospawn: true
        }
      }
    },
    jasmine: {
      src: ['lib/**/*.js', 'src/*.js'],
      options: {
        specs: 'spec/js/*.js',
        vendor: [
          'spec/lib/jasmine-jquery.js'
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma-0.9.1');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('minify', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('x-test', ['minify', 'karma:forms']);
	grunt.registerTask('test', ['jasmine']);
};